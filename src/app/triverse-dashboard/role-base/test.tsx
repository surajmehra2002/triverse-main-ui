'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

type Module = {
  id: number
  name: string
}

type Permission = {
  module_id: number
  can_view: boolean
  can_edit: boolean
  can_create: boolean
  can_delete: boolean
}

export default function RolePermissionsPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [modules, setModules] = useState<Module[]>([])
  const [permissions, setPermissions] = useState<Record<number, Permission>>({})

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const [modRes, permRes] = await Promise.all([
          fetch('/api/modules'),
          fetch(`/api/roles/${id}/modules`),
        ])

        const modData = await modRes.json()
        const permData = await permRes.json()

        setModules(modData.data)
        const mappedPermissions = permData.data.reduce((acc: Record<number, Permission>, p: Permission) => {
          acc[p.module_id] = p
          return acc
        }, {})
        setPermissions(mappedPermissions)
      } catch (error) {
        console.error("Failed to load data", error)
      }
    }

    fetchPermissions()
  }, [id])

  const toggle = (module_id: number, field: keyof Permission) => {
    setPermissions((prev) => ({
      ...prev,
      [module_id]: {
        ...prev[module_id],
        [field]: !prev[module_id]?.[field],
      },
    }))
  }

  const handleSave = async () => {
    try {
      await fetch(`/api/roles/${id}/modules`, {
        method: 'POST',
        body: JSON.stringify(Object.values(permissions)),
        headers: { 'Content-Type': 'application/json' },
      })
      alert('Permissions updated!')
      router.push('/admin/roles')
    } catch (error) {
      alert('Failed to save permissions.')
      console.error(error)
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
        </CardHeader>

        <CardContent className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead className="text-center">View</TableHead>
                <TableHead className="text-center">Edit</TableHead>
                <TableHead className="text-center">Create</TableHead>
                <TableHead className="text-center">Delete</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {modules.map((mod) => (
                <TableRow key={mod.id}>
                  <TableCell>{mod.name}</TableCell>
                  {(['can_view', 'can_edit', 'can_create', 'can_delete'] as (keyof Permission)[]).map((field) => (
                    <TableCell key={field} className="text-center">
                     <Checkbox
  checked={Boolean(permissions[mod.id]?.[field])}
  onCheckedChange={() => toggle(mod.id, field)}
/>

                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Permissions</Button>
      </div>
    </div>
  )
}

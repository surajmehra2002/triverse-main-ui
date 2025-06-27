'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'

type Company = {
  id: number
  name: string
}

type SuperAdmin = {
  id: number
  name: string
  email: string
  companyId: number
  services: string
}

const dummyCompanies: Company[] = [
  { id: 1, name: 'Surya Group' },
  { id: 2, name: 'Triverse Infra' },
  { id: 3, name: 'UrbanX Buildcon' },
]

export default function CompanySuperAdminsPage() {
  const [superAdmins, setSuperAdmins] = useState<SuperAdmin[]>([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
    services: '',
    companyId: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (
      !form.name ||
      !form.email ||
      !form.services ||
      !form.companyId
    ) {
      alert('All fields are required')
      return
    }

    const newAdmin: SuperAdmin = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      services: form.services,
      companyId: parseInt(form.companyId),
    }

    setSuperAdmins([newAdmin, ...superAdmins])
    setForm({
      name: '',
      email: '',
      role: '',
      services: '',
      companyId: '',
    })
  }

  const getCompanyName = (id: number) => {
    const company = dummyCompanies.find((c) => c.id === id)
    return company?.name || 'N/A'
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Assign Company Super Admin
      </h1>

      {/* Form Card */}
      <Card className="p-4 mb-8">
      <h2 className="text-lg font-semibold mb-4">Create New Company</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Select */}
          <div className="w-full">
            <Select
              value={form.companyId}
              onValueChange={(value) =>
                setForm({ ...form, companyId: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Company*" />
              </SelectTrigger>
              <SelectContent>
                {dummyCompanies.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            type="text"
            name="name"
            placeholder="Super Admin Name*"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="role"
            placeholder="Super Admin Role*"
            value={form.role}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Super Admin Email*"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="services"
            placeholder="Services Provided*"
            value={form.services}
            onChange={handleChange}
          />
        </div>

        <Button onClick={handleAdd} className="mt-4">
          Assign Super Admin
        </Button>
      </Card>

      {/* Table Card */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">
          All Company Super Admins
        </h2>
        {superAdmins.length === 0 ? (
          <p className="text-gray-500">
            No super admins assigned yet.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Services</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {superAdmins.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>
                    {getCompanyName(s.companyId)}
                  </TableCell>
                  <TableCell>{s.services}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type Permission = {
  id: number
  key: string
  description: string
}

const initialPermissions: Permission[] = [
  { id: 1, key: 'view_users', description: 'Can view user list' },
  { id: 2, key: 'edit_users', description: 'Can edit and delete users' },
  { id: 3, key: 'create_project', description: 'Can create new projects' },
]

export default function PermissionsTable() {
  const [permissions, setPermissions] = useState(initialPermissions)
  const [key, setKey] = useState('')
  const [desc, setDesc] = useState('')

  const handleAdd = () => {
    if (!key || !desc) return
    const newPerm: Permission = {
      id: Date.now(),
      key,
      description: desc,
    }
    setPermissions([...permissions, newPerm])
    setKey('')
    setDesc('')
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Permissions Management</h2>

      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Permission Key (e.g. view_dashboard)"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="flex-1"
        />
        <Input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleAdd} className="px-4">
          Add
        </Button>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Key</th>
            <th className="p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((p) => (
            <tr key={p.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{p.key}</td>
              <td className="p-2">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

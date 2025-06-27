'use client'

import { useState } from 'react'
import { Select } from 'tabler-icons-react';
import { Button } from './ui/button';

const dummyUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Viewer' },
  { id: 3, name: 'Alex Roy', email: 'alex@example.com', role: 'Engineer' },
  { id: 4, name: 'Emily Clark', email: 'emily@example.com', role: 'Editor' },
  { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'Admin' },
  { id: 6, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Viewer' },
  { id: 7, name: 'David Miller', email: 'david@example.com', role: 'Engineer' },
  { id: 8, name: 'Laura Davis', email: 'laura@example.com', role: 'Editor' },
  { id: 9, name: 'Chris Taylor', email: 'chris@example.com', role: 'Viewer' },
  { id: 10, name: 'Anna Moore', email: 'anna@example.com', role: 'Admin' },
  { id: 11, name: 'Robert Jackson', email: 'robert@example.com', role: 'Engineer' },
  { id: 12, name: 'Olivia White', email: 'olivia@example.com', role: 'Viewer' },
  { id: 13, name: 'Daniel Harris', email: 'daniel@example.com', role: 'Editor' },
  { id: 14, name: 'Sophia Martin', email: 'sophia@example.com', role: 'Admin' },
  { id: 15, name: 'James Thompson', email: 'james@example.com', role: 'Engineer' },
  { id: 16, name: 'Grace Lee', email: 'grace@example.com', role: 'Viewer' },
  { id: 17, name: 'Henry Walker', email: 'henry@example.com', role: 'Admin' },
  { id: 18, name: 'Chloe Hall', email: 'chloe@example.com', role: 'Editor' },
  { id: 19, name: 'Ethan Allen', email: 'ethan@example.com', role: 'Engineer' },
  { id: 20, name: 'Mia Young', email: 'mia@example.com', role: 'Viewer' }
];

export default function UserTable() {
  const [users, setUsers] = useState(dummyUsers)

  const handleRoleChange = (id: number, newRole: string) => {
    const updatedUsers = users.map(u => u.id === id ? { ...u, role: newRole } : u)
    setUsers(updatedUsers)
  }

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
  <h2 className="text-xl font-semibold mb-4">User Management</h2>

  <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 rounded">
    <table className="w-full border border-gray-200 text-sm dark:border-gray-700">
      <thead className="bg-gray-100 dark:bg-gray-800 text-left">
        <tr>
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Role</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="p-2">{user.name}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">
              <Select
                className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-sm"
                values={user.role}
              >
                <option value="super-admin">Super Admin</option>
                <option value="company-super-admin">Company Super Admin</option>
                <option value="company-admin">Company Admin</option>
              </Select>
            </td>
            <td className="p-2">
              <Button className="text-red-600 hover:underline">Remove</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  )
}

'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'


type Company = {
  id: number
  name: string
  address: string
  pincode: string
  location: string
  superAdmin: string
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [form, setForm] = useState({
    name: '',
    address: '',
    pincode: '',
    location: '',
    superAdmin: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddCompany = () => {
    if (!form.name || !form.address || !form.pincode || !form.location || !form.superAdmin) {
      alert('Please fill all mandatory fields')
      return
    }
    const newCompany = { ...form, id: Date.now() }
    setCompanies([newCompany as Company, ...companies])
    setForm({ name: '', address: '', pincode: '', location: '', superAdmin: '' })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Companies</h1>

      {/* Form */}
      <Card className="p-4 mb-8">
        <h2 className="text-lg font-semibold mb-4">Create New Company</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="name"
            placeholder="Company Name*"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            name="address"
            placeholder="Company Address*"
            value={form.address}
            onChange={handleChange}
          />
          <Input
            name="pincode"
            placeholder="Pincode*"
            value={form.pincode}
            onChange={handleChange}
          />
          <Input
            name="location"
            placeholder="Location*"
            value={form.location}
            onChange={handleChange}
          />
          <Input
            name="superAdmin"
            placeholder="Company Super Admin Name*"
            value={form.superAdmin}
            onChange={handleChange}
          />
        </div>
        <Button
          onClick={handleAddCompany}
          className="mt-4 "
        >
          Create Company
        </Button>
      </Card>

      {/* Table */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">All Companies</h2>
        {companies.length === 0 ? (
          <p className="text-muted-foreground">No companies added yet.</p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Address</th>
                <th className="p-2">Pincode</th>
                <th className="p-2">Location</th>
                <th className="p-2">Super Admin</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-2">{c.name}</td>
                  <td className="p-2">{c.address}</td>
                  <td className="p-2">{c.pincode}</td>
                  <td className="p-2">{c.location}</td>
                  <td className="p-2">{c.superAdmin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}

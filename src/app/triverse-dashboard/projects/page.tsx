'use client'

import { useState } from 'react'
import {
  Input
} from '@/components/ui/input'
import {
  Button
} from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

type Company = {
  id: number
  name: string
}

type Project = {
  id: number
  companyId: number
  name: string
  category: string
  value: string
  timeline: string
  location: string
  locationLink: string
  client?: string
  height?: string
  contractor?: string
}

const dummyCompanies: Company[] = [
  { id: 1, name: 'Surya Group' },
  { id: 2, name: 'Triverse Infra' },
  { id: 3, name: 'UrbanX Buildcon' },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [form, setForm] = useState({
    companyId: '',
    name: '',
    category: '',
    value: '',
    timeline: '',
    location: '',
    locationLink: '',
    client: '',
    height: '',
    contractor: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddProject = () => {
    const requiredFields = [
      'companyId',
      'name',
      'category',
      'value',
      'timeline',
      'location',
      'locationLink',
    ]

    for (const field of requiredFields) {
      if (!form[field as keyof typeof form]) {
        alert('Please fill all mandatory fields (*)')
        return
      }
    }

    const { companyId, ...restForm } = form

    const newProject: Project = {
      id: Date.now(),
      companyId: parseInt(companyId),
      ...restForm,
    }

    setProjects([newProject, ...projects])
    setForm({
      companyId: '',
      name: '',
      category: '',
      value: '',
      timeline: '',
      location: '',
      locationLink: '',
      client: '',
      height: '',
      contractor: '',
    })
  }

  const handleDelete = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const getCompanyName = (id: number) => {
    const company = dummyCompanies.find((c) => c.id === id)
    return company?.name || 'N/A'
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Manage Projects</h1>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              value={form.companyId}
              onValueChange={(value) => setForm({ ...form, companyId: value })}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder="Select Company *" />
              </SelectTrigger>
              <SelectContent>
                {dummyCompanies.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input name="name" value={form.name} onChange={handleChange} placeholder="Project Name *" />
            <Input name="category" value={form.category} onChange={handleChange} placeholder="Project Category *" />
            <Input name="value" value={form.value} onChange={handleChange} placeholder="Project Value *" />
            <Input name="timeline" value={form.timeline} onChange={handleChange} placeholder="Timeline *" />
            <Input name="location" value={form.location} onChange={handleChange} placeholder="Location *" />
            <Input name="locationLink" value={form.locationLink} onChange={handleChange} placeholder="Location Link *" />
            <Input name="client" value={form.client} onChange={handleChange} placeholder="Client Name" />
            <Input name="height" value={form.height} onChange={handleChange} placeholder="Height of Project" />
            <Input name="contractor" value={form.contractor} onChange={handleChange} placeholder="General Contractor" />
          </div>

          <Button onClick={handleAddProject} className="mt-4">
            Add Project
          </Button>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <p className="text-muted-foreground">No projects added yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{getCompanyName(p.companyId)}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell>{p.timeline}</TableCell>
                    <TableCell>{p.location}</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

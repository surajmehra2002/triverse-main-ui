'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

type Project = {
  id: number
  name: string
}

type Camera = {
  id: number
  cameraId: string
  name: string
  projectId: number
  floor: string
  type: string
  status: 'active' | 'inactive'
}

const dummyProjects: Project[] = [
  { id: 1, name: 'Surya Tower' },
  { id: 2, name: 'Triverse HQ' },
  { id: 3, name: 'Green Ville Plaza' },
]

export default function CamerasPage() {
  const [cameras, setCameras] = useState<Camera[]>([])
  const [form, setForm] = useState({
    cameraId: '',
    name: '',
    projectId: '',
    floor: '',
    type: 'static',
    status: 'active',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddCamera = () => {
    if (!form.name || !form.projectId) {
      alert('Camera name and project are required')
      return
    }

    const newCamera: Camera = {
      id: Date.now(),
      cameraId: form.cameraId || `CAM-${Date.now().toString().slice(-5)}`,
      name: form.name,
      projectId: parseInt(form.projectId),
      floor: form.floor,
      type: form.type,
      status: form.status as 'active' | 'inactive',
    }

    setCameras([newCamera, ...cameras])
    setForm({
      cameraId: '',
      name: '',
      projectId: '',
      floor: '',
      type: 'static',
      status: 'active',
    })
  }

  const getProjectName = (id: number) =>
    dummyProjects.find((p) => p.id === id)?.name || 'Unknown'

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Cameras</h1>

      {/* Form */}
     <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-8">
  <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Add Camera</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Input
      name="cameraId"
      value={form.cameraId}
      onChange={handleChange}
      placeholder="Camera ID (auto if blank)"
      className="bg-white dark:bg-gray-900 dark:text-white"
    />
    <Input
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Camera Name*"
      className="bg-white dark:bg-gray-900 dark:text-white"
    />
    <div className="w-full">
      <Select
        value={form.projectId}
        onValueChange={(value) => setForm({ ...form, projectId: value })}
      >
        <SelectTrigger className="w-full bg-white dark:bg-gray-900 dark:text-white">
          <SelectValue placeholder="Select Project*" />
        </SelectTrigger>
        <SelectContent>
          {dummyProjects.map((p) => (
            <SelectItem key={p.id} value={String(p.id)}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <Input
      name="floor"
      value={form.floor}
      onChange={handleChange}
      placeholder="Floor/Area"
      className="bg-white dark:bg-gray-900 dark:text-white"
    />

    {/* Type Select */}
    <div className="w-full">
      <Select
        value={form.type}
        onValueChange={(value) => setForm({ ...form, type: value })}
      >
        <SelectTrigger className="w-full bg-white dark:bg-gray-900 dark:text-white">
          <SelectValue placeholder="Camera Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="static">Static</SelectItem>
          <SelectItem value="360">360</SelectItem>
          <SelectItem value="timelapse">Time-lapse</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Status Select */}
    <Select
      value={form.status}
      onValueChange={(value) => setForm({ ...form, status: value })}
    >
      <SelectTrigger className="w-full bg-white dark:bg-gray-900 dark:text-white">
        <SelectValue placeholder="Camera Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <Button onClick={handleAddCamera} className="mt-4">
    Add Camera
  </Button>
</div>

      {/* Table */}
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow overflow-x-auto">
  <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">All Cameras</h2>
  {cameras.length === 0 ? (
    <p className="text-gray-500 dark:text-gray-400">No cameras added yet.</p>
  ) : (
    <table className="w-full border text-sm">
      <thead className="bg-gray-100 dark:bg-gray-700 text-left text-gray-900 dark:text-white">
        <tr>
          <th className="p-2">ID</th>
          <th className="p-2">Name</th>
          <th className="p-2">Project</th>
          <th className="p-2">Floor</th>
          <th className="p-2">Type</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {cameras.map((cam) => (
          <tr key={cam.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white">
            <td className="p-2">{cam.cameraId}</td>
            <td className="p-2">{cam.name}</td>
            <td className="p-2">{getProjectName(cam.projectId)}</td>
            <td className="p-2">{cam.floor}</td>
            <td className="p-2">{cam.type}</td>
            <td className="p-2 capitalize">{cam.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
    </div>
  )
}

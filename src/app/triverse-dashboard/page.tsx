'use client'
import Link from 'next/link'
import {
  Building2,
  Users,
  LayoutDashboard,
  Video,
  ShieldCheck,
  DollarSign,
} from 'lucide-react';

const actions = [
  { label: 'Create Company', href: '/triverse-dashboard/companies-access' },
   {label:'Company Admin', href:'/triverse-dashboard/company-super-admins'},
  { label: 'Add Project', href: '/triverse-dashboard/projects' },
  { label: 'Add Camera', href: '/triverse-dashboard/cameras' },
  { label: 'Manage Users', href: '/triverse-dashboard/users' },
  { label: 'Assign Role', href: '/triverse-dashboard/roles&permissions' },
  { label: 'Enable Features', href: '/triverse-dashboard/assign' },
 
  { label: 'Settings', href: '/triverse-dashboard/settings' },
]

export default function SuperAdminDashboard() {

 
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Welcome, Suraj 👑
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard icon={<Building2 className="text-blue-500" />} label="Companies" value="12" />
        <StatCard icon={<LayoutDashboard className="text-green-600" />} label="Projects" value="45" />
        <StatCard icon={<Video className="text-purple-600" />} label="Cameras" value="84" />
        <StatCard icon={<Users className="text-orange-500" />} label="Admins" value="18" />
        <StatCard icon={<ShieldCheck className="text-red-500" />} label="Roles" value="5" />
        <StatCard icon={<DollarSign className="text-emerald-500" />} label="Billing Active" value="8" />
      </div>

      {/* Action Shortcuts */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
          Quick Actions
        </h2>
       <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700 dark:text-gray-200">
  {actions.map((action) => (
    <Link href={action.href} key={action.label}>
      <li className="p-4 rounded bg-gray-100 dark:bg-gray-700 hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:text-white transition-all cursor-pointer text-center">
        {action.label}
      </li>
    </Link>
  ))}
</ul>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-lg font-semibold text-black dark:text-white">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-300">{label}</p>
      </div>
    </div>
  )
}

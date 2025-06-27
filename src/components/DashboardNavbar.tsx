'use client'

import { useTheme } from 'next-themes'
import { Bell, ChevronDown, Moon, Sun } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

export default function DashboardNavbar() {
  const { setTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-900 shadow px-6 py-3 flex justify-between items-center border-b dark:border-gray-700">
      {/* Left: Search */}
      <div className="flex items-center gap-2 w-full max-w-md">
        <Input
          type="text"
          placeholder="Search users, roles..."
          className="text-sm"
        />
      </div>

      {/* Right: Notification + Profile */}
      <div className="flex items-center gap-6">
        {/* Notification icon */}
        <Button variant="ghost" className="relative p-2">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                SuperAdmin
              </span>
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              <Sun className="w-4 h-4 mr-2" /> Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              <Moon className="w-4 h-4 mr-2" /> Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              💻 System
            </DropdownMenuItem>
            <DropdownMenuItem>👤 Profile</DropdownMenuItem>
            <DropdownMenuItem>⚙️ Settings</DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => alert('Logging out...')}
            >
              🚪 Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

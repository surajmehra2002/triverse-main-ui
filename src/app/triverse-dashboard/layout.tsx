"use client"

import Link from "next/link"
import { logout } from "@/context/globalLogout"
import { useState } from "react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  Building,
  ShieldLock,
  Users,
  Folder,
  Settings,
  BrandReactNative,
  Bell, // imported once
} from "tabler-icons-react"
import { IconCamera, IconSun } from "@tabler/icons-react" // IconSun retained if needed


import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  return (
    <SidebarProvider>
      <SidebarLayout dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen}>
        {children}
      </SidebarLayout>
    </SidebarProvider>
  )
}

function SidebarLayout({
  children,
  dropdownOpen,
  setDropdownOpen,
}: {
  children: React.ReactNode
  dropdownOpen: boolean
  setDropdownOpen: (value: boolean) => void
}) {
  const pathname = usePathname()
  const { setTheme } = useTheme()


 
  return (
    <SidebarProvider>
      <div className="flex  w-screen h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar collapsible="icon" className="w-64 bg-yellow-500 text-white">
          <SidebarHeader>
            <SidebarMenuButton asChild>
              <Link href="/triverse-dashboard/">
                <BrandReactNative className="text-blue-400" size={20} />
                <span className="text-xl">Triverse Super Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarGroup>
                <SidebarGroupLabel className="text-lg text-white">Home</SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={pathname === "/triverse-dashboard/" ? "bg-white text-blue-800" : ""}>
                    <Link href="/triverse-dashboard/">
                      <LayoutDashboard className="text-blue-400" size={20} />
                      <span>Dashboard Overview</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel className="text-lg text-white">Modules</SidebarGroupLabel>
                <SidebarGroupContent className="space-y-1">
                  {[
                    { href: "/triverse-dashboard/companies-access", label: "Companies Management", icon: Building },
                    { href: "/triverse-dashboard/company-super-admins", label: "Company Super Admins", icon: ShieldLock },
                    { href: "/triverse-dashboard/projects", label: "Projects", icon: Folder },
                    { href: "/triverse-dashboard/cameras", label: "Cameras", icon: IconCamera },
                    { href: "/triverse-dashboard/users", label: "Users Management", icon: Users },
                    { href: "/triverse-dashboard/roles&permissions", label: "Roles & Permissions", icon: ShieldLock },
                  ].map(({ href, label, icon: Icon }) => (
                    <SidebarMenuItem key={href}>
                 <SidebarMenuButton
  asChild
  className={`${
    pathname === href
      ? "bg-white text-blue-800 dark:bg-gray-700 dark:text-white"
      : "hover:bg-white dark:hover:bg-black"
  }`}
>
  <Link href={href}>
    <Icon className="text-blue-400" size={20} />
    <span>{label}</span>
  </Link>
</SidebarMenuButton>

                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel className="text-lg text-white">Access Control</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/triverse-dashboard/assign">
                        <Settings className="text-blue-400" size={20} />
                        <span>Feature Access Control</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel className="text-lg text-white">Account</SidebarGroupLabel>
                <SidebarGroupContent>
                  {[
                    { href: "/triverse-dashboard/profile", label: "My Profile", icon: Users },
                    { href: "/triverse-dashboard/settings", label: "System Settings", icon: Settings },
                  ].map(({ href, label, icon: Icon }) => (
                    <SidebarMenuItem key={href}>
                      <SidebarMenuButton asChild>
                        <Link href={href}>
                          <Icon className="text-blue-400" size={20} />
                          <span>{label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900 text-black dark:text-white">
          <header className="bg-yellow-400 dark:bg-gray-800 px-6 py-3 flex justify-between items-center border-b dark:border-gray-700">
            <div className="flex items-center gap-2 w-full max-w-md">
              <SidebarTrigger />
              <Input
                type="text"
                placeholder="Search ..."
                className="w-[100%] bg-yellow-50 text-black placeholder-yellow-300 border border-yellow-300
                           dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Notification Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="relative">
                    <Bell size={20} className="text-gray-600 dark:text-gray-300" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                      4
                    </span>
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Notifications</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-sm">
                      🚧 Project &#34;Triverse Tower&#34; deadline approaching.
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-sm">
                      🔔 You have a new user registration.
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-sm">
                      ✅ Permissions updated successfully.
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-sm">
                      🔄 Server restarted at 11:30 AM.
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Theme Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
           <Button variant="ghost" size="icon">
              <IconSun className="w-5 h-5 text-black dark:text-yellow-300" />
            </Button>

                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => setTheme("light")}>🌞 Light</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>🌙 Dark</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>💻 System</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>



              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                  variant="ghost"
                  className="flex items-center gap-2"                 
                >
                  <img
                    src="https://surajmehra.netlify.app/images/titlelogo.jpg"
                    alt="User"
                    width={22}
                    height={22}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium">Super Admin</span>
                  <ChevronDown size={16} />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem >Profile</DropdownMenuItem>
                  <DropdownMenuItem >Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* <div onClick={Logout}>logout</div> */}

              
            </div>
          </header>

          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

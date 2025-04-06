"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  FileText,
  BarChart,
  Settings,
  LogOut,
  Menu,
  X,
  MessageSquare,
  Video,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { useSession } from "@/lib/session"
import { useRouter } from "next/navigation"

interface SidebarProps {
  role: "student" | "parent" | "admin"
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(!isMobile)
  const { logout, user } = useSession()
  const router = useRouter()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  // Ensure the sidebar role matches the user's actual role
  useEffect(() => {
    if (user && user.role !== role) {
      router.push(`/dashboard/${user.role}`)
    }
  }, [user, role, router])

  const navItems = {
    student: [
      { name: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
      { name: "Classes", href: "/dashboard/student/classes", icon: BookOpen },
      { name: "Calendar", href: "/dashboard/student/calendar", icon: Calendar },
      { name: "Tests", href: "/dashboard/student/tests", icon: FileText },
      { name: "Notes", href: "/dashboard/student/notes", icon: FileText },
      { name: "Video Classes", href: "/dashboard/student/video-classes", icon: Video },
    ],
    parent: [
      { name: "Dashboard", href: "/dashboard/parent", icon: LayoutDashboard },
      { name: "Children", href: "/dashboard/parent/children", icon: Users },
      { name: "Report Cards", href: "/dashboard/parent/reports", icon: BarChart },
      { name: "Messages", href: "/dashboard/parent/messages", icon: MessageSquare },
    ],
    admin: [
      { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
      { name: "Students", href: "/dashboard/admin/students", icon: Users },
      { name: "Classes", href: "/dashboard/admin/classes", icon: BookOpen },
      { name: "Schedule", href: "/dashboard/admin/schedule", icon: Calendar },
      { name: "Tests", href: "/dashboard/admin/tests", icon: FileText },
      { name: "Reports", href: "/dashboard/admin/reports", icon: BarChart },
      { name: "Video Classes", href: "/dashboard/admin/video-classes", icon: Video },
      { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ],
  }

  // Ensure we have a valid role, defaulting to admin if not
  const validRole = role && navItems[role] ? role : user?.role || "admin"
  const items = navItems[validRole as keyof typeof navItems]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <>
      {isMobile && (
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 text-white" onClick={toggleSidebar}>
          {isOpen ? <X /> : <Menu />}
        </Button>
      )}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : isMobile ? "w-0" : "w-16",
        )}
      >
        <div className="flex h-16 items-center justify-center border-b border-slate-800">
          <Link href={`/dashboard/${validRole}`} className="flex items-center gap-2">
            {isOpen ? (
              <span className="text-xl font-bold text-white">EduZen</span>
            ) : (
              !isMobile && <span className="text-xl font-bold text-white">TE</span>
            )}
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-white",
                  pathname === item.href ? "bg-slate-800 text-white" : "hover:bg-slate-800",
                  !isOpen && !isMobile && "justify-center px-0",
                )}
              >
                <item.icon className="h-5 w-5" />
                {(isOpen || !isMobile) && <span>{isOpen && item.name}</span>}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="mt-auto p-4 border-t border-slate-800">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800",
              !isOpen && !isMobile && "justify-center px-0",
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            {isOpen && "Logout"}
          </Button>
        </div>
      </div>
    </>
  )
}


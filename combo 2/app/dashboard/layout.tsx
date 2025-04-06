import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { AuthGuard } from "@/components/auth-guard"

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { role?: string }
}) {
  // Extract role from the URL path
  const pathname = typeof window !== "undefined" ? window.location.pathname : ""
  const pathSegments = pathname.split("/")
  const roleIndex = pathSegments.findIndex((segment) => segment === "dashboard") + 1
  const role = (pathSegments[roleIndex] as "student" | "parent" | "admin") 

  return (
    <AuthGuard>
      <div className="min-h-screen h-screen flex flex-col bg-slate-950">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar role={role} />
          <div className="pl-0 md:pl-64 transition-all flex-1 overflow-auto">
            <main className="h-full p-4 md:p-8">{children}</main>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}


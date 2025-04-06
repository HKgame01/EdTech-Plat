"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSession } from "@/lib/session"
import type { UserRole } from "@/lib/auth"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, isAuthenticated } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    // If authenticated but accessing wrong role's dashboard
    if (user && pathname.includes("/dashboard/")) {
      const currentRole = pathname.split("/dashboard/")[1]?.split("/")[0]

      // If user is trying to access a different role's dashboard
      if (currentRole && currentRole !== user.role) {
        router.push(`/dashboard/${user.role}`)
        return
      }

      // If allowedRoles is specified, check if user has permission
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push(`/dashboard/${user.role}`)
        return
      }

      // For parents, restrict access to only their children's data
      if (user.role === "parent" && pathname.includes("/student/") && !pathname.includes(user.id)) {
        router.push(`/dashboard/parent`)
        return
      }
    }
  }, [isAuthenticated, user, pathname, router, allowedRoles])

  // If checking authentication, show nothing
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}


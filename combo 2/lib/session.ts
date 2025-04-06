"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, UserRole } from "./auth"

interface SessionState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "EduZen-session",
    },
  ),
)

// Hook to check if user has required role
export function useAuthorization(allowedRoles: UserRole[]) {
  const { user, isAuthenticated } = useSession()

  if (!isAuthenticated || !user) {
    return { isAuthorized: false }
  }

  const isAuthorized = allowedRoles.includes(user.role)

  return { isAuthorized, user }
}


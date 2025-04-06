"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation" // <- here
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { authenticateUser, getDemoCredentials } from "@/lib/auth"
import { useSession } from "@/lib/session"

export default function LoginPage() {
  const { login } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()
  const role = params?.role as "student" | "parent" | "admin"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [demoCredentials, setDemoCredentials] = useState({ email: "", password: "" })

  const roleTitle = role.charAt(0).toUpperCase() + role.slice(1)

  useEffect(() => {
    setDemoCredentials(getDemoCredentials(role))
  }, [role])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const user = await authenticateUser(email, password)

      if (!user || user.role !== role) {
        throw new Error(
          !user
            ? "Invalid credentials"
            : `You are not authorized as a ${roleTitle}. Please use the correct login page.`
        )
      }

      login(user)

      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      })

      router.push(`/dashboard/${role}`)
    } catch (error) {
      toast({
        title: "Login failed",
        description:
          error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setEmail(demoCredentials.email)
    setPassword(demoCredentials.password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">{roleTitle} Login</CardTitle>
          <CardDescription className="text-slate-400">
            Enter your credentials to access your {role} dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-800 border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-800 border-slate-700"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <p className="text-sm text-slate-400 mb-2">Demo Credentials:</p>
            <div className="bg-slate-800 p-3 rounded-md text-sm">
              <p>
                <span className="text-slate-400">Email:</span>{" "}
                <span className="text-white">{demoCredentials.email}</span>
              </p>
              <p>
                <span className="text-slate-400">Password:</span>{" "}
                <span className="text-white">{demoCredentials.password}</span>
              </p>
              <Button variant="outline" size="sm" className="mt-2 w-full" onClick={handleDemoLogin}>
                Use Demo Credentials
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:text-blue-400">
              Register
            </Link>
          </div>
          <div className="flex justify-center gap-4">
            {role !== "student" && (
              <Link href="/login/student">
                <Button variant="outline" size="sm">
                  Student Login
                </Button>
              </Link>
            )}
            {role !== "parent" && (
              <Link href="/login/parent">
                <Button variant="outline" size="sm">
                  Parent Login
                </Button>
              </Link>
            )}
            {role !== "admin" && (
              <Link href="/login/admin">
                <Button variant="outline" size="sm">
                  Admin Login
                </Button>
              </Link>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

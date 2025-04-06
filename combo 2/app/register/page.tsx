"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { registerUser } from "@/lib/auth"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    parentEmail: "",
  })
  const [parentForm, setParentForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (studentForm.password !== studentForm.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      // In a real app, this would make an API call to register the user
      await registerUser({
        name: studentForm.name,
        email: studentForm.email,
        password: studentForm.password,
        role: "student",
        parentId: "parent-1", // In a real app, this would be linked to the parent
      })

      toast({
        title: "Registration successful",
        description: "You can now log in with your credentials",
      })

      router.push("/login/student")
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: "There was an error registering your account",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleParentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (parentForm.password !== parentForm.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      // In a real app, this would make an API call to register the user
      await registerUser({
        name: parentForm.name,
        email: parentForm.email,
        password: parentForm.password,
        role: "parent",
        studentIds: [], // In a real app, this would be linked to students
      })

      toast({
        title: "Registration successful",
        description: "You can now log in with your credentials",
      })

      router.push("/login/parent")
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: "There was an error registering your account",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">Create an account</CardTitle>
          <CardDescription className="text-slate-400">
            Choose your account type and enter your details below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="parent">Parent</TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <form onSubmit={handleStudentSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-name">Full Name</Label>
                  <Input
                    id="student-name"
                    placeholder="Enter your full name"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    required
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="Enter your email"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    required
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <Input
                    id="student-password"
                    type="password"
                    placeholder="Create a password"
                    value={studentForm.password}
                    onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                    required
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-confirm-password">Confirm Password</Label>
                  <Input
                    id="student-confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={studentForm.confirmPassword}
                    onChange={(e) => setStudentForm({ ...studentForm, confirmPassword: e.target.value })}
                    required
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-email">Parent's Email</Label>
                  <Input
                    id="parent-email"
                    type="email"
                    placeholder="Enter your parent's email"
                    value={studentForm.parentEmail}
                    onChange={(e) => setStudentForm({ ...studentForm, parentEmail: e.target.value })}
                    required
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register as Student"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="parent">
              <form onSubmit={handleParentSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="parent-name">Full Name</Label>
                  <Input
                    id="parent-name"
                    placeholder="Enter your full name"
                    value={parentForm.name}
                    onChange={(e) => setParentForm({ ...parentForm, name: e.target.value })}
                    required
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-email">Email</Label>
                  <Input
                    id="parent-email"
                    type="email"
                    placeholder="Enter your email"
                    value={parentForm.email}
                    onChange={(e) => setParentForm({ ...parentForm, email: e.target.value })}
                    required
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-password">Password</Label>
                  <Input
                    id="parent-password"
                    type="password"
                    placeholder="Create a password"
                    value={parentForm.password}
                    onChange={(e) => setParentForm({ ...parentForm, password: e.target.value })}
                    required
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-confirm-password">Confirm Password</Label>
                  <Input
                    id="parent-confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={parentForm.confirmPassword}
                    onChange={(e) => setParentForm({ ...parentForm, confirmPassword: e.target.value })}
                    required
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register as Parent"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/login/student" className="text-blue-500 hover:text-blue-400">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}


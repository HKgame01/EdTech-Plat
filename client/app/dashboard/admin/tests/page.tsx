"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Plus, CheckCircle, AlertCircle, Eye, Edit, Trash2 } from "lucide-react"

export default function AdminTests() {
  const handleRedirect = () => {
      window.location.href = "/test"
    }
  const [tests, setTests] = useState({
    pending: [
      {
        id: 1,
        title: "Calculus: Derivatives",
        subject: "Mathematics",
        creator: "Dr. Smith",
        created: "Apr 2, 2023",
        status: "Pending Review",
      },
      {
        id: 2,
        title: "Newton's Laws of Motion",
        subject: "Physics",
        creator: "Prof. Johnson",
        created: "Apr 3, 2023",
        status: "Pending Review",
      },
    ],
    published: [
      {
        id: 3,
        title: "Algebra Fundamentals",
        subject: "Mathematics",
        creator: "Dr. Smith",
        published: "Mar 25, 2023",
        attempts: 45,
        avgScore: 82,
      },
      {
        id: 4,
        title: "Chemical Reactions",
        subject: "Chemistry",
        creator: "Dr. Wilson",
        published: "Mar 20, 2023",
        attempts: 38,
        avgScore: 78,
      },
    ],
  })

  const [newTest, setNewTest] = useState({
    title: "",
    subject: "",
    description: "",
    duration: "",
    questions: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTest((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewTest((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateTest = () => {
    // In a real app, this would send data to the API
    console.log("Creating test:", newTest)
    // Reset form
    setNewTest({
      title: "",
      subject: "",
      description: "",
      duration: "",
      questions: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Test Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Test
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle>Create New Test</DialogTitle>
              <DialogDescription className="text-slate-400">
                Fill in the details to create a new test. The test will be generated using AI.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-slate-300">
                  Test Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={newTest.title}
                  onChange={handleInputChange}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="e.g., Calculus: Derivatives"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject" className="text-slate-300">
                  Subject
                </Label>
                <Select onValueChange={(value) => handleSelectChange("subject", value)} value={newTest.subject}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-slate-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newTest.description}
                  onChange={handleInputChange}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="Describe what this test covers..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duration" className="text-slate-300">
                    Duration (minutes)
                  </Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    value={newTest.duration}
                    onChange={handleInputChange}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="e.g., 45"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="questions" className="text-slate-300">
                    Number of Questions
                  </Label>
                  <Input
                    id="questions"
                    name="questions"
                    type="number"
                    value={newTest.questions}
                    onChange={handleInputChange}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="e.g., 15"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="text-white border-slate-700">
                Cancel
              </Button>
              <Button onClick={handleRedirect} className="bg-blue-600 hover:bg-blue-700">
                Generate Test
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="pending" className="data-[state=active]:bg-slate-700">
            Pending Review
          </TabsTrigger>
          <TabsTrigger value="published" className="data-[state=active]:bg-slate-700">
            Published Tests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {tests.pending.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tests.pending.map((test) => (
                <Card key={test.id} className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">{test.title}</CardTitle>
                        <CardDescription className="text-slate-400">{test.subject}</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                        {test.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-400">Created by: {test.creator}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-400">Created on: {test.created}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Eye className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                    <Button variant="outline" className="flex-1 text-white border-slate-700">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">All Caught Up!</h3>
                <p className="text-slate-400 text-center max-w-md">There are no tests pending review at the moment.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          {tests.published.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tests.published.map((test) => (
                <Card key={test.id} className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">{test.title}</CardTitle>
                        <CardDescription className="text-slate-400">{test.subject}</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        Published
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-400">Created by: {test.creator}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-slate-400">Published on: {test.published}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-400">
                          Attempts: {test.attempts} | Avg. Score: {test.avgScore}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Eye className="h-4 w-4 mr-2" />
                      View Results
                    </Button>
                    <Button variant="destructive" className="flex-1">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Unpublish
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No Published Tests</h3>
                <p className="text-slate-400 text-center max-w-md">
                  You haven't published any tests yet. Create a test and publish it to see it here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}


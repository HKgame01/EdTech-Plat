"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, BookOpen, Users, Calendar, Video, Plus } from "lucide-react"
import { VideoChat } from "@/components/video-chat"
import { createClassSession } from "@/lib/stream"
import { useToast } from "@/hooks/use-toast"

export default function AdminClasses() {
  const handleRedirect = () => {
    window.location.href = 'http://localhost:3001/react-rtc-demo'; // or any external/internal URL
  };
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedClass, setSelectedClass] = useState<any>(null)
  const [isCreatingClass, setIsCreatingClass] = useState(false)
  const [newClass, setNewClass] = useState({
    name: "",
    grade: "",
    description: "",
    schedule: "",
  })
  const { toast } = useToast()

  // Mock data for classes
  const classes = [
    {
      id: 1,
      name: "Advanced Calculus",
      grade: "10th Grade",
      description: "Calculus course covering derivatives, integrals, and applications",
      schedule: "Mon, Wed, Fri • 10:00 AM",
      students: 28,
      nextSession: new Date(2025, 3, 8, 10, 0), // April 8, 2025, 10:00 AM
      status: "upcoming",
    },
    {
      id: 2,
      name: "Physics Mechanics",
      grade: "11th Grade",
      description: "Study of motion, forces, energy, and momentum",
      schedule: "Tue, Thu • 1:30 PM",
      students: 24,
      nextSession: new Date(2025, 3, 9, 13, 30), // April 9, 2025, 1:30 PM
      status: "upcoming",
    },
    {
      id: 3,
      name: "Organic Chemistry",
      grade: "12th Grade",
      description: "Study of carbon compounds and their reactions",
      schedule: "Mon, Wed • 11:15 AM",
      students: 22,
      nextSession: new Date(2025, 3, 8, 11, 15), // April 8, 2025, 11:15 AM
      status: "upcoming",
    },
    {
      id: 4,
      name: "Algebra Fundamentals",
      grade: "9th Grade",
      description: "Basic algebraic concepts and problem-solving",
      schedule: "Tue, Thu • 9:00 AM",
      students: 30,
      nextSession: new Date(2025, 3, 9, 9, 0), // April 9, 2025, 9:00 AM
      status: "upcoming",
    },
    {
      id: 5,
      name: "Biology Basics",
      grade: "9th Grade",
      description: "Introduction to biological concepts and systems",
      schedule: "Wed, Fri • 2:00 PM",
      students: 26,
      nextSession: new Date(2025, 3, 10, 14, 0), // April 10, 2025, 2:00 PM
      status: "upcoming",
    },
  ]

  // Filter classes based on search query and active tab
  const filteredClasses = classes.filter(
    (cls) =>
      (cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeTab === "all" || cls.status === activeTab),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewClass((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewClass((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateClass = async () => {
    try {
      setIsCreatingClass(true)
      // In a real app, this would send data to the API
      console.log("Creating class:", newClass)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Class created successfully",
        description: `${newClass.name} has been added to your classes`,
      })

      // Reset form
      setNewClass({
        name: "",
        grade: "",
        description: "",
        schedule: "",
      })
    } catch (error) {
      toast({
        title: "Error creating class",
        description: "Failed to create class. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreatingClass(false)
    }
  }

  const handleStartClass = async (cls: any) => {
    try {
      toast({
        title: "Starting class session",
        description: "Preparing video call...",
      })

      // Create a class session
      const call = await createClassSession(
        "teacher-123", // Teacher ID (in a real app, this would be the actual user ID)
        cls.name,
        cls.description,
      )

      // Set selected class to show video chat
      setSelectedClass({
        ...cls,
        callId: call.id,
      })
    } catch (error) {
      console.error("Error starting class:", error)
      toast({
        title: "Error starting class",
        description: "Failed to start video session. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCallEnded = (data: { transcript: string; test: string; notes: string }) => {
    console.log("Call ended with data:", data)
    toast({
      title: "Class ended successfully",
      description: "Test and notes have been generated from the transcript",
    })
    setSelectedClass(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Classes</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleRedirect} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Class
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle>Create New Class</DialogTitle>
              <DialogDescription className="text-slate-400">
                Fill in the details to create a new class.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-slate-300">
                  Class Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newClass.name}
                  onChange={handleInputChange}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="e.g., Advanced Calculus"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="grade" className="text-slate-300">
                  Grade
                </Label>
                <Select onValueChange={(value) => handleSelectChange("grade", value)} value={newClass.grade}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="9th Grade">9th Grade</SelectItem>
                    <SelectItem value="10th Grade">10th Grade</SelectItem>
                    <SelectItem value="11th Grade">11th Grade</SelectItem>
                    <SelectItem value="12th Grade">12th Grade</SelectItem>
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
                  value={newClass.description}
                  onChange={handleInputChange}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="Describe what this class covers..."
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="schedule" className="text-slate-300">
                  Schedule
                </Label>
                <Input
                  id="schedule"
                  name="schedule"
                  value={newClass.schedule}
                  onChange={handleInputChange}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="e.g., Mon, Wed, Fri • 10:00 AM"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="text-white border-slate-700">
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateClass} disabled={isCreatingClass}>
                {isCreatingClass ? "Creating..." : "Create Class"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {selectedClass ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">{selectedClass.name} - Live Session</h2>
            <Button onClick={handleRedirect} variant="outline" className="text-white border-slate-700" onClick={() => setSelectedClass(null)}>
              Back to Classes
            </Button>
          </div>
          <VideoChat
            userId="teacher-123" // In a real app, this would be the actual user ID
            userName="Teacher" // In a real app, this would be the actual user name
            role="teacher"
            callId={selectedClass.callId}
            subject={selectedClass.name}
            onCallEnded={handleCallEnded}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search classes..."
                className="pl-10 bg-slate-800 border-slate-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="upcoming" className="w-full md:w-auto" onValueChange={setActiveTab}>
              <TabsList className="bg-slate-800 border-slate-700 w-full md:w-auto">
                <TabsTrigger value="upcoming" className="flex-1 md:flex-none data-[state=active]:bg-slate-700">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="active" className="flex-1 md:flex-none data-[state=active]:bg-slate-700">
                  Active
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex-1 md:flex-none data-[state=active]:bg-slate-700">
                  Completed
                </TabsTrigger>
                <TabsTrigger value="all" className="flex-1 md:flex-none data-[state=active]:bg-slate-700">
                  All
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredClasses.map((cls) => (
              <Card key={cls.id} className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{cls.name}</CardTitle>
                      <CardDescription className="text-slate-400">{cls.grade}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                      {cls.students} Students
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-400">{cls.description}</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-400">Schedule: {cls.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-400">
                        Next Session:{" "}
                        {cls.nextSession.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button onClick={handleRedirect} className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => handleStartClass(cls)}>
                    <Video className="h-4 w-4 mr-2" />
                    Start Class
                  </Button>
                  <Button variant="outline" className="flex-1 text-white border-slate-700">
                    <Users className="h-4 w-4 mr-2" />
                    View Students
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {filteredClasses.length === 0 && (
              <div className="col-span-full">
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-12 w-12 text-slate-400 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No Classes Found</h3>
                    <p className="text-slate-400 text-center max-w-md">
                      {searchQuery
                        ? `No classes matching "${searchQuery}" were found.`
                        : "There are no classes matching the selected filter."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}


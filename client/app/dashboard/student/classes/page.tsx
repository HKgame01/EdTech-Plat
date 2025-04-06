"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, Video, Users, Clock } from "lucide-react"

export default function StudentClasses() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleRedirect = () => {
    window.location.href = "http://localhost:3001/react-rtc-demo" // or any external/internal URL
  }

  // Mock data for classes
  const enrolledClasses = [
    {
      id: 1,
      name: "Advanced Calculus",
      subject: "Mathematics",
      teacher: "Dr. Smith",
      schedule: "Mon, Wed, Fri • 10:00 AM",
      students: 28,
      progress: 75,
    },
    {
      id: 2,
      name: "Physics Mechanics",
      subject: "Physics",
      teacher: "Prof. Johnson",
      schedule: "Tue, Thu • 1:30 PM",
      students: 24,
      progress: 60,
    },
    {
      id: 3,
      name: "Organic Chemistry",
      subject: "Chemistry",
      teacher: "Dr. Wilson",
      schedule: "Mon, Wed • 11:15 AM",
      students: 22,
      progress: 45,
    },
    {
      id: 4,
      name: "Cell Biology",
      subject: "Biology",
      teacher: "Prof. Martinez",
      schedule: "Tue, Thu • 3:00 PM",
      students: 26,
      progress: 90,
    },
  ]

  const availableClasses = [
    {
      id: 5,
      name: "World History",
      subject: "History",
      teacher: "Dr. Thompson",
      schedule: "Mon, Wed • 2:00 PM",
      students: 30,
    },
    {
      id: 6,
      name: "English Literature",
      subject: "English",
      teacher: "Prof. Garcia",
      schedule: "Tue, Thu • 9:30 AM",
      students: 25,
    },
  ]

  // Filter classes based on search query
  const filteredEnrolled = enrolledClasses.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.teacher.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredAvailable = availableClasses.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.teacher.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">My Classes</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search classes..."
          className="pl-10 bg-slate-800 border-slate-700 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="enrolled" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="enrolled" className="data-[state=active]:bg-slate-700">
            Enrolled Classes
          </TabsTrigger>
          <TabsTrigger value="available" className="data-[state=active]:bg-slate-700">
            Available Classes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEnrolled.map((cls) => (
              <Card key={cls.id} className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{cls.name}</CardTitle>
                      <CardDescription className="text-slate-400">{cls.subject}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                      Enrolled
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-400">Instructor: {cls.teacher}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-400">Schedule: {cls.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-400">{cls.students} students enrolled</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-400">Progress</span>
                        <span className="text-sm font-medium text-slate-400">{cls.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${cls.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button onClick={handleRedirect} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Video className="h-4 w-4 mr-2" />
                    Join Class
                  </Button>
                  <Button variant="outline" className="flex-1 text-white border-slate-700">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Materials
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {filteredEnrolled.length === 0 && (
              <div className="col-span-full">
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-12 w-12 text-slate-400 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No Classes Found</h3>
                    <p className="text-slate-400 text-center max-w-md">
                      {searchQuery
                        ? `No enrolled classes matching "${searchQuery}" were found.`
                        : "You are not enrolled in any classes yet."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAvailable.map((cls) => (
              <Card key={cls.id} className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{cls.name}</CardTitle>
                      <CardDescription className="text-slate-400">{cls.subject}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                      Available
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-400">Instructor: {cls.teacher}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-400">Schedule: {cls.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-400">{cls.students} students enrolled</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Enroll in Class</Button>
                </CardFooter>
              </Card>
            ))}

            {filteredAvailable.length === 0 && (
              <div className="col-span-full">
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-12 w-12 text-slate-400 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No Available Classes</h3>
                    <p className="text-slate-400 text-center max-w-md">
                      {searchQuery
                        ? `No available classes matching "${searchQuery}" were found.`
                        : "There are no available classes at the moment."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


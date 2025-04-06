"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Users, BookOpen, FileText, BarChart, Mail } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

export default function AdminStudents() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGrade, setSelectedGrade] = useState<string>("all")
  const [selectedClass, setSelectedClass] = useState<string>("all")

  // Mock data for students
  const students = [
    {
      id: 1,
      name: "Arjun Sharma",
      email: "arjun.s@example.com",
      grade: "10th Grade",
      class: "Mathematics",
      attendance: 95,
      avgScore: 88,
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.p@example.com",
      grade: "10th Grade",
      class: "Physics",
      attendance: 92,
      avgScore: 91,
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul.v@example.com",
      grade: "9th Grade",
      class: "Mathematics",
      attendance: 88,
      avgScore: 76,
      lastActive: "3 hours ago",
    },
    {
      id: 4,
      name: "Ananya Singh",
      email: "ananya.s@example.com",
      grade: "9th Grade",
      class: "Biology",
      attendance: 97,
      avgScore: 94,
      lastActive: "5 hours ago",
    },
    {
      id: 5,
      name: "Vikram Malhotra",
      email: "vikram.m@example.com",
      grade: "11th Grade",
      class: "Chemistry",
      attendance: 85,
      avgScore: 82,
      lastActive: "1 hour ago",
    },
    {
      id: 6,
      name: "Neha Gupta",
      email: "neha.g@example.com",
      grade: "11th Grade",
      class: "Physics",
      attendance: 91,
      avgScore: 89,
      lastActive: "4 hours ago",
    },
  ]

  // Get unique grades and classes for filters
  const grades = [...new Set(students.map((student) => student.grade))]
  const classes = [...new Set(students.map((student) => student.class))]

  // Filter students based on search query and filters
  const filteredStudents = students.filter(
    (student) =>
      (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedGrade === "all" || student.grade === selectedGrade) &&
      (selectedClass === "all" || student.class === selectedClass),
  )

  // Group students by grade for the grade view
  const studentsByGrade = grades.reduce(
    (acc, grade) => {
      acc[grade] = filteredStudents.filter((student) => student.grade === grade)
      return acc
    },
    {} as Record<string, typeof students>,
  )

  // Group students by class for the class view
  const studentsByClass = classes.reduce(
    (acc, className) => {
      acc[className] = filteredStudents.filter((student) => student.class === className)
      return acc
    },
    {} as Record<string, typeof students>,
  )

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Students</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Mail className="h-4 w-4 mr-2" />
            Message All
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search students..."
              className="pl-10 bg-slate-800 border-slate-700 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-full md:w-[180px] bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="all">All Grades</SelectItem>
              {grades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full md:w-[180px] bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="all">All Classes</SelectItem>
              {classes.map((className) => (
                <SelectItem key={className} value={className}>
                  {className}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="list" className="data-[state=active]:bg-slate-700">
              <Users className="h-4 w-4 mr-2" />
              List View
            </TabsTrigger>
            <TabsTrigger value="grade" className="data-[state=active]:bg-slate-700">
              <BookOpen className="h-4 w-4 mr-2" />
              By Grade
            </TabsTrigger>
            <TabsTrigger value="class" className="data-[state=active]:bg-slate-700">
              <FileText className="h-4 w-4 mr-2" />
              By Class
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}

              {filteredStudents.length === 0 && (
                <div className="col-span-full">
                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Users className="h-12 w-12 text-slate-400 mb-4" />
                      <h3 className="text-xl font-medium text-white mb-2">No Students Found</h3>
                      <p className="text-slate-400 text-center max-w-md">
                        {searchQuery
                          ? `No students matching "${searchQuery}" were found.`
                          : "There are no students matching the selected filters."}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="grade" className="space-y-6">
            {Object.entries(studentsByGrade).map(([grade, students]) => (
              <div key={grade} className="space-y-4">
                <h2 className="text-xl font-bold text-white">{grade}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students.map((student) => (
                    <StudentCard key={student.id} student={student} />
                  ))}
                </div>
                {students.length === 0 && (
                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="py-6 text-center">
                      <p className="text-slate-400">No students in this grade match your search.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}

            {Object.keys(studentsByGrade).length === 0 && (
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-slate-400 mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No Students Found</h3>
                  <p className="text-slate-400 text-center max-w-md">
                    There are no students matching the selected filters.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="class" className="space-y-6">
            {Object.entries(studentsByClass).map(([className, students]) => (
              <div key={className} className="space-y-4">
                <h2 className="text-xl font-bold text-white">{className}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students.map((student) => (
                    <StudentCard key={student.id} student={student} />
                  ))}
                </div>
                {students.length === 0 && (
                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="py-6 text-center">
                      <p className="text-slate-400">No students in this class match your search.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}

            {Object.keys(studentsByClass).length === 0 && (
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-slate-400 mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No Students Found</h3>
                  <p className="text-slate-400 text-center max-w-md">
                    There are no students matching the selected filters.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AuthGuard>
  )
}

function StudentCard({ student }: { student: any }) {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white">{student.name}</CardTitle>
            <CardDescription className="text-slate-400">{student.email}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
            {student.grade}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Class:</span>
            <span className="text-sm font-medium text-white">{student.class}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Attendance:</span>
            <span className="text-sm font-medium text-white">{student.attendance}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Average Score:</span>
            <span className="text-sm font-medium text-white">{student.avgScore}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Last Active:</span>
            <span className="text-sm font-medium text-white">{student.lastActive}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          <BarChart className="h-4 w-4 mr-2" />
          View Report
        </Button>
        <Button variant="outline" className="flex-1 text-white border-slate-700">
          <Mail className="h-4 w-4 mr-2" />
          Message
        </Button>
      </CardFooter>
    </Card>
  )
}


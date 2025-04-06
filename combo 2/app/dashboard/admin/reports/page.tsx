"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, BarChart, Download, FileText, Users, BookOpen } from "lucide-react"

export default function AdminReports() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState<string>("all")
  const [selectedGrade, setSelectedGrade] = useState<string>("all")

  // Mock data for student reports
  const studentReports = [
    {
      id: 1,
      name: "Alex Johnson",
      grade: "10th Grade",
      class: "Mathematics",
      attendance: 95,
      avgScore: 88,
      testsTaken: 12,
      testsCompleted: 12,
      lastTest: "Calculus: Derivatives",
      lastScore: 92,
    },
    {
      id: 2,
      name: "Emma Wilson",
      grade: "10th Grade",
      class: "Physics",
      attendance: 92,
      avgScore: 91,
      testsTaken: 10,
      testsCompleted: 10,
      lastTest: "Newton's Laws of Motion",
      lastScore: 95,
    },
    {
      id: 3,
      name: "Michael Brown",
      grade: "9th Grade",
      class: "Mathematics",
      attendance: 88,
      avgScore: 76,
      testsTaken: 12,
      testsCompleted: 11,
      lastTest: "Algebra Fundamentals",
      lastScore: 72,
    },
    {
      id: 4,
      name: "Sophia Davis",
      grade: "9th Grade",
      class: "Biology",
      attendance: 97,
      avgScore: 94,
      testsTaken: 8,
      testsCompleted: 8,
      lastTest: "Cell Biology",
      lastScore: 98,
    },
    {
      id: 5,
      name: "James Miller",
      grade: "11th Grade",
      class: "Chemistry",
      attendance: 85,
      avgScore: 82,
      testsTaken: 9,
      testsCompleted: 8,
      lastTest: "Chemical Reactions",
      lastScore: 85,
    },
    {
      id: 6,
      name: "Olivia Garcia",
      grade: "11th Grade",
      class: "Physics",
      attendance: 91,
      avgScore: 89,
      testsTaken: 11,
      testsCompleted: 11,
      lastTest: "Electromagnetism",
      lastScore: 91,
    },
  ]

  // Mock data for class reports
  const classReports = [
    {
      id: 1,
      name: "Advanced Calculus",
      grade: "10th Grade",
      students: 28,
      avgAttendance: 92,
      avgScore: 85,
      testsAssigned: 12,
      completionRate: 95,
    },
    {
      id: 2,
      name: "Physics Mechanics",
      grade: "11th Grade",
      students: 24,
      avgAttendance: 90,
      avgScore: 88,
      testsAssigned: 10,
      completionRate: 92,
    },
    {
      id: 3,
      name: "Organic Chemistry",
      grade: "12th Grade",
      students: 22,
      avgAttendance: 88,
      avgScore: 82,
      testsAssigned: 9,
      completionRate: 89,
    },
    {
      id: 4,
      name: "Algebra Fundamentals",
      grade: "9th Grade",
      students: 30,
      avgAttendance: 94,
      avgScore: 79,
      testsAssigned: 12,
      completionRate: 91,
    },
    {
      id: 5,
      name: "Biology Basics",
      grade: "9th Grade",
      students: 26,
      avgAttendance: 93,
      avgScore: 86,
      testsAssigned: 8,
      completionRate: 94,
    },
  ]

  // Get unique classes and grades for filters
  const classes = [...new Set(studentReports.map((report) => report.class))]
  const grades = [...new Set(studentReports.map((report) => report.grade))]

  // Filter student reports based on search query and filters
  const filteredStudentReports = studentReports.filter(
    (report) =>
      (report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.class.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedClass === "all" || report.class === selectedClass) &&
      (selectedGrade === "all" || report.grade === selectedGrade),
  )

  // Filter class reports based on filters
  const filteredClassReports = classReports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedGrade === "all" || report.grade === selectedGrade),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Reports</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Export Reports
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search reports..."
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

      <Tabs defaultValue="students" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="students" className="data-[state=active]:bg-slate-700">
            <Users className="h-4 w-4 mr-2" />
            Student Reports
          </TabsTrigger>
          <TabsTrigger value="classes" className="data-[state=active]:bg-slate-700">
            <BookOpen className="h-4 w-4 mr-2" />
            Class Reports
          </TabsTrigger>
          <TabsTrigger value="tests" className="data-[state=active]:bg-slate-700">
            <FileText className="h-4 w-4 mr-2" />
            Test Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudentReports.map((report) => (
              <Card key={report.id} className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{report.name}</CardTitle>
                      <CardDescription className="text-slate-400">
                        {report.grade} • {report.class}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                      Avg: {report.avgScore}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-400">Attendance</span>
                      <span className="text-sm font-medium text-slate-400">{report.attendance}%</span>
                    </div>
                    <Progress value={report.attendance} className="h-2 bg-slate-800" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-400">Average Score</span>
                      <span className="text-sm font-medium text-slate-400">{report.avgScore}%</span>
                    </div>
                    <Progress value={report.avgScore} className="h-2 bg-slate-800" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Tests Completed:</span>
                    <span className="text-sm font-medium text-white">
                      {report.testsCompleted}/{report.testsTaken}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Last Test:</span>
                    <span className="text-sm font-medium text-white">{report.lastTest}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Last Score:</span>
                    <span className="text-sm font-medium text-white">{report.lastScore}%</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <BarChart className="h-4 w-4 mr-2" />
                    View Detailed Report
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {filteredStudentReports.length === 0 && (
              <div className="col-span-full">
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Users className="h-12 w-12 text-slate-400 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No Student Reports Found</h3>
                    <p className="text-slate-400 text-center max-w-md">
                      {searchQuery
                        ? `No student reports matching "${searchQuery}" were found.`
                        : "There are no student reports matching the selected filters."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="classes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredClassReports.map((report) => (
              <Card key={report.id} className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{report.name}</CardTitle>
                      <CardDescription className="text-slate-400">
                        {report.grade} • {report.students} students
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                      Avg: {report.avgScore}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-400">Average Attendance</span>
                      <span className="text-sm font-medium text-slate-400">{report.avgAttendance}%</span>
                    </div>
                    <Progress value={report.avgAttendance} className="h-2 bg-slate-800" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-400">Average Score</span>
                      <span className="text-sm font-medium text-slate-400">{report.avgScore}%</span>
                    </div>
                    <Progress value={report.avgScore} className="h-2 bg-slate-800" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-400">Test Completion Rate</span>
                      <span className="text-sm font-medium text-slate-400">{report.completionRate}%</span>
                    </div>
                    <Progress value={report.completionRate} className="h-2 bg-slate-800" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Tests Assigned:</span>
                    <span className="text-sm font-medium text-white">{report.testsAssigned}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <BarChart className="h-4 w-4 mr-2" />
                    View Report
                  </Button>
                  <Button variant="outline" className="flex-1 text-white border-slate-700">
                    <Users className="h-4 w-4 mr-2" />
                    View Students
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {filteredClassReports.length === 0 && (
              <div className="col-span-full">
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-12 w-12 text-slate-400 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No Class Reports Found</h3>
                    <p className="text-slate-400 text-center max-w-md">
                      {searchQuery
                        ? `No class reports matching "${searchQuery}" were found.`
                        : "There are no class reports matching the selected filters."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Test Reports Coming Soon</h3>
              <p className="text-slate-400 text-center max-w-md">
                Detailed test analytics and reports will be available in the next update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


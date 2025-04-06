'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { FileText, Users } from "lucide-react"
import { useSession } from "@/lib/session"
import { getChildrenForParent } from "@/lib/auth"

export default function ParentDashboardContent() {
  const { user } = useSession()
  const children = user ? getChildrenForParent(user.id) : []

  const reportCards = children.map((child) => ({
    id: child.id,
    student: child.name,
    term: "Spring 2023",
    subjects: [
      { name: "Mathematics", grade: "A", score: 92 },
      { name: "Physics", grade: "B+", score: 88 },
      { name: "English", grade: "A-", score: 90 },
      { name: "History", grade: "B", score: 85 },
    ],
    gpa: "3.75",
  }))

  const upcomingTests = children.map((child) => ({
    id: child.id,
    subject: "Mathematics",
    date: "Apr 7, 2023",
    student: child.name,
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Parent Dashboard</h1>
        <Button variant="outline" className="text-white border-slate-700">
          <Users className="h-4 w-4 mr-2" />
          Switch Student
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {children.map((child) => (
          <Card key={child.id} className="bg-slate-900 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{child.name}</h3>
                  <p className="text-sm text-slate-400">
                    {child.grade} • {child.class}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="report-cards" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger
            value="report-cards"
            className="data-[state=active]:bg-slate-700"
          >
            Report Cards
          </TabsTrigger>
          <TabsTrigger
            value="upcoming-tests"
            className="data-[state=active]:bg-slate-700"
          >
            Upcoming Tests
          </TabsTrigger>
          <TabsTrigger
            value="attendance"
            className="data-[state=active]:bg-slate-700"
          >
            Attendance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="report-cards" className="space-y-4">
          {reportCards.map((report) => (
            <Card key={report.id} className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">
                      {report.student}'s Report Card
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {report.term} • GPA: {report.gpa}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    className="text-white border-slate-700"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {report.subjects.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-white">
                          {subject.name}
                        </span>
                        <span className="text-sm font-medium text-slate-400">
                          {subject.grade} ({subject.score}%)
                        </span>
                      </div>
                      <Progress
                        value={subject.score}
                        className="h-2 bg-slate-800"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="upcoming-tests" className="space-y-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Upcoming Tests</CardTitle>
              <CardDescription className="text-slate-400">
                Tests scheduled for your children
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between p-4 bg-slate-800 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-red-500/20 p-3 rounded-full">
                        <FileText className="h-5 w-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          {test.subject}
                        </h3>
                        <p className="text-sm text-slate-400">{test.student}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-slate-300">
                      {test.date}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Attendance Summary</CardTitle>
              <CardDescription className="text-slate-400">
                Attendance records for the current semester
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {children.map((child) => (
                  <div key={child.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white">
                        {child.name}
                      </span>
                      <span className="text-sm font-medium text-slate-400">
                        {child.attendance}%
                      </span>
                    </div>
                    <Progress
                      value={child.attendance}
                      className="h-2 bg-slate-800"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, BookOpen, FileText } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

export default function StudentDashboard() {
  // Mock data for student dashboard
  const handleRedirect = () => {
    window.location.href = 'http://localhost:3001/react-rtc-demo';
  };

  const upcomingClasses = [
    { id: 1, subject: "Mathematics", time: "10:00 AM", teacher: "Dr. Ramesh Kumar", duration: "1 hour" },
    { id: 2, subject: "Physics", time: "1:30 PM", teacher: "Prof. Sanjay Joshi", duration: "1 hour" },
  ]

  const pendingTests = [
    { id: 1, subject: "Mathematics", topic: "Calculus", deadline: "Tomorrow, 11:59 PM" },
    { id: 2, subject: "Physics", topic: "Mechanics", deadline: "Apr 8, 11:59 PM" },
  ]

  const courseProgress = [
    { id: 1, subject: "Mathematics", progress: 75 },
    { id: 2, subject: "Physics", progress: 60 },
    { id: 3, subject: "Chemistry", progress: 45 },
    { id: 4, subject: "Biology", progress: 90 },
  ]

  return (
    <AuthGuard allowedRoles={["student"]}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-white border-slate-700">
              <Calendar className="h-4 w-4 mr-2" />
              Today
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Classes Attended"
            value="24/30"
            description="80% attendance rate"
            icon={<BookOpen className="h-5 w-5 text-blue-400" />}
          />
          <StatCard
            title="Tests Completed"
            value="18/20"
            description="90% completion rate"
            icon={<FileText className="h-5 w-5 text-green-400" />}
          />
          <StatCard
            title="Average Score"
            value="85%"
            description="Top 15% of class"
            icon={<BookOpen className="h-5 w-5 text-yellow-400" />}
          />
          <StatCard
            title="Study Hours"
            value="42h"
            description="This month"
            icon={<Clock className="h-5 w-5 text-purple-400" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Upcoming Classes</CardTitle>
              <CardDescription className="text-slate-400">Your scheduled virtual classes for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((cls) => (
                  <div key={cls.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500/20 p-3 rounded-full">
                        <BookOpen className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{cls.subject}</h3>
                        <p className="text-sm text-slate-400">
                          {cls.teacher} • {cls.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-300">{cls.time}</span>
                      <Button  onClick={handleRedirect} size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
                {upcomingClasses.length === 0 && (
                  <div className="text-center py-6 text-slate-400">No upcoming classes for today</div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Pending Tests</CardTitle>
              <CardDescription className="text-slate-400">Tests you need to complete</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-red-500/20 p-3 rounded-full">
                        <FileText className="h-5 w-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{test.subject}</h3>
                        <p className="text-sm text-slate-400">{test.topic}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-300">Due: {test.deadline}</span>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Take Test
                      </Button>
                    </div>
                  </div>
                ))}
                {pendingTests.length === 0 && <div className="text-center py-6 text-slate-400">No pending tests</div>}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Course Progress</CardTitle>
            <CardDescription className="text-slate-400">Your progress in current courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {courseProgress.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white">{course.subject}</span>
                    <span className="text-sm font-medium text-slate-400">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2 bg-slate-800" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  )
}

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <h3 className="text-2xl font-bold text-white">{value}</h3>
            <p className="text-xs text-slate-500">{description}</p>
          </div>
          <div className="bg-slate-800 p-2 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}


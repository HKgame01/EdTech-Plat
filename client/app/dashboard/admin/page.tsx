import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, BookOpen, Calendar, FileText, Users } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

export default function AdminDashboard() {
  // Mock data for admin dashboard
  const stats = [
    { title: "Total Students", value: "3,782", change: "+11.01%", icon: <Users className="h-5 w-5 text-blue-400" /> },
    { title: "Total Classes", value: "245", change: "+5.23%", icon: <BookOpen className="h-5 w-5 text-green-400" /> },
    {
      title: "Tests Created",
      value: "1,432",
      change: "+7.84%",
      icon: <FileText className="h-5 w-5 text-yellow-400" />,
    },
    {
      title: "Scheduled Sessions",
      value: "892",
      change: "+3.15%",
      icon: <Calendar className="h-5 w-5 text-purple-400" />,
    },
  ]

  const pendingReviews = [
    { id: 1, title: "Calculus Final Exam", subject: "Mathematics", creator: "Dr. Ramesh Kumar", date: "Apr 7, 2023" },
    { id: 2, title: "Physics Mid-Term", subject: "Physics", creator: "Prof. Sanjay Joshi", date: "Apr 10, 2023" },
    { id: 3, title: "Literature Analysis", subject: "English", creator: "Ms. Anjali Desai", date: "Apr 12, 2023" },
  ]

  const recentActivity = [
    { id: 1, action: "Created new test", subject: "Chemistry", user: "Prof. Anjali Desai", time: "2 hours ago" },
    { id: 2, action: "Scheduled class", subject: "Biology", user: "Dr. Vikram Mehta", time: "3 hours ago" },
    { id: 3, action: "Updated grades", subject: "Mathematics", user: "Dr. Ramesh Kumar", time: "5 hours ago" },
    { id: 4, action: "Added new student", subject: "N/A", user: "Admin", time: "Yesterday" },
  ]

  // Monthly data for the chart
  const monthlyData = [
    { month: "Jan", value: 120 },
    { month: "Feb", value: 350 },
    { month: "Mar", value: 200 },
    { month: "Apr", value: 280 },
    { month: "May", value: 180 },
    { month: "Jun", value: 170 },
    { month: "Jul", value: 250 },
    { month: "Aug", value: 120 },
    { month: "Sep", value: 200 },
    { month: "Oct", value: 300 },
    { month: "Nov", value: 240 },
    { month: "Dec", value: 150 },
  ]

  // Calculate the maximum value for scaling
  const maxValue = Math.max(...monthlyData.map((item) => item.value))

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-white border-slate-700">
              <Calendar className="h-4 w-4 mr-2" />
              Today
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              Create Test
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                    <p className="text-xs text-green-500">{stat.change}</p>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-full">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Monthly Tests Created</CardTitle>
              <CardDescription className="text-slate-400">Number of tests created per month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-end justify-between">
                {monthlyData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div
                      className="bg-blue-500 rounded-t-sm w-10"
                      style={{
                        height: `${(item.value / maxValue) * 200}px`,
                      }}
                    ></div>
                    <span className="text-xs text-slate-400">{item.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Tests Pending Review</CardTitle>
              <CardDescription className="text-slate-400">
                Tests that need your approval before publishing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <div key={review.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-yellow-500/20 p-3 rounded-full">
                        <FileText className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{review.title}</h3>
                        <p className="text-sm text-slate-400">
                          {review.subject} • Created by {review.creator}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-300">{review.date}</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-slate-400">Latest actions by teachers and administrators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500/20 p-3 rounded-full">
                      <BarChart className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{activity.action}</h3>
                      <p className="text-sm text-slate-400">
                        {activity.subject} • {activity.user}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-300">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  )
}


"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, BookOpen, FileText } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { useSession } from "@/lib/session"
import { getChildrenForParent } from "@/lib/auth"

export default function ParentChildrenPage() {
  return (
    <AuthGuard allowedRoles={["parent"]}>
      <ChildrenContent />
    </AuthGuard>
  )
}

function ChildrenContent() {
  const { user } = useSession()
  const [activeTab, setActiveTab] = useState("overview")

  // Get children for the logged-in parent
  const children = user ? getChildrenForParent(user.id) : []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">My Children</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700">
            Overview
          </TabsTrigger>
          <TabsTrigger value="academic" className="data-[state=active]:bg-slate-700">
            Academic Performance
          </TabsTrigger>
          <TabsTrigger value="attendance" className="data-[state=active]:bg-slate-700">
            Attendance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children.map((child) => (
              <Card key={child.id} className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{child.name}</CardTitle>
                      <CardDescription className="text-slate-400">
                        {child.grade} • {child.class}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                      Student
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Average Score:</span>
                      <span className="text-sm font-medium text-white">{child.avgScore}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Attendance:</span>
                      <span className="text-sm font-medium text-white">{child.attendance}%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-400">Academic Progress</span>
                        <span className="text-sm font-medium text-slate-400">{child.avgScore}%</span>
                      </div>
                      <Progress value={child.avgScore} className="h-2 bg-slate-800" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <BarChart className="h-4 w-4 mr-2" />
                    View Report
                  </Button>
                  <Button variant="outline" className="flex-1 text-white border-slate-700">
                    <FileText className="h-4 w-4 mr-2" />
                    View Tests
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          {children.map((child) => (
            <Card key={child.id} className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">{child.name}'s Academic Performance</CardTitle>
                <CardDescription className="text-slate-400">
                  {child.grade} • {child.class}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white">Mathematics</span>
                      <span className="text-sm font-medium text-slate-400">92%</span>
                    </div>
                    <Progress value={92} className="h-2 bg-slate-800" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white">Physics</span>
                      <span className="text-sm font-medium text-slate-400">88%</span>
                    </div>
                    <Progress value={88} className="h-2 bg-slate-800" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white">English</span>
                      <span className="text-sm font-medium text-slate-400">90%</span>
                    </div>
                    <Progress value={90} className="h-2 bg-slate-800" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white">History</span>
                      <span className="text-sm font-medium text-slate-400">85%</span>
                    </div>
                    <Progress value={85} className="h-2 bg-slate-800" />
                  </div>
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
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          {children.map((child) => (
            <Card key={child.id} className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">{child.name}'s Attendance</CardTitle>
                <CardDescription className="text-slate-400">
                  {child.grade} • {child.class}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-500/20 p-3 rounded-full">
                        <BookOpen className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Overall Attendance</h3>
                        <p className="text-sm text-slate-400">Current Semester</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                      {child.attendance}%
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white">Attendance by Subject</h3>
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Mathematics</span>
                        <span className="text-sm font-medium text-white">98%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Physics</span>
                        <span className="text-sm font-medium text-white">95%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">English</span>
                        <span className="text-sm font-medium text-white">92%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">History</span>
                        <span className="text-sm font-medium text-white">90%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <FileText className="h-4 w-4 mr-2" />
                  View Attendance Records
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}


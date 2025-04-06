"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function StudentTests() {
  const handleRedirect = () => {
    window.location.href = "/test"
  }
  const [tests, setTests] = useState({
    pending: [
      {
        id: 1,
        title: "Calculus: Derivatives",
        subject: "Mathematics",
        deadline: "Apr 7, 2023",
        duration: "45 minutes",
        questions: 15,
      },
      {
        id: 2,
        title: "Newton's Laws of Motion",
        subject: "Physics",
        deadline: "Apr 10, 2023",
        duration: "60 minutes",
        questions: 20,
      },
    ],
    completed: [
      {
        id: 3,
        title: "Algebra Fundamentals",
        subject: "Mathematics",
        completedOn: "Mar 28, 2023",
        score: 92,
        grade: "A",
      },
      {
        id: 4,
        title: "Chemical Reactions",
        subject: "Chemistry",
        completedOn: "Mar 25, 2023",
        score: 85,
        grade: "B+",
      },
      {
        id: 5,
        title: "Cell Biology",
        subject: "Biology",
        completedOn: "Mar 20, 2023",
        score: 78,
        grade: "C+",
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Tests</h1>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="pending" className="data-[state=active]:bg-slate-700">
            Pending Tests
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-slate-700">
            Completed Tests
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
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-400">Duration: {test.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-400">{test.questions} questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                        <span className="text-sm text-red-400">Due: {test.deadline}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleRedirect} className="w-full bg-blue-600 hover:bg-blue-700">Start Test</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">All Caught Up!</h3>
                <p className="text-slate-400 text-center max-w-md">
                  You don't have any pending tests at the moment. Check back later or contact your teacher for more
                  information.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {tests.completed.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tests.completed.map((test) => (
                <Card key={test.id} className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">{test.title}</CardTitle>
                        <CardDescription className="text-slate-400">{test.subject}</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        Completed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-slate-400">Completed on: {test.completedOn}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-400">
                          Score: {test.score}% ({test.grade})
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full text-white border-slate-700">
                      View Results
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No Tests Completed</h3>
                <p className="text-slate-400 text-center max-w-md">
                  You haven't completed any tests yet. Once you complete a test, it will appear here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}


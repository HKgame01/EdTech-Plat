"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Video } from "lucide-react"
import { VideoChat } from "@/components/video-chat"
import { getAvailableCalls } from "@/lib/stream"
import { useToast } from "@/hooks/use-toast"

interface ClassSession {
  id: string
  subject: string
  description: string
  teacherId: string
  startTime: string
  duration: number
}

export default function VideoClassesPage() {
  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSession, setActiveSession] = useState<ClassSession | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true)
        const availableCalls = await getAvailableCalls()
        setSessions(availableCalls)
      } catch (error) {
        console.error("Error fetching sessions:", error)
        toast({
          title: "Error",
          description: "Failed to load video classes",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [toast])

  const handleJoinSession = (session: ClassSession) => {
    setActiveSession(session)
  }

  const handleSessionEnded = (data: { transcript: string; test: string; notes: string }) => {
    setActiveSession(null)
    toast({
      title: "Session ended",
      description: "The class has ended and materials have been generated",
    })
  }

  const handleRedirect = () => {
    window.location.href = 'http://localhost:3001/react-rtc-demo';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  if (activeSession) {
    return (
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <Button variant="outline" onClick={() => setActiveSession(null)}>
            ← Back to Classes
          </Button>
        </div>
        <VideoChat
          userId="student-1"
          userName="Alice Smith"
          role="student"
          callId={activeSession.id}
          subject={activeSession.subject}
          onCallEnded={handleSessionEnded}
        />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Video Classes</h1>
        <p className="text-slate-400">Join live video classes with your teachers</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-slate-800/50 border-slate-700 animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-6 bg-slate-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-700 rounded w-full"></div>
                  <div className="h-4 bg-slate-700 rounded w-2/3"></div>
                  <div className="h-8 bg-slate-700 rounded w-1/3 mt-4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : sessions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full overflow-y-auto">
          {sessions.map((session) => (
            <Card key={session.id} className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white">{session.subject}</CardTitle>
                <CardDescription>{session.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-slate-300">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(session.startTime)}</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{session.duration} minutes</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Teacher ID: {session.teacherId}</span>
                  </div>
                </div>
                <Button onClick={handleRedirect} className="w-full">
                  <Video className="h-4 w-4 mr-2" />
                  Join Class
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow text-center p-8">
          <Video className="h-12 w-12 text-slate-500 mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">No Classes Available</h2>
          <p className="text-slate-400 max-w-md">
            There are no scheduled video classes at the moment. Check back later or contact your teacher for more
            information.
          </p>
        </div>
      )}
    </div>
  )
}


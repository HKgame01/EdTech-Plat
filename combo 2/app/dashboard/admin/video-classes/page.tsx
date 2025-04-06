"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, Plus, Users, Video } from "lucide-react"
import { VideoChat } from "@/components/video-chat"
import { getAvailableCalls, createClassSession } from "@/lib/stream"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ClassSession {
  id: string
  subject: string
  description: string
  teacherId: string
  startTime: string
  duration: number
}

export default function AdminVideoClassesPage() {
  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSession, setActiveSession] = useState<ClassSession | null>(null)
  const [newClass, setNewClass] = useState({
    subject: "",
    description: "",
    duration: "60",
  })
  const [isCreating, setIsCreating] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
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

  const handleRedirect = () => {
    window.location.href = 'http://localhost:3001/react-rtc-demo'; // or any external/internal URL
  };

  const handleCreateSession = async () => {
    try {
      setIsCreating(true)

      if (!newClass.subject || !newClass.description) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        })
        return
      }

      const call = await createClassSession("teacher-1", newClass.subject, newClass.description)

      // Refresh the list of sessions
      const updatedCalls = await getAvailableCalls()
      setSessions(updatedCalls)

      // Reset form and close dialog
      setNewClass({
        subject: "",
        description: "",
        duration: "60",
      })
      setDialogOpen(false)

      toast({
        title: "Success",
        description: "Class session created successfully",
      })
    } catch (error) {
      console.error("Error creating session:", error)
      toast({
        title: "Error",
        description: "Failed to create class session",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  const handleJoinSession = (session: ClassSession) => {
    setActiveSession(session)
  }

  const handleSessionEnded = (data: { transcript: string; test: string; notes: string }) => {
    setActiveSession(null)
    toast({
      title: "Session ended",
      description: "The class has ended and materials have been generated",
    })

    // Refresh the list of sessions
    getAvailableCalls().then(setSessions)
  }

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
          userId="teacher-1"
          userName="Mr. Johnson"
          role="teacher"
          callId={activeSession.id}
          subject={activeSession.subject}
          onCallEnded={handleSessionEnded}
        />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Video Classes</h1>
          <p className="text-slate-400">Create and manage live video classes</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button  onClick={handleRedirect}>
              <Plus className="h-4 w-4 mr-2" />
              Create Class
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 text-white border-slate-700">
            <DialogHeader>
              <DialogTitle>Create New Class Session</DialogTitle>
              <DialogDescription className="text-slate-400">
                Fill in the details to create a new video class session.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newClass.subject}
                  onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                  placeholder="e.g. Mathematics"
                  className="bg-slate-800 border-slate-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newClass.description}
                  onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                  placeholder="e.g. Introduction to Algebra"
                  className="bg-slate-800 border-slate-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newClass.duration}
                  onChange={(e) => setNewClass({ ...newClass, duration: e.target.value })}
                  className="bg-slate-800 border-slate-700"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateSession} disabled={isCreating}>
                {isCreating ? <>Creating...</> : <>Create Class</>}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                <Button  onClick={handleRedirect} className="w-full">
                  <Video className="h-4 w-4 mr-2" />
                  Start Class
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow text-center p-8">
          <Video className="h-12 w-12 text-slate-500 mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">No Classes Created</h2>
          <p className="text-slate-400 max-w-md mb-6">
            You haven't created any video classes yet. Click the "Create Class" button to get started.
          </p>
          <Button  onClick={handleRedirect}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Class
          </Button>
        </div>
      )}
    </div>
  )
}


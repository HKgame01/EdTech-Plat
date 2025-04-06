"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { connectUser } from "@/lib/stream"
import { Loader2, Video, PhoneOff, Users, MessageSquare, Mic, MicOff, Camera, CameraOff } from "lucide-react"
import { ChatPanel } from "@/components/chat-panel"

interface VideoCallProps {
  userId: string
  userName: string
  role: string
  callId: string
  subject: string
  onCallEnded?: (data: { transcript: string; test: string; notes: string }) => void
}

export function VideoChat({ userId, userName, role, callId, subject, onCallEnded }: VideoCallProps) {
  const [isConnecting, setIsConnecting] = useState(true)
  const [isCallEnding, setIsCallEnding] = useState(false)
  const [activeTab, setActiveTab] = useState("video")
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [participants, setParticipants] = useState([
    { id: "teacher-1", name: "Mr. Johnson", role: "teacher", isSpeaking: true },
    { id: "student-1", name: "Alice Smith", role: "student", isSpeaking: false },
    { id: "student-2", name: "Bob Jones", role: "student", isSpeaking: false },
  ])
  const { toast } = useToast()

  useEffect(() => {
    const init = async () => {
      try {
        setIsConnecting(true)
        // Connect user to Stream (mock)
        await connectUser(userId, userName, role)

        // Simulate connection delay
        setTimeout(() => {
          setIsConnecting(false)
        }, 1500)
      } catch (error) {
        console.error("Error initializing video call:", error)
        toast({
          title: "Error connecting to video call",
          description: "Using fallback implementation",
          variant: "destructive",
        })
        setIsConnecting(false)
      }
    }

    init()
  }, [userId, userName, role, callId, toast])

  const handleEndCall = async () => {
    if (role !== "teacher" && role !== "admin") return

    try {
      setIsCallEnding(true)
      toast({
        title: "Ending class",
        description: "Processing recording and generating materials...",
      })

      // Simulate processing delay
      setTimeout(() => {
        setIsCallEnding(false)

        const result = {
          transcript: "This is a simulated transcript from the class recording.",
          test: JSON.stringify(
            {
              questions: [
                {
                  question: "What is the first key concept?",
                  options: ["Concept 1", "Concept 2", "Concept 3", "Concept 4"],
                  correctAnswer: 0,
                },
                {
                  question: "Which of the following is true?",
                  options: ["Option A", "Option B", "Option C", "Option D"],
                  correctAnswer: 2,
                },
              ],
            },
            null,
            2,
          ),
          notes: `# ${subject} Notes\n\n## Key Concepts\n\n- Important concept 1\n- Important concept 2\n- Important concept 3\n\n## Summary\n\nThis is a summary of the key points covered in the class.`,
        }

        toast({
          title: "Class ended successfully",
          description: "Test and notes have been generated",
        })

        if (onCallEnded) {
          onCallEnded(result)
        }
      }, 2000)
    } catch (error) {
      console.error("Error ending call:", error)
      toast({
        title: "Error ending class",
        description: "Failed to process recording",
        variant: "destructive",
      })
      setIsCallEnding(false)
    }
  }

  const toggleMute = () => setIsMuted(!isMuted)
  const toggleVideo = () => setIsVideoOff(!isVideoOff)

  if (isConnecting) {
    return (
      <Card className="w-full h-[calc(100vh-12rem)] bg-slate-900 border-slate-800">
        <CardContent className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <p className="text-white">Connecting to video call...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full h-[calc(100vh-12rem)] bg-slate-900 border-slate-800 flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-white">{subject} Class</CardTitle>
            <CardDescription className="text-slate-400">Connected</CardDescription>
          </div>
          {(role === "teacher" || role === "admin") && (
            <Button variant="destructive" onClick={handleEndCall} disabled={isCallEnding}>
              {isCallEnding ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <PhoneOff className="h-4 w-4 mr-2" />
                  End Class
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow flex flex-col">
        <Tabs
          defaultValue="video"
          className="w-full h-full flex flex-col"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full bg-slate-800 rounded-none">
            <TabsTrigger value="video" className="flex-1 data-[state=active]:bg-slate-700">
              <Video className="h-4 w-4 mr-2" />
              Video
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex-1 data-[state=active]:bg-slate-700">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="participants" className="flex-1 data-[state=active]:bg-slate-700">
              <Users className="h-4 w-4 mr-2" />
              Participants
            </TabsTrigger>
          </TabsList>
          <TabsContent value="video" className="m-0 flex-grow">
            <div className="h-full bg-slate-950 flex flex-col items-center justify-center relative">
              {/* Main speaker */}
              <div className="w-full h-full max-h-[calc(100%-120px)] flex items-center justify-center p-4">
                <div className="relative w-full max-w-3xl aspect-video bg-slate-800 rounded-lg overflow-hidden">
                  <div className="absolute top-2 left-2 bg-slate-900/80 px-2 py-1 rounded text-xs text-white">
                    {participants[0].name} (Teacher)
                  </div>
                  <img
                    src="/placeholder.svg?height=720&width=1280"
                    alt="Video stream"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Participant thumbnails */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                {participants.slice(1).map((participant) => (
                  <div key={participant.id} className="relative w-32 h-24 bg-slate-800 rounded overflow-hidden">
                    <div className="absolute top-1 left-1 bg-slate-900/80 px-1 py-0.5 rounded text-xs text-white">
                      {participant.name}
                    </div>
                    <img
                      src="/placeholder.svg?height=240&width=320"
                      alt={`${participant.name}'s video`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="chat" className="m-0 flex-grow">
            <div className="h-full bg-slate-950 overflow-y-auto">
              <ChatPanel callId={callId} userId={userId} userName={userName} />
            </div>
          </TabsContent>
          <TabsContent value="participants" className="m-0 flex-grow">
            <div className="h-full bg-slate-950 overflow-y-auto p-4">
              <ul className="space-y-2">
                {participants.map((participant) => (
                  <li key={participant.id} className="flex items-center justify-between bg-slate-800 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                        {participant.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{participant.name}</p>
                        <p className="text-slate-400 text-sm">{participant.role}</p>
                      </div>
                    </div>
                    {participant.isSpeaking && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Speaking</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="bg-slate-800 p-2 flex justify-center">
        <div className="flex gap-2">
          <Button variant={isMuted ? "destructive" : "secondary"} size="icon" onClick={toggleMute}>
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button variant={isVideoOff ? "destructive" : "secondary"} size="icon" onClick={toggleVideo}>
            {isVideoOff ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Video, Users, Plus, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminSchedule() {
  const handleRedirect = () => {
    window.location.href = 'http://localhost:3001/react-rtc-demo'; // or any external/internal URL
  };
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false)
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    type: "class", // "class" or "meeting"
    description: "",
    date: new Date(),
    time: "10:00",
    duration: "60",
    participants: [],
  })
  const { toast } = useToast()

  // Mock data for schedule
  const schedule = [
    {
      id: 1,
      title: "Advanced Calculus",
      type: "class",
      description: "Regular class session",
      date: new Date(2025, 3, 8, 10, 0), // April 8, 2025, 10:00 AM
      time: "10:00 AM",
      duration: "60 minutes",
      participants: ["10th Grade Students"],
    },
    {
      id: 2,
      title: "Physics Mechanics",
      type: "class",
      description: "Regular class session",
      date: new Date(2025, 3, 9, 13, 30), // April 9, 2025, 1:30 PM
      time: "1:30 PM",
      duration: "60 minutes",
      participants: ["11th Grade Students"],
    },
    {
      id: 3,
      title: "Department Meeting",
      type: "meeting",
      description: "Weekly science department meeting",
      date: new Date(2025, 3, 8, 15, 0), // April 8, 2025, 3:00 PM
      time: "3:00 PM",
      duration: "45 minutes",
      participants: ["Dr. Smith", "Prof. Johnson", "Dr. Wilson", "Prof. Martinez"],
    },
    {
      id: 4,
      title: "Curriculum Planning",
      type: "meeting",
      description: "Planning session for next semester",
      date: new Date(2025, 3, 10, 14, 0), // April 10, 2025, 2:00 PM
      time: "2:00 PM",
      duration: "90 minutes",
      participants: ["Dr. Smith", "Prof. Johnson", "Principal Adams"],
    },
  ]

  // Mock data for teachers (for meeting participants)
  const teachers = [
    { id: 1, name: "Dr. Smith", subject: "Mathematics" },
    { id: 2, name: "Prof. Johnson", subject: "Physics" },
    { id: 3, name: "Dr. Wilson", subject: "Chemistry" },
    { id: 4, name: "Prof. Martinez", subject: "Biology" },
    { id: 5, name: "Ms. Davis", subject: "English" },
    { id: 6, name: "Mr. Thompson", subject: "History" },
    { id: 7, name: "Principal Adams", subject: "Administration" },
  ]

  // Filter schedule for the selected date
  const selectedDateSchedule = schedule.filter(
    (item) =>
      date &&
      item.date.getDate() === date.getDate() &&
      item.date.getMonth() === date.getMonth() &&
      item.date.getFullYear() === date.getFullYear(),
  )

  // Sort by time
  selectedDateSchedule.sort((a, b) => a.date.getTime() - b.date.getTime())

  // Function to highlight dates with scheduled items
  const isDayWithSchedule = (day: Date) => {
    return schedule.some(
      (item) =>
        item.date.getDate() === day.getDate() &&
        item.date.getMonth() === day.getMonth() &&
        item.date.getFullYear() === day.getFullYear(),
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewMeeting((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewMeeting((prev) => ({ ...prev, [name]: value }))
  }

  const handleParticipantChange = (selectedParticipants: string[]) => {
    setNewMeeting((prev) => ({ ...prev, participants: selectedParticipants }))
  }

  const handleCreateMeeting = async () => {
    try {
      setIsCreatingMeeting(true)
      // In a real app, this would send data to the API
      console.log("Creating meeting:", newMeeting)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Meeting scheduled successfully",
        description: `${newMeeting.title} has been added to your schedule`,
      })

      // Reset form
      setNewMeeting({
        title: "",
        type: "class",
        description: "",
        date: new Date(),
        time: "10:00",
        duration: "60",
        participants: [],
      })
    } catch (error) {
      toast({
        title: "Error scheduling meeting",
        description: "Failed to schedule meeting. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreatingMeeting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Schedule</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleRedirect} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle>Schedule New Meeting</DialogTitle>
              <DialogDescription className="text-slate-400">
                Fill in the details to schedule a new meeting or class.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-slate-300">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={newMeeting.title}
                  onChange={handleInputChange}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="e.g., Department Meeting"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type" className="text-slate-300">
                  Type
                </Label>
                <Select onValueChange={(value) => handleSelectChange("type", value)} value={newMeeting.type}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="class">Class</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-slate-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newMeeting.description}
                  onChange={handleInputChange}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="Describe the purpose of this meeting..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date" className="text-slate-300">
                    Date
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newMeeting.date.toISOString().split("T")[0]}
                    onChange={(e) => {
                      const date = new Date(e.target.value)
                      setNewMeeting((prev) => ({ ...prev, date }))
                    }}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time" className="text-slate-300">
                    Time
                  </Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={newMeeting.time}
                    onChange={handleInputChange}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration" className="text-slate-300">
                  Duration (minutes)
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={newMeeting.duration}
                  onChange={handleInputChange}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="e.g., 60"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="participants" className="text-slate-300">
                  Participants
                </Label>
                <Select onValueChange={(value) => handleParticipantChange([...newMeeting.participants, value])}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="Add participants" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.name}>
                        {teacher.name} ({teacher.subject})
                      </SelectItem>
                    ))}
                    {newMeeting.type === "class" && (
                      <>
                        <SelectItem value="9th Grade Students">9th Grade Students</SelectItem>
                        <SelectItem value="10th Grade Students">10th Grade Students</SelectItem>
                        <SelectItem value="11th Grade Students">11th Grade Students</SelectItem>
                        <SelectItem value="12th Grade Students">12th Grade Students</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newMeeting.participants.map((participant, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-blue-500/10 text-blue-400 border-blue-500/20 flex items-center gap-1"
                    >
                      {participant}
                      <button
                        className="ml-1 text-blue-400 hover:text-blue-300"
                        onClick={() => {
                          const newParticipants = [...newMeeting.participants]
                          newParticipants.splice(index, 1)
                          setNewMeeting((prev) => ({ ...prev, participants: newParticipants }))
                        }}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="text-white border-slate-700">
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleCreateMeeting}
                disabled={isCreatingMeeting}
              >
                {isCreatingMeeting ? "Scheduling..." : "Schedule"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border-slate-800 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-white">Calendar</CardTitle>
            <CardDescription className="text-slate-400">Select a date to view your schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-slate-800"
              modifiers={{
                hasSchedule: (date) => isDayWithSchedule(date),
              }}
              modifiersStyles={{
                hasSchedule: {
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderRadius: "50%",
                  color: "#3b82f6",
                  fontWeight: "bold",
                },
              }}
            />
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">
              {date ? (
                <>
                  Schedule for{" "}
                  {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </>
              ) : (
                <>Select a Date</>
              )}
            </CardTitle>
            <CardDescription className="text-slate-400">{selectedDateSchedule.length} items scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-slate-800 border-slate-700 w-full">
                <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-slate-700">
                  All
                </TabsTrigger>
                <TabsTrigger value="classes" className="flex-1 data-[state=active]:bg-slate-700">
                  Classes
                </TabsTrigger>
                <TabsTrigger value="meetings" className="flex-1 data-[state=active]:bg-slate-700">
                  Meetings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4 space-y-4">
                {selectedDateSchedule.length > 0 ? (
                  selectedDateSchedule.map((item) => <ScheduleItem key={item.id} item={item} />)
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Calendar className="h-12 w-12 text-slate-400 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No Schedule Items</h3>
                    <p className="text-slate-400 max-w-md">
                      {date
                        ? `There are no items scheduled for ${date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.`
                        : "Select a date to view your schedule."}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="classes" className="mt-4 space-y-4">
                {selectedDateSchedule.filter((item) => item.type === "class").length > 0 ? (
                  selectedDateSchedule
                    .filter((item) => item.type === "class")
                    .map((item) => <ScheduleItem key={item.id} item={item} />)
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <BookOpen className="h-12 w-12 text-slate-400 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No Classes</h3>
                    <p className="text-slate-400 max-w-md">
                      {date
                        ? `There are no classes scheduled for ${date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.`
                        : "Select a date to view your classes."}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="meetings" className="mt-4 space-y-4">
                {selectedDateSchedule.filter((item) => item.type === "meeting").length > 0 ? (
                  selectedDateSchedule
                    .filter((item) => item.type === "meeting")
                    .map((item) => <ScheduleItem key={item.id} item={item} />)
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Users className="h-12 w-12 text-slate-400 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No Meetings</h3>
                    <p className="text-slate-400 max-w-md">
                      {date
                        ? `There are no meetings scheduled for ${date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.`
                        : "Select a date to view your meetings."}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ScheduleItem({ item }: { item: any }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${item.type === "class" ? "bg-blue-500/20" : "bg-purple-500/20"}`}>
          {item.type === "class" ? (
            <BookOpen className={`h-5 w-5 ${item.type === "class" ? "text-blue-400" : "text-purple-400"}`} />
          ) : (
            <Users className={`h-5 w-5 ${item.type === "class" ? "text-blue-400" : "text-purple-400"}`} />
          )}
        </div>
        <div>
          <h3 className="font-medium text-white">{item.title}</h3>
          <p className="text-sm text-slate-400">{item.description}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Badge
          variant="outline"
          className={`${
            item.type === "class"
              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
              : "bg-purple-500/10 text-purple-400 border-purple-500/20"
          }`}
        >
          <Clock className="h-3 w-3 mr-1" />
          {item.time} • {item.duration}
        </Badge>
        <Button
          size="sm"
          className={`${item.type === "class" ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"}`}
        >
          <Video className="h-4 w-4 mr-2" />
          {item.type === "class" ? "Start Class" : "Join Meeting"}
        </Button>
      </div>
    </div>
  )
}


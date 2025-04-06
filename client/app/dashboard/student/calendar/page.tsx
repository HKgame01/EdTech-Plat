"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { BookOpen, Clock, Video } from "lucide-react"

export default function StudentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const handleRedirect = () => {
    window.location.href = 'http://localhost:3001/react-rtc-demo'; // or any external/internal URL
  };

  // Mock data for classes
  const classes = [
    {
      id: 1,
      subject: "Mathematics",
      topic: "Calculus: Derivatives",
      teacher: "Dr. Smith",
      time: "10:00 AM - 11:00 AM",
      date: new Date(2025, 3, 5), // April 5, 2025
    },
    {
      id: 2,
      subject: "Physics",
      topic: "Newton's Laws of Motion",
      teacher: "Prof. Johnson",
      time: "1:30 PM - 2:30 PM",
      date: new Date(2025, 3, 5), // April 5, 2025
    },
    {
      id: 3,
      subject: "Chemistry",
      topic: "Chemical Reactions",
      teacher: "Dr. Wilson",
      time: "11:15 AM - 12:15 PM",
      date: new Date(2025, 3, 6), // April 6, 2025
    },
    {
      id: 4,
      subject: "Biology",
      topic: "Cell Structure",
      teacher: "Prof. Martinez",
      time: "3:00 PM - 4:00 PM",
      date: new Date(2025, 3, 7), // April 7, 2025
    },
  ]

  // Filter classes for the selected date
  const selectedDateClasses = classes.filter(
    (cls) =>
      date &&
      cls.date.getDate() === date.getDate() &&
      cls.date.getMonth() === date.getMonth() &&
      cls.date.getFullYear() === date.getFullYear(),
  )

  // Function to highlight dates with classes
  const isDayWithClass = (day: Date) => {
    return classes.some(
      (cls) =>
        cls.date.getDate() === day.getDate() &&
        cls.date.getMonth() === day.getMonth() &&
        cls.date.getFullYear() === day.getFullYear(),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Class Calendar</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border-slate-800 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-white">Calendar</CardTitle>
            <CardDescription className="text-slate-400">Select a date to view scheduled classes</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-slate-800"
              modifiers={{
                hasClass: (date) => isDayWithClass(date),
              }}
              modifiersStyles={{
                hasClass: {
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
                  Classes for{" "}
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
            <CardDescription className="text-slate-400">{selectedDateClasses.length} classes scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateClasses.length > 0 ? (
              <div className="space-y-4">
                {selectedDateClasses.map((cls) => (
                  <div key={cls.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500/20 p-3 rounded-full">
                        <BookOpen className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{cls.subject}</h3>
                        <p className="text-sm text-slate-400">
                          {cls.topic} • {cls.teacher}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                        <Clock className="h-3 w-3 mr-1" />
                        {cls.time}
                      </Badge>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Video className="h-4 w-4 mr-2" />
                        Join Class
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <BookOpen className="h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No Classes Scheduled</h3>
                <p className="text-slate-400 max-w-md">
                  {date
                    ? `There are no classes scheduled for ${date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.`
                    : "Select a date to view scheduled classes."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


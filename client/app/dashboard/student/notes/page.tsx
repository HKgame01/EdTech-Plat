"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Lock, Unlock, Search, Clock } from "lucide-react"

export default function StudentNotes() {
  const handleRedirect = () => {
    window.location.href = "/notes"
  }
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for notes
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Calculus: Derivatives",
      subject: "Mathematics",
      date: "Apr 2, 2023",
      content: "Notes from the lecture on derivatives, including the power rule, product rule, and chain rule...",
      locked: false,
    },
    {
      id: 2,
      title: "Newton's Laws of Motion",
      subject: "Physics",
      date: "Apr 3, 2023",
      content: "First Law: An object at rest stays at rest, and an object in motion stays in motion...",
      locked: true,
      unlockTime: "30 minutes after class",
    },
    {
      id: 3,
      title: "Chemical Reactions",
      subject: "Chemistry",
      date: "Mar 28, 2023",
      content: "Types of reactions: synthesis, decomposition, single replacement, double replacement...",
      locked: false,
    },
    {
      id: 4,
      title: "Cell Biology",
      subject: "Biology",
      date: "Mar 25, 2023",
      content: "Cell structure: membrane, cytoplasm, nucleus, mitochondria, ribosomes...",
      locked: false,
    },
  ])

  // Filter notes based on search query
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Lecture Notes</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search notes..."
          className="pl-10 bg-slate-800 border-slate-700 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white">{note.title}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {note.subject} • {note.date}
                  </CardDescription>
                </div>
                {note.locked ? (
                  <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                    <Lock className="h-3 w-3 mr-1" />
                    Locked
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                    <Unlock className="h-3 w-3 mr-1" />
                    Unlocked
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {note.locked ? (
                <div className="bg-slate-800 p-4 rounded-lg text-center">
                  <Lock className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-slate-400">These notes are currently locked.</p>
                  <div className="flex items-center justify-center gap-2 mt-2 text-sm text-slate-500">
                    <Clock className="h-4 w-4" />
                    <span>Unlocks: {note.unlockTime}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="text-slate-300 line-clamp-3">{note.content}</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleRedirect} className="w-full" variant={note.locked ? "outline" : "default"} disabled={note.locked}>
                <FileText className="h-4 w-4 mr-2" />
                {note.locked ? "Locked" : "View Full Notes"}
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredNotes.length === 0 && (
          <div className="col-span-full">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No Notes Found</h3>
                <p className="text-slate-400 text-center max-w-md">
                  {searchQuery
                    ? `No notes matching "${searchQuery}" were found. Try a different search term.`
                    : "You don't have any notes yet. Notes will appear here after your classes."}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}


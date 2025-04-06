"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function NotesPage() {
  const [content, setContent] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)

  const generateNotes = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/generateNotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
      const data = await res.json()
      setNotes(data.notes || "No notes generated.")
    } catch (err) {
      setNotes("An error occurred while generating notes.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-800 p-6 flex justify-center items-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-xl">Gemini-Powered Notes Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste transcript or notes here..."
            className="h-40"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={generateNotes} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700">
            {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
            Generate Notes
          </Button>
          {notes && (
            <div className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap">
              {notes}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

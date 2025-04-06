"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: {
    id: string
    name: string
  }
  timestamp: Date
}

interface ChatPanelProps {
  callId: string
  userId: string
  userName: string
}

export function ChatPanel({ callId, userId, userName }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to the class! Feel free to ask questions here.",
      sender: { id: "teacher-1", name: "Mr. Johnson" },
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      text: "Can you explain the concept again?",
      sender: { id: "student-1", name: "Alice Smith" },
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: "3",
      text: "Sure, let me go through it one more time.",
      sender: { id: "teacher-1", name: "Mr. Johnson" },
      timestamp: new Date(Date.now() - 60000),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: { id: userId, name: userName },
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate teacher response after a delay
    if (userId !== "teacher-1" && Math.random() > 0.5) {
      setTimeout(
        () => {
          const responses = [
            "Good question! Let me explain that further.",
            "That's an interesting point.",
            "Does anyone else have thoughts on this?",
            "Let's discuss this in more detail.",
          ]

          const teacherResponse: Message = {
            id: Date.now().toString(),
            text: responses[Math.floor(Math.random() * responses.length)],
            sender: { id: "teacher-1", name: "Mr. Johnson" },
            timestamp: new Date(),
          }

          setMessages((prev) => [...prev, teacherResponse])
        },
        3000 + Math.random() * 2000,
      )
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender.id === userId ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender.id === userId ? "bg-blue-600 text-white" : "bg-slate-700 text-white"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-sm">
                  {message.sender.id === userId ? "You" : message.sender.name}
                </span>
                <span className="text-xs opacity-70 ml-2">{formatTime(message.timestamp)}</span>
              </div>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t border-slate-700 p-4 flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="bg-slate-800 border-slate-700 text-white"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}


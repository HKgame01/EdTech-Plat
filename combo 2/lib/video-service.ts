import { createClassSession } from "@/lib/stream"

// Mock data for upcoming classes
const mockUpcomingClasses = [
  {
    id: "class-1",
    callId: "class-mathematics-101",
    subject: "Mathematics",
    description: "Algebra fundamentals and quadratic equations",
    teacher: "Dr. Ramesh Kumar",
    date: "2025-04-10",
    time: "10:00 AM",
    duration: "60 minutes",
    participants: 15,
  },
  {
    id: "class-2",
    callId: "class-physics-101",
    subject: "Physics",
    description: "Newton's laws of motion",
    teacher: "Prof. Sanjay Joshi",
    date: "2025-04-11",
    time: "11:30 AM",
    duration: "90 minutes",
    participants: 12,
  },
  {
    id: "class-3",
    callId: "class-chemistry-101",
    subject: "Chemistry",
    description: "Introduction to organic chemistry",
    teacher: "Dr. Anjali Desai",
    date: "2025-04-12",
    time: "09:00 AM",
    duration: "60 minutes",
    participants: 18,
  },
]

// Mock data for active classes
const mockActiveClasses = [
  {
    id: "active-1",
    callId: "class-biology-101",
    subject: "Biology",
    description: "Cell structure and function",
    teacher: "Dr. Priya Sharma",
    date: "2025-04-05",
    time: "Now",
    duration: "60 minutes",
    participants: 20,
    status: "active",
  },
]

// Get upcoming classes for a user
export async function getUpcomingClasses(userId: string): Promise<any[]> {
  // In a real app, this would fetch from an API
  // For demo purposes, we'll return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUpcomingClasses)
    }, 1000)
  })
}

// Get active classes for a user
export async function getActiveClasses(userId: string): Promise<any[]> {
  // In a real app, this would fetch from an API
  // For demo purposes, we'll return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockActiveClasses)
    }, 1000)
  })
}

// Create a new class session
export async function createClass(
  teacherId: string,
  subject: string,
  description: string,
  date: string,
  time: string,
  duration: string,
): Promise<any> {
  // In a real app, this would call your backend API
  // For demo purposes, we'll just add to our mock data
  const newClass = {
    id: `class-${Date.now()}`,
    callId: `class-${subject.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
    subject,
    description,
    teacher: "You", // In a real app, this would be the teacher's name
    date,
    time,
    duration,
    participants: 0,
  }

  mockUpcomingClasses.push(newClass)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newClass)
    }, 1000)
  })
}

// Join a class as a student
export async function joinClass(userId: string, classId: string): Promise<any> {
  // In a real app, this would call your backend API
  // For demo purposes, we'll just return the class
  const classToJoin = [...mockActiveClasses, ...mockUpcomingClasses].find((c) => c.id === classId)

  if (!classToJoin) {
    throw new Error("Class not found")
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(classToJoin)
    }, 1000)
  })
}

export { createClassSession }


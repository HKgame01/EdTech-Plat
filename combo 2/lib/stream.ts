// Mock implementation since we don't have a valid Stream API key
import { EventEmitter } from "events"

// Mock data for video calls
const mockCalls = [
  {
    id: "class-mathematics-101",
    subject: "Mathematics",
    description: "Introduction to Algebra",
    teacherId: "teacher-1",
    startTime: new Date(Date.now() + 3600000).toISOString(),
    duration: 60,
  },
  {
    id: "class-science-101",
    subject: "Science",
    description: "Introduction to Physics",
    teacherId: "teacher-2",
    startTime: new Date(Date.now() + 7200000).toISOString(),
    duration: 60,
  },
]

// Mock video client
class MockVideoClient extends EventEmitter {
  connectUser(user: any, token: string) {
    console.log("Mock: Connected user", user)
    return Promise.resolve()
  }

  call(type: string, id: string) {
    return new MockCall(id)
  }

  disconnectUser() {
    console.log("Mock: Disconnected user")
    return Promise.resolve()
  }
}

// Mock call
class MockCall extends EventEmitter {
  id: string
  state: any

  constructor(id: string) {
    super()
    this.id = id
    this.state = {
      callingState: "JOINED",
      participants: [
        { userId: "teacher-1", name: "Mr. Johnson", role: "teacher" },
        { userId: "student-1", name: "Alice Smith", role: "student" },
        { userId: "student-2", name: "Bob Jones", role: "student" },
      ],
    }
  }

  getOrCreate(options: any) {
    console.log("Mock: Created call", this.id)
    return Promise.resolve(this)
  }

  join(options: any) {
    console.log("Mock: Joined call", this.id)
    return Promise.resolve(this)
  }

  leave() {
    console.log("Mock: Left call", this.id)
    return Promise.resolve()
  }

  queryRecordings() {
    return Promise.resolve([{ url: "https://example.com/recording.mp4" }])
  }
}

// Mock chat client
class MockChatClient extends EventEmitter {
  constructor() {
    super()
  }

  connectUser(user: any, token: string) {
    console.log("Mock: Connected chat user", user)
    return Promise.resolve(this)
  }

  disconnectUser() {
    console.log("Mock: Disconnected chat user")
    return Promise.resolve()
  }

  channel(type: string, id: string) {
    return {
      watch: () => Promise.resolve(),
      sendMessage: (message: any) => Promise.resolve({ message }),
    }
  }

  devToken(userId: string) {
    return `mock-token-${userId}`
  }
}

// Initialize mock clients
export const chatClient = new MockChatClient()
export const videoClient = new MockVideoClient()

// Function to generate user token
export const generateToken = (userId: string) => {
  return `mock-token-${userId}`
}

// Connect user to Stream
export const connectUser = async (userId: string, userName: string, role: string) => {
  try {
    const token = generateToken(userId)

    // Connect to chat (mock)
    await chatClient.connectUser(
      {
        id: userId,
        name: userName,
        role: role,
      },
      token,
    )

    // Connect to video (mock)
    await videoClient.connectUser(
      {
        id: userId,
        name: userName,
        role: role,
      },
      token,
    )

    return { chatClient, videoClient }
  } catch (error) {
    console.error("Error connecting to Stream:", error)
    throw error
  }
}

// Create a class session
export const createClassSession = async (teacherId: string, className: string, description: string) => {
  try {
    const callId = `class-${className.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`

    const call = videoClient.call("default", callId)
    await call.getOrCreate({
      data: {
        custom: {
          className,
          description,
          teacherId,
          type: "class",
        },
      },
    })

    // Add to mock calls
    mockCalls.push({
      id: callId,
      subject: className,
      description,
      teacherId,
      startTime: new Date().toISOString(),
      duration: 60,
    })

    return call
  } catch (error) {
    console.error("Error creating class session:", error)
    throw error
  }
}

// Get all available calls
export const getAvailableCalls = async () => {
  return mockCalls
}

// Process recording to generate transcript
export const processRecording = async (recordingUrl: string) => {
  try {
    // This is a simplified version
    console.log("Processing recording:", recordingUrl)
    return "This is a simulated transcript from the class recording."
  } catch (error) {
    console.error("Error processing recording:", error)
    throw error
  }
}

// Generate test and notes from transcript
export const generateTestAndNotes = async (transcript: string, subject: string) => {
  try {
    // Simulate AI-generated content
    const notes = `# ${subject} Notes\n\n## Key Concepts\n\n- Important concept 1\n- Important concept 2\n- Important concept 3\n\n## Summary\n\nThis is a summary of the key points covered in the class.`

    const test = JSON.stringify(
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
    )

    return { notes, test }
  } catch (error) {
    console.error("Error generating test and notes:", error)
    return {
      notes: "Error generating notes. Please try again later.",
      test: "Error generating test. Please try again later.",
    }
  }
}

// End a class session and process recording
export const endClassAndProcess = async (call: any, subject: string) => {
  try {
    // End the call
    await call.leave()

    // Simulate processing
    const transcript = "This is a simulated transcript from the class recording."
    const { test, notes } = await generateTestAndNotes(transcript, subject)

    return { transcript, test, notes }
  } catch (error) {
    console.error("Error ending class and processing:", error)
    return {
      transcript: "Error processing recording.",
      test: "Error generating test.",
      notes: "Error generating notes.",
    }
  }
}


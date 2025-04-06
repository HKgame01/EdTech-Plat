"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FileText, Save, Plus, Trash2, ArrowLeft, Check, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { OpenAI } from "openai"

// Initialize OpenAI client (in a real app, this would use environment variables)
const openai = new OpenAI({
  apiKey: "sk-placeholder", // Replace with actual API key in production
  dangerouslyAllowBrowser: true, // Only for demo purposes
})

export default function EditTest({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [test, setTest] = useState<any>({
    id: params.id,
    title: "",
    subject: "",
    description: "",
    duration: 60,
    questions: [],
    status: "pending",
  })

  // Fetch test data
  useEffect(() => {
    const fetchTest = async () => {
      try {
        setIsLoading(true)
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock test data
        const mockTest = {
          id: params.id,
          title: "Calculus: Derivatives",
          subject: "Mathematics",
          description:
            "Test covering basic concepts of derivatives, including the power rule, product rule, and chain rule.",
          duration: 60,
          status: "pending",
          questions: [
            {
              id: 1,
              question: "What is the derivative of f(x) = x��?",
              options: ["f'(x) = x", "f'(x) = 2x", "f'(x) = 2", "f'(x) = x²"],
              correct_answer: "f'(x) = 2x",
              explanation: "The derivative of x^n is n*x^(n-1). For x², n=2, so the derivative is 2*x^(2-1) = 2x.",
            },
            {
              id: 2,
              question: "Which of the following is the product rule for derivatives?",
              options: ["(fg)' = f'g'", "(fg)' = f'g + fg'", "(fg)' = f'g - fg'", "(fg)' = f'g * fg'"],
              correct_answer: "(fg)' = f'g + fg'",
              explanation:
                "The product rule states that the derivative of a product of functions is the first function times the derivative of the second, plus the second function times the derivative of the first.",
            },
            {
              id: 3,
              question: "What is the derivative of sin(x)?",
              options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
              correct_answer: "cos(x)",
              explanation: "The derivative of sin(x) is cos(x).",
            },
            {
              id: 4,
              question: "If f(x) = e^x, then f'(x) = ?",
              options: ["e^x", "x*e^(x-1)", "e^x * ln(e)", "1/x"],
              correct_answer: "e^x",
              explanation: "The derivative of e^x is e^x.",
            },
            {
              id: 5,
              question: "What is the chain rule used for?",
              options: [
                "Finding derivatives of products of functions",
                "Finding derivatives of quotients of functions",
                "Finding derivatives of composite functions",
                "Finding derivatives of inverse functions",
              ],
              correct_answer: "Finding derivatives of composite functions",
              explanation:
                "The chain rule is used to find the derivative of a composite function, which is a function of a function.",
            },
          ],
        }

        setTest(mockTest)
      } catch (error) {
        console.error("Error fetching test:", error)
        toast({
          title: "Error",
          description: "Failed to load test data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTest()
  }, [params.id, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTest((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setTest((prev) => ({ ...prev, [name]: value }))
  }

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updatedQuestions = [...test.questions]
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    setTest((prev) => ({ ...prev, questions: updatedQuestions }))
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...test.questions]
    const options = [...updatedQuestions[questionIndex].options]
    options[optionIndex] = value
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], options }
    setTest((prev) => ({ ...prev, questions: updatedQuestions }))
  }

  const handleCorrectAnswerChange = (questionIndex: number, value: string) => {
    const updatedQuestions = [...test.questions]
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], correct_answer: value }
    setTest((prev) => ({ ...prev, questions: updatedQuestions }))
  }

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question: "",
      options: ["", "", "", ""],
      correct_answer: "",
      explanation: "",
    }
    setTest((prev) => ({ ...prev, questions: [...prev.questions, newQuestion] }))
  }

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...test.questions]
    updatedQuestions.splice(index, 1)
    setTest((prev) => ({ ...prev, questions: updatedQuestions }))
  }

  const generateNewQuestion = async (subject: string) => {
    try {
      setIsGenerating(true)

      const prompt = `Create a multiple-choice question about ${subject} with 4 options and an explanation for the correct answer. Format as JSON with fields: question, options (array of 4 strings), correct_answer (one of the options), and explanation.`

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an educational assistant that creates test questions." },
          { role: "user", content: prompt },
        ],
      })

      const generatedText = response.choices[0]?.message.content || ""

      try {
        const newQuestion = JSON.parse(generatedText)

        // Validate the generated question
        if (
          newQuestion.question &&
          Array.isArray(newQuestion.options) &&
          newQuestion.options.length === 4 &&
          newQuestion.correct_answer &&
          newQuestion.explanation
        ) {
          // Add the new question
          const questionWithId = {
            ...newQuestion,
            id: Date.now(),
          }

          setTest((prev) => ({
            ...prev,
            questions: [...prev.questions, questionWithId],
          }))

          toast({
            title: "Question generated",
            description: "New question has been added to the test",
          })
        } else {
          throw new Error("Invalid question format")
        }
      } catch (parseError) {
        console.error("Error parsing generated question:", parseError)

        // Fallback to a template question
        const fallbackQuestion = {
          id: Date.now(),
          question: "New question about " + subject,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correct_answer: "Option A",
          explanation: "Explanation for the correct answer",
        }

        setTest((prev) => ({
          ...prev,
          questions: [...prev.questions, fallbackQuestion],
        }))

        toast({
          title: "Question template added",
          description: "Please edit the new question",
        })
      }
    } catch (error) {
      console.error("Error generating question:", error)
      toast({
        title: "Error",
        description: "Failed to generate new question",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const saveTest = async () => {
    try {
      setIsSaving(true)
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Test saved",
        description: "Your changes have been saved successfully",
      })
    } catch (error) {
      console.error("Error saving test:", error)
      toast({
        title: "Error",
        description: "Failed to save test",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const publishTest = async () => {
    try {
      setIsSaving(true)
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setTest((prev) => ({ ...prev, status: "published" }))

      toast({
        title: "Test published",
        description: "The test is now available to students",
      })

      // Navigate back to tests page
      router.push("/dashboard/admin/tests")
    } catch (error) {
      console.error("Error publishing test:", error)
      toast({
        title: "Error",
        description: "Failed to publish test",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <FileText className="h-12 w-12 text-blue-500 animate-pulse" />
          <p className="text-white">Loading test...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="text-white border-slate-700"
            onClick={() => router.push("/dashboard/admin/tests")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-white">Edit Test</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-white border-slate-700" onClick={saveTest} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Check className="h-4 w-4 mr-2" />
                Publish Test
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-slate-900 border-slate-800 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Publish Test</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400">
                  Are you sure you want to publish this test? Once published, it will be available to students.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-white border-slate-700">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-green-600 hover:bg-green-700"
                  onClick={publishTest}
                  disabled={isSaving}
                >
                  {isSaving ? "Publishing..." : "Publish"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Test Details</CardTitle>
          <CardDescription className="text-slate-400">Basic information about the test</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-300">
                Test Title
              </Label>
              <Input
                id="title"
                name="title"
                value={test.title}
                onChange={handleInputChange}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-slate-300">
                Subject
              </Label>
              <Select value={test.subject} onValueChange={(value) => handleSelectChange("subject", value)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={test.description}
              onChange={handleInputChange}
              className="bg-slate-800 border-slate-700 text-white"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-slate-300">
              Duration (minutes)
            </Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              value={test.duration}
              onChange={handleInputChange}
              className="bg-slate-800 border-slate-700 text-white w-full md:w-1/4"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Questions ({test.questions.length})</h2>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-white border-slate-700" disabled={isGenerating}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
                Generate Question
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-white">
              <DialogHeader>
                <DialogTitle>Generate New Question</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Generate a new question using AI based on the subject.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="gen-subject" className="text-slate-300">
                  Question Topic
                </Label>
                <Input
                  id="gen-subject"
                  placeholder="e.g., Derivatives in Calculus"
                  className="bg-slate-800 border-slate-700 text-white mt-2"
                  defaultValue={test.subject}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" className="text-white border-slate-700">
                  Cancel
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    const subjectInput = document.getElementById("gen-subject") as HTMLInputElement
                    generateNewQuestion(subjectInput.value || test.subject)
                  }}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={addQuestion}>
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {test.questions.map((question: any, index: number) => (
          <Card key={question.id} className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-white">Question {index + 1}</CardTitle>
                <CardDescription className="text-slate-400">Multiple choice question</CardDescription>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-slate-900 border-slate-800 text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Question</AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-400">
                      Are you sure you want to delete this question? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-white border-slate-700">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => removeQuestion(index)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`question-${index}`} className="text-slate-300">
                  Question Text
                </Label>
                <Textarea
                  id={`question-${index}`}
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Options</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {question.options.map((option: string, optionIndex: number) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <Badge className="bg-slate-800 text-slate-300 hover:bg-slate-800">
                        {String.fromCharCode(65 + optionIndex)}
                      </Badge>
                      <Input
                        value={option}
                        onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white flex-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`correct-${index}`} className="text-slate-300">
                  Correct Answer
                </Label>
                <Select
                  value={question.correct_answer}
                  onValueChange={(value) => handleCorrectAnswerChange(index, value)}
                >
                  <SelectTrigger id={`correct-${index}`} className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="Select correct answer" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    {question.options.map((option: string, optionIndex: number) => (
                      <SelectItem key={optionIndex} value={option}>
                        {String.fromCharCode(65 + optionIndex)}: {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`explanation-${index}`} className="text-slate-300">
                  Explanation
                </Label>
                <Textarea
                  id={`explanation-${index}`}
                  value={question.explanation}
                  onChange={(e) => handleQuestionChange(index, "explanation", e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        {test.questions.length === 0 && (
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No Questions Yet</h3>
              <p className="text-slate-400 text-center max-w-md mb-4">
                Add questions to your test using the buttons above.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="text-white border-slate-700"
                  onClick={() => generateNewQuestion(test.subject)}
                  disabled={isGenerating}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
                  Generate Question
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={addQuestion}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          className="text-white border-slate-700"
          onClick={() => router.push("/dashboard/admin/tests")}
        >
          Cancel
        </Button>
        <Button variant="outline" className="text-white border-slate-700" onClick={saveTest} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button className="bg-green-600 hover:bg-green-700" onClick={publishTest} disabled={isSaving}>
          <Check className="h-4 w-4 mr-2" />
          Publish Test
        </Button>
      </div>
    </div>
  )
}


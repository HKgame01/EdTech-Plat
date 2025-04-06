"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"

type Question = {
  question: string
  options: string[]
  correctAnswer: string
}

export default function TestPage() {
  const [inputText, setInputText] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchTest = async () => {
    setLoading(true)
    const res = await fetch("/api/generateTest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: inputText }),
    })
    const data = await res.json()
    setQuestions(data.questions)
    setSelectedAnswers(Array(data.questions.length).fill(""))
    setCurrentQuestion(0)
    setShowResults(false)
    setLoading(false)
  }

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = value
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    return questions.reduce((score, q, index) => (
      selectedAnswers[index] === q.correctAnswer ? score + 1 : score
    ), 0)
  }

  const resetTest = () => {
    setShowResults(false)
    setQuestions([])
    setSelectedAnswers([])
    setInputText("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 p-6 text-white flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Gemini-Powered Test Generator</h1>

        {!questions.length ? (
          <Card>
            <CardHeader>
              <CardTitle>Enter Topic or Content</CardTitle>
              <CardDescription className="text-muted">Gemini will create a test based on your input.</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste lesson content or topic here..."
                className="w-full h-40 p-2 rounded-lg text-black"
              />
            </CardContent>
            <CardFooter>
              <Button onClick={fetchTest} className="w-full bg-white text-black hover:bg-gray-200" disabled={loading}>
                {loading ? "Generating..." : "Generate Test"}
              </Button>
            </CardFooter>
          </Card>
        ) : !showResults ? (
          <Card className="mt-6">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>
                  Question {currentQuestion + 1} of {questions.length}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {Math.round((currentQuestion / questions.length) * 100)}% done
                </span>
              </div>
              <Progress value={(currentQuestion / questions.length) * 100} className="h-2 mt-2" />
              <CardDescription className="mt-4 text-lg text-white">{questions[currentQuestion].question}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedAnswers[currentQuestion]} onValueChange={handleAnswerSelect} className="space-y-3">
                {questions[currentQuestion].options.map((option, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-colors ${
                      selectedAnswers[currentQuestion] === option ? "bg-blue-100 text-black border-blue-500" : ""
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <RadioGroupItem value={option} id={`option-${idx}`} className="text-blue-600" />
                    <Label htmlFor={`option-${idx}`} className="flex-grow cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={handlePrevious} disabled={currentQuestion === 0} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!selectedAnswers[currentQuestion]}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-2xl">Results</CardTitle>
              <CardDescription>
                You scored {calculateScore()} out of {questions.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {questions.map((q, i) => (
                <div key={i} className="border rounded-lg p-4 mb-2">
                  <p className="font-medium">{i + 1}. {q.question}</p>
                  <p className="mt-2">
                    Your answer:{" "}
                    <span className={selectedAnswers[i] === q.correctAnswer ? "text-green-400" : "text-red-400"}>
                      {selectedAnswers[i] || "Not answered"}
                    </span>
                  </p>
                  {selectedAnswers[i] !== q.correctAnswer && (
                    <p className="text-green-300">Correct answer: {q.correctAnswer}</p>
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={resetTest} className="w-full bg-blue-600 hover:bg-blue-700">
                Generate New Test
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

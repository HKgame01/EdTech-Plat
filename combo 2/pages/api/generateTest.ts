// pages/api/generateTest.ts
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" })

  const { content } = req.body
  const prompt = `
Generate 5 multiple-choice questions based on the content below.
Each question must have:
- a "question" field
- an "options" array (length 4)
- a "correctAnswer" field

Respond in JSON format only.

Content: """${content}"""
`

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBkGyVajvZctdMiM9ofMKJ4Mj8RitOViio`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    })
  })

  const data = await response.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text

  try {
    const questions = JSON.parse(text)
    return res.status(200).json({ questions })
  } catch (err) {
    console.error("Parsing error:", err)
    return res.status(500).json({ message: "Failed to parse Gemini response", raw: text })
  }
}

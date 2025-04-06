import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" })

  const { content } = req.body
  const prompt = `
You are a helpful assistant. Generate **well-structured notes** from the following content. 
Use bullet points, headings, and subheadings where appropriate.

Text:
"""${content}"""
`

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBkGyVajvZctdMiM9ofMKJ4Mj8RitOViio`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  })

  const data = await response.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    return res.status(500).json({ message: "No notes generated" })
  }

  return res.status(200).json({ notes: text })
}

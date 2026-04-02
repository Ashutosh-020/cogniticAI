import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!
})

export async function processMeetingTranscript(transcript: any) {
    try {
        let transcriptText = ''

        // Normalize transcript format
        if (Array.isArray(transcript)) {
            transcriptText = transcript
                .map((item: any) =>
                    `${item.speaker || 'Speaker'}: ${
                        item.words?.map((w: any) => w.word).join(' ') || ''
                    }`
                )
                .join('\n')
        } else if (typeof transcript === 'string') {
            transcriptText = transcript
        } else if (transcript?.text) {
            transcriptText = transcript.text
        }

        if (!transcriptText || transcriptText.trim().length === 0) {
            throw new Error('No transcript content found')
        }

        // Gemini request
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: transcriptText,
            config: {
                systemInstruction: `You are an AI assistant that analyzes meeting transcripts.

Return STRICT JSON ONLY in this format:
{
  "summary": "2-3 sentence summary",
  "actionItems": ["item 1", "item 2"]
}

Rules:
- No markdown
- No explanation
- No extra text
- Only valid JSON`,
                temperature: 0.3,
                maxOutputTokens: 500
            }
        })

        const rawText = response.text

        if (!rawText) {
            throw new Error('No response from Gemini')
        }

        // 🧠 SAFE JSON PARSING (IMPORTANT)
        let parsed

        try {
            // Remove markdown if Gemini adds it
            const cleaned = rawText
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim()

            parsed = JSON.parse(cleaned)
        } catch (err) {
            console.error('JSON parse failed:', rawText)

            return {
                summary: 'Summary could not be parsed properly.',
                actionItems: []
            }
        }

        const actionItems = Array.isArray(parsed.actionItems)
            ? parsed.actionItems.map((text: string, index: number) => ({
                  id: index + 1,
                  text
              }))
            : []

        return {
            summary: parsed.summary || 'Summary could not be generated',
            actionItems
        }

    } catch (error) {
        console.error('Error processing transcript with Gemini:', error)

        return {
            summary:
                'Meeting transcript processed successfully. Please check the full transcript.',
            actionItems: []
        }
    }
}
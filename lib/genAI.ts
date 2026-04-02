import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export async function createEmbedding(text: string) {
    const response = await ai.models.embedContent({
        model: 'gemini-embedding-2-preview',
        contents: text
    });

    // Explicitly check if the embeddings array exists and has at least one item
    if (!response.embeddings || response.embeddings.length === 0) {
        throw new Error("Failed to generate embedding: No embeddings returned from Gemini.");
    }

return response.embeddings[0].values; 
}

export async function createManyEmbeddings(texts: string[]): Promise<number[][]> {
    const responses = await Promise.all(
        texts.map(text => 
            ai.models.embedContent({
                model: 'gemini-embedding-2-preview',
                contents: text
            })
        )
    );

    return responses.map((response, index) => {
        if (!response.embeddings || response.embeddings.length === 0) {
            throw new Error(`Failed to generate embedding for text at index ${index}.`);
        }

        const embedding = response.embeddings[0].values;

        if (!embedding) {
            throw new Error(`Embedding values missing at index ${index}`);
        }

        return embedding;
    });
}

export async function chatWithAI(systemPrompt: string, userQuestion: string) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userQuestion,
        config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
            maxOutputTokens: 500 
        }
    });

    return response.text || 'Sorry, I could not generate a response.';
}
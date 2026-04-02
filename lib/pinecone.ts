import { Pinecone } from '@pinecone-database/pinecone'

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
})

const index = pinecone
    .index(process.env.PINECONE_INDEX_NAME!)
    .namespace("default")

type Metadata = Record<string, any>

export async function saveManyVectors(vectors: Array<{
    id: string
    embedding: number[]
    metadata: Metadata
}>) {
    if (!vectors.length) return

    const upsertData = vectors.map(v => ({
        id: v.id,
        values: v.embedding,
        metadata: v.metadata
    }))

    try {
        await index.upsert({
            records: upsertData
        })
    } catch (error) {
        console.error("Pinecone upsert error:", error)
        throw error
    }
}

export async function searchVectors(
    embedding: number[],
    filter: Metadata = {},
    topK: number = 3
) {
    const result = await index.query({
        vector: embedding,
        filter,
        topK,
        includeMetadata: true,
        includeValues: false
    })

    return result.matches || []
}
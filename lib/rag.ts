import { prisma } from "./db";
import { chatWithAI, createEmbedding, createManyEmbeddings } from "./genAI";
import { saveManyVectors, searchVectors } from "./pinecone";
import { chunkTranscript, extractSpeaker } from "./text-chunker";

export async function processTranscript(
    meetingId: string,
    userId: string,
    transcript: string,
    meetingTitle?: string
) {
    const chunks = chunkTranscript(transcript);

    if (!chunks.length) {
        throw new Error("No chunks generated from transcript");
    }

    const texts = chunks.map(chunk => chunk.content);

    const embeddings = await createManyEmbeddings(texts);

    // Safety check
    if (embeddings.length !== chunks.length) {
        throw new Error("Mismatch between chunks and embeddings");
    }

    // Avoid duplicate extractSpeaker calls
    const dbChunks = chunks.map((chunk) => {
        const speaker = extractSpeaker(chunk.content);

        return {
            meetingId,
            chunkIndex: chunk.chunkIndex,
            content: chunk.content,
            speakerName: speaker,
            vectorId: `${meetingId}_chunk_${chunk.chunkIndex}`
        };
    });

    await prisma.transcriptChunk.createMany({
        data: dbChunks,
        skipDuplicates: true
    });

    const vectors = chunks.map((chunk, index) => {
        const embedding = embeddings[index];

        if (!embedding) {
            throw new Error(`Missing embedding for chunk ${chunk.chunkIndex}`);
        }

        const speaker = extractSpeaker(chunk.content);

        return {
            id: `${meetingId}_chunk_${chunk.chunkIndex}`,
            embedding,
            metadata: {
                meetingId,
                userId,
                chunkIndex: chunk.chunkIndex,
                content: chunk.content,
                speakerName: speaker,
                meetingTitle: meetingTitle || 'Untitled Meeting'
            }
        };
    });

    await saveManyVectors(vectors);
}

export async function chatWithMeeting(
    userId: string,
    meetingId: string,
    question: string
) {
    const questionEmbedding = await createEmbedding(question);

    if (!questionEmbedding) {
        return {
            answer: "Failed to process your question.",
            sources: []
        };
    }

    const results = await searchVectors(
        questionEmbedding,
        { userId, meetingId },
        5
    );

    if (!results.length) {
        return {
            answer: "No relevant information found in this meeting.",
            sources: []
        };
    }

    const meeting = await prisma.meeting.findUnique({
        where: { id: meetingId }
    });

    const context = results
        .slice(0, 5) // limit context size (cost optimization)
        .map(result => {
            const speaker = result.metadata?.speakerName || 'Unknown';
            const content = result.metadata?.content || '';
            return `${speaker}: ${content}`;
        })
        .join('\n\n');

    const systemPrompt = `You are helping someone understand their meeting.
Meeting: ${meeting?.title || 'Untitled Meeting'}
Date: ${meeting?.createdAt ? new Date(meeting.createdAt).toDateString() : 'Unknown'}

Here's what was discussed:
${context}

Answer the user's question based only on the meeting content above. If the answer isn't in the meeting, say so.`;

    const answer = await chatWithAI(systemPrompt, question);

    return {
        answer,
        sources: results.map(result => ({
            meetingId: result.metadata?.meetingId,
            content: result.metadata?.content,
            speakerName: result.metadata?.speakerName,
            confidence: result.score
        }))
    };
}

export async function chatWithAllMeetings(
    userId: string,
    question: string
) {
    const questionEmbedding = await createEmbedding(question);

    if (!questionEmbedding) {
        return {
            answer: "Failed to process your question.",
            sources: []
        };
    }

    const results = await searchVectors(
        questionEmbedding,
        { userId },
        8
    );

    if (!results.length) {
        return {
            answer: "No relevant information found across meetings.",
            sources: []
        };
    }

    const context = results
        .slice(0, 8)
        .map(result => {
            const meetingTitle = result.metadata?.meetingTitle || 'Untitled Meeting';
            const speaker = result.metadata?.speakerName || 'Unknown';
            const content = result.metadata?.content || '';
            return `Meeting: ${meetingTitle}\n${speaker}: ${content}`;
        })
        .join('\n\n---\n\n');

    const systemPrompt = `You are helping someone understand their meeting history.

Here's what was discussed across their meetings:
${context}

Answer the user's question based only on the meeting content above. When referencing something, mention which meeting it is from.`;

    const answer = await chatWithAI(systemPrompt, question);

    return {
        answer,
        sources: results.map(result => ({
            meetingId: result.metadata?.meetingId,
            meetingTitle: result.metadata?.meetingTitle,
            content: result.metadata?.content,
            speakerName: result.metadata?.speakerName,
            confidence: result.score
        }))
    };
}
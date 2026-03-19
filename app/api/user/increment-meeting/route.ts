import { prisma } from "@/lib/db";
import { incrementMeetingUsage } from "@/lib/usage";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Not authed' }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: {
                clerkId: userId
            },
            select: {
                id: true,
            }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        await incrementMeetingUsage(user.id)

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'failed to incrmeent usage' }, { status: 500 })
    }
}

// This route handles the POST request to increment the meeting usage for an authenticated user.
// It first checks if the user is authenticated using the Clerk authentication system. If not authenticated, it returns a 401 error.
// Then, it retrieves the user's information from the database using Prisma, specifically their ID.
// If the user is not found in the database, it returns a 404 error.
// Next, it increments the user's meeting usage in the database and returns a success response in JSON format.
// If any error occurs during this process, it catches the error and returns a 500 error with a message indicating that it failed to increment usage.
// Overall, this code provides a secure and efficient way to manage meeting usage for authenticated users in a Next.js application using Clerk and Prisma.
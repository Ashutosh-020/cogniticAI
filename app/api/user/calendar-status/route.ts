import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ connected: false })
        }

        const user = await prisma.user.findUnique({
            where: {
                clerkId: userId
            },
            select: {
                calendarConnected: true,
                googleAccessToken: true
            }
        })

        return NextResponse.json({
            connected: user?.calendarConnected && !!user.googleAccessToken
        })
    } catch (error) {
        return NextResponse.json({ connected: false })
    }
}

// This route checks if the user has connected their calendar by verifying the presence of a calendar connection and a valid Google access token in the database.
// If the user is not authenticated or if any error occurs during the process, it returns a response indicating that the calendar is not connected.
// The route uses the Clerk authentication system to identify the user and Prisma to query the database for the user's calendar connection status.
// The response is returned in JSON format, indicating whether the calendar is connected or not.
// This route is essential for the frontend to determine whether to prompt the user to connect their calendar or to proceed with calendar-related functionalities.
// Overall, this code provides a simple and efficient way to check the calendar connection status for authenticated users in a Next.js application using Clerk and Prisma.

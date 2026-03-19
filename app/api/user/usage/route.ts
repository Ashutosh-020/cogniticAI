import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: 'not authed' }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: {
                clerkId: userId
            },
            select: {
                currentPlan: true,
                subscriptionStatus: true,
                meetingsThisMonth: true,
                chatMessagesToday: true,
                billingPeriodStart: true,
            }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({ error: 'failed to fetch usaged' }, { status: 500 })
    }
}

// This route retrieves the usage information for the authenticated user, including their current plan, subscription status, meetings this month, chat messages today, and billing period start date.
// It uses the Clerk authentication system to identify the user and Prisma to query the database for the user's usage information.
// If the user is not authenticated, it returns a 401 error. If the user is not found in the database, it returns a 404 error. If any other error occurs during the process, it returns a 500 error.
// The response is returned in JSON format, containing the user's usage information or an error message if applicable.
// This route is essential for the frontend to display the user's usage statistics and subscription details in their account dashboard or settings page.
// Overall, this code provides a secure and efficient way to fetch and return user usage information in a Next.js application using Clerk and Prisma.
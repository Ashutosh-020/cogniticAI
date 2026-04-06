import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ meetingId: string }> }
) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "not authed" }, { status: 401 })
        }

        const { meetingId } = await params
        const { botScheduled } = await request.json()

        const user = await prisma.user.findUnique({
            where: {
                clerkId: userId
            }
        })

        if (!user) {
            return NextResponse.json({ error: "user not found" }, { status: 404 })
        }

        const meeting = await prisma.meeting.update({
            where: {
                id: meetingId,
                userId: user.id
            },
            data: {
                botScheduled: botScheduled
            }
        })

        return NextResponse.json({
            success: true,
            botScheduled: meeting.botScheduled,
            message: `Bot ${botScheduled ? 'enable' : 'disabled'} for meeting`
        })
    } catch (error) {
        console.error('Bot toogle error:', error)
        return NextResponse.json({
            error: "Failed to update bot status"
        }, { status: 500 })
    }
}

// this route is used to toggle the bot on and off for a meeting. It updates the botScheduled field in the meeting record in the database.
// The request body should contain a boolean field botScheduled which indicates whether the bot should be enabled or disabled for the meeting. The route checks if the user is authenticated and if the meeting belongs to the user before updating the bot status.
// Example request body:
// {
//     "botScheduled": true
// }
// Example response:
// {
//     "success": true,
//     "botScheduled": true,
//     "message": "Bot enabled for meeting"
// }
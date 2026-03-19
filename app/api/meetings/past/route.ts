import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import { NextResponse } from "next/server";
import { connected } from "process";

export async function GET() {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "not authed" }, { status: 401 })
        }
        const user = await prisma.user.findUnique({
            where: {
                clerkId: userId
            }
        })

        if (!user) {
            return NextResponse.json({ error: "user not found" }, { status: 404 })
        }

        const pastMeetings = await prisma.meeting.findMany({
            where: {
                userId: user.id,
                meetingEnded: true
            },
            orderBy: {
                endTime: 'desc'
            },
            take: 10
        })

        return NextResponse.json({ meetings: pastMeetings })

    } catch (error) {
        return NextResponse.json({ error: 'failed to fetch past meetings', meetings: [] }, { status: 500 })
    }
}

// This endpoint is used to fetch the past meetings of the user.
//  We define past meetings as meetings that have ended (meetingEnded: true).
//  We order the meetings by end time in descending order and return the 10 most recent past meetings.
//  This endpoint is used in the dashboard to show the user their past meetings.
//  We can also use this endpoint to show the user their past meetings in the home page or in the meeting details page.
//  We can also add pagination to this endpoint in the future if we want to show more past meetings.
// The reason we use meetingEnded flag instead of comparing endTime with current time is because we want to have more control over when a meeting is considered ended.
// For example, we might want to consider a meeting ended even if the end time has not passed yet,
//  if the user manually ends the meeting or if we detect that the meeting has ended through some other means
//  (e.g. webhook from video conferencing provider).
// By using a meetingEnded flag, we can also easily show the user their past meetings even if the end time has not passed yet (e.g. if the user ended the meeting early).
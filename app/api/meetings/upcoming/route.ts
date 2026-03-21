import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const now = new Date();
    const upcomingMeetings = await prisma.meeting.findMany({
      where: {
        userId: user.id,
        startTime: { gte: now },
        isFromCalendar: true,
      },
      orderBy: { startTime: "asc" },
      take: 10,
    });

    const events = upcomingMeetings.map((meeting) => {

      return {
        id: meeting.calendarEventId || meeting.id,
        summary: meeting.title,
        start: { dateTime: meeting.startTime.toISOString() },
        end: { dateTime: meeting.endTime.toISOString() },
        attendees: meeting.attendees || [],
        hangoutLink: meeting.meetingUrl,
        conferenceData: meeting.meetingUrl ? { entryPoints: [{ uri: meeting.meetingUrl }] }: null,
        botScheduled: meeting.botScheduled,
        meetingId: meeting.id,
      };
    });

    return NextResponse.json({
      events,
      connected: user.calendarConnected,
      source: "database",
    });
  } catch (error) {
    console.error("Error fetching meetings:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch meetings",
        events: [],
        connected: false,
      },
      { status: 500 },
    );
  }
}

// This route fetches upcoming meetings for the authenticated user from the database,
//  filtering for meetings that are scheduled in the future and are sourced from the calendar.
//  It returns a structured JSON response containing the meeting details, connection status, and source information.
// The response includes an array of events with properties like id, summary, start and end times, attendees, hangout links, and conference data.
// The route also handles authentication and error scenarios, ensuring that only authenticated users can access their meetings and providing appropriate error messages when issues arise.
// Note: This route is designed to work with meetings that are stored in the database, which may include meetings that were created through the application or synced from an external calendar.
//  It does not directly fetch meetings from the Google Calendar API, but rather relies on the data stored in the application's database.
// This route is intended to be used by the frontend to display upcoming meetings to the user, allowing them to see their schedule and access meeting details directly from the application.
// The route is optimized to return a limited number of upcoming meetings (up to 10) to ensure efficient data retrieval and display on the frontend.
// Note: The route assumes that the meetings stored in the database have a structure that includes properties like title, startTime, endTime, attendees, meetingUrl, and calendarEventId.
// Overall, this route serves as a crucial part of the application's functionality, enabling users to view their upcoming meetings and access relevant details in a seamless manner.

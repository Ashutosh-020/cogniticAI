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
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    const upcomingMeetings = await prisma.meeting.findMany({
      where: {
        userId: user.id,
        isFromCalendar: true,
        startTime: { lte: oneHourFromNow },
        endTime: { gte: fifteenMinutesAgo },
        meetingUrl: { not: null },
        botScheduled: true,
      },
      select: {
        id: true,
        calendarEventId: true,
        title: true,
        startTime: true,
        endTime: true,
        meetingUrl: true,
        attendees: true,
        botScheduled: true,
        botSent: true,
      },
      orderBy: { startTime: "asc" },
      take: 10,
    });

    const events = upcomingMeetings.map((meeting) => {
      let parsedAttendees: any[] = [];
      try {
        const attendeesData = meeting.attendees;
        if (typeof attendeesData === "string") {
          parsedAttendees = JSON.parse(attendeesData || "[]");
        } else if (Array.isArray(attendeesData)) {
          parsedAttendees = attendeesData;
        } else if (attendeesData) {
          // If stored as JSON object but not string/array, handle fallback
          parsedAttendees = JSON.parse(JSON.stringify(attendeesData || []));
          if (!Array.isArray(parsedAttendees)) {
            parsedAttendees = [];
          }
        }
      } catch (e) {
        parsedAttendees = [];
      }

      return {
        id: meeting.calendarEventId || meeting.id,
        title: meeting.title,
        startTime: meeting.startTime.toISOString(),
        endTime: meeting.endTime.toISOString(),
        meetingUrl: meeting.meetingUrl,
        attendees: parsedAttendees,
        attendeesCount: parsedAttendees.length,
        botScheduled: meeting.botScheduled,
        botSent: meeting.botSent,
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

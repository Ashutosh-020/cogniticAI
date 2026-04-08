import React, { memo } from 'react'
import { PastMeeting } from '../hooks/useMeetings'
import { Clock, ExternalLink, Video } from 'lucide-react'
import AttendeeAvatars from './AttendeeAvatars'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'

const safeDate = (value: any) => {
    const d = value ? new Date(value) : null;
    return d && !isNaN(d.getTime()) ? d : null;
};

const PastMeetingCard = memo(function PastMeetingCard({
    meeting,
    onMeetingClick,
    getAttendeeList,
    getInitials,
}: {
    meeting: PastMeeting
    onMeetingClick: (id: string) => void
    getAttendeeList: (attendees: any) => string[]
    getInitials: (name: string) => string
}) {
    return (
        <div
            className="
                relative
                flex cursor-pointer flex-col
                rounded-2xl border border-border/60 bg-card p-5
                transition-colors duration-200
                hover:border-primary/40 hover:bg-accent/30
                overflow-visible
            "
            onClick={() => onMeetingClick(meeting.id)}
        >
            <div className="mb-3 flex items-start justify-between gap-4">
                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <h3 className="line-clamp-1 text-lg font-semibold text-foreground">
                        {meeting.title}
                    </h3>

                    {meeting.attendees && (
                        <div
                            className="shrink-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <AttendeeAvatars
                                attendees={meeting.attendees}
                                getAttendeeList={getAttendeeList}
                                getInitials={getInitials}
                            />
                        </div>
                    )}
                </div>

                <span className="inline-flex shrink-0 items-center rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-500">
                    Completed
                </span>
            </div>

            {meeting.description && (
                <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {meeting.description}
                </p>
            )}

            <div className="mt-auto flex flex-col items-start justify-between gap-4 border-t border-border/40 pt-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Clock className="size-4 text-foreground/40" />
                    <span>
                        {(() => {
                            const s = safeDate(meeting.startTime);
                            const e = safeDate(meeting.endTime);
                            return (s ? format(s, 'MMM d, yyyy • h:mm a') : "Invalid date") + ' - ' + (e ? format(e, 'h:mm a') : "Invalid time");
                        })()}
                    </span>
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                    <Button
                        variant="secondary"
                        className="h-8 cursor-pointer gap-2 rounded-lg bg-secondary/60 px-4 text-xs font-medium text-secondary-foreground hover:bg-secondary hover:text-foreground"
                        onClick={() => onMeetingClick(meeting.id)}
                    >
                        View Details
                        <ExternalLink className="size-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    )
})

interface PastMeetingsProps {
    pastMeetings: PastMeeting[]
    pastLoading: boolean
    onMeetingClick: (id: string) => void
    getAttendeeList: (attendees: any) => string[]
    getInitials: (name: string) => string
}

function PastMeetings({
    pastMeetings,
    pastLoading,
    onMeetingClick,
    getAttendeeList,
    getInitials
}: PastMeetingsProps) {

    // Loading State
    if (pastLoading) {
        return (
            <div className="flex flex-col gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border border-border/50 bg-card/50 p-5">
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div className="flex flex-1 items-center gap-4">
                                <div className="h-6 w-1/3 animate-pulse rounded-md bg-muted"></div>
                                <div className="flex -space-x-2">
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <div key={j} className="size-7 animate-pulse rounded-full bg-muted"></div>
                                    ))}
                                </div>
                            </div>
                            <div className="h-6 w-20 animate-pulse rounded-full bg-muted"></div>
                        </div>
                        <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-muted/70"></div>
                        <div className="mb-5 h-4 w-1/2 animate-pulse rounded bg-muted/70"></div>
                        <div className="h-8 w-28 animate-pulse rounded-lg bg-muted"></div>
                    </div>
                ))}
            </div>
        )
    }

    // Empty State
    if (pastMeetings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/30 p-12 text-center">
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted/50 text-muted-foreground">
                    <Video className="size-6" />
                </div>
                <h3 className="mb-1 text-base font-semibold text-foreground">
                    No past meetings
                </h3>
                <p className="text-sm text-muted-foreground">
                    Your completed meetings and their insights will appear here.
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {pastMeetings.map((meeting) => (
                <PastMeetingCard
                    key={meeting.id}
                    meeting={meeting}
                    onMeetingClick={onMeetingClick}
                    getAttendeeList={getAttendeeList}
                    getInitials={getInitials}
                />
            ))}
        </div>
    )
}

export default memo(PastMeetings)


// This component displays a list of past meetings with their details. It handles loading states and empty states gracefully, providing a good user experience.
// Each meeting item is clickable, allowing users to view more details about the meeting.
// The component also uses utility functions to extract attendee information and display their avatars, making it visually appealing and informative.
// The use of date-fns for formatting dates ensures that the meeting times are displayed in a user-friendly format.
// Overall, this component is a crucial part of the dashboard, providing users with easy access to their past meetings and encouraging engagement with the platform.
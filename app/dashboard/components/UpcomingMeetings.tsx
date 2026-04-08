import React, { memo } from 'react'
import { CalendarEvent } from '../hooks/useMeetings'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { 
    Clock, 
    Calendar, 
    Users, 
    Video, 
    AlertCircle, 
    RefreshCw, 
    CalendarPlus 
} from 'lucide-react'
import { format } from 'date-fns'

const safeDate = (value: any) => {
    const d = value ? new Date(value) : null;
    return d && !isNaN(d.getTime()) ? d : null;
};

const UpcomingEventCard = memo(function UpcomingEventCard({
    event,
    botOn,
    onToggleBot,
}: {
    event: CalendarEvent
    botOn: boolean
    onToggleBot: (eventId: string) => void
}) {
    return (
        <div className="group relative flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <h4 className="line-clamp-2 text-sm font-semibold text-foreground leading-snug">
                    {(event as any).title || event.summary || 'Untitled Event'}
                </h4>
                <div className="flex shrink-0 items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground/70">
                        Bot
                    </span>
                    <Switch
                        checked={botOn}
                        onCheckedChange={() => onToggleBot(event.id)}
                        aria-label="Toggle bot for this meeting"
                        className="cursor-pointer data-[state=checked]:bg-primary"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Clock className="size-3.5 text-foreground/50" />
                    <span>
                        {(() => {
                            const eventAny = event as any;
                            const date = safeDate(eventAny.startTime || event.start?.dateTime || event.start?.date);
                            if (!date) return "Invalid date";
                            return format(date, 'MMM d, h:mm a');
                        })()}
                    </span>
                </div>
                {event.attendees && event.attendees.length > 0 && (
                    <div className="flex items-center gap-2">
                        <Users className="size-3.5 text-foreground/50" />
                        <span>{event.attendees.length} attendees</span>
                    </div>
                )}
            </div>

            {((event as any).meetingUrl || event.hangoutLink || event.location) && (
                <a
                    href={(event as any).meetingUrl || event.hangoutLink || event.location || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1"
                >
                    <Button
                        variant="secondary"
                        className="h-8 w-full cursor-pointer gap-2 rounded-lg bg-secondary/60 text-xs font-medium text-secondary-foreground hover:bg-white hover:text-black border transition-colors"
                    >
                        <Video className="size-3.5" />
                        Join Meeting
                    </Button>
                </a>
            )}
        </div>
    )
})

interface UpcomingMeetingsProps {
    upcomingEvents: CalendarEvent[]
    connected: boolean
    error: string
    loading: boolean
    initialLoading: boolean
    botToggles: { [key: string]: boolean }
    onRefresh: () => void
    onToggleBot: (eventId: string) => void
    onConnectCalendar: () => void
}

function UpcomingMeetings({
    upcomingEvents,
    connected,
    error,
    loading,
    initialLoading,
    botToggles,
    onRefresh,
    onToggleBot,
    onConnectCalendar
}: UpcomingMeetingsProps) {
    return (
        <div className="flex flex-col h-full">
            {/* HEADER */}
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold tracking-tight text-foreground">
                        Upcoming Meetings
                    </h2>
                    {upcomingEvents.length > 0 && (
                        <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                            {upcomingEvents.length}
                        </span>
                    )}
                </div>

                {connected && !initialLoading && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onRefresh}
                        disabled={loading}
                        className="size-8 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                        title="Refresh meetings"
                    >
                        <RefreshCw className={`size-4 ${loading ? 'animate-spin text-primary' : ''}`} />
                    </Button>
                )}
            </div>

            {/* ERROR STATE */}
            {error && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                    <AlertCircle className="size-5 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{error}</p>
                </div>
            )}

            {/* SKELETON LOADER */}
            {initialLoading ? (
                <div className="flex flex-col gap-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="rounded-xl border border-border/50 bg-card/50 p-4">
                            <div className="mb-3 flex justify-between gap-4">
                                <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
                                <div className="h-5 w-8 animate-pulse rounded-full bg-muted"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-3 w-1/2 animate-pulse rounded bg-muted"></div>
                                <div className="h-3 w-1/3 animate-pulse rounded bg-muted"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : !connected ? (
                /* NOT CONNECTED STATE */
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/30 p-8 text-center">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                        <CalendarPlus className="size-6" />
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-foreground">
                        Connect Your Calendar
                    </h3>
                    <p className="mb-6 max-w-50 text-xs text-muted-foreground">
                        Sync your Google Calendar to view and manage upcoming meetings.
                    </p>
                    <Button
                        onClick={onConnectCalendar}
                        disabled={loading}
                        className="w-full cursor-pointer rounded-lg bg-primary text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]"
                    >
                        {loading ? 'Connecting...' : 'Connect Calendar'}
                    </Button>
                </div>
            ) : upcomingEvents.length === 0 ? (
                /* EMPTY STATE */
                <div className="flex flex-col items-center justify-center rounded-xl border border-border/50 bg-card/30 p-8 text-center">
                    <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Calendar className="size-5" />
                    </div>
                    <h3 className="text-sm font-medium text-foreground">
                        No upcoming meetings
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                        Your schedule is completely clear!
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {upcomingEvents.map((event) => (
                        <UpcomingEventCard
                            key={event.id}
                            event={event}
                            botOn={!!botToggles[event.id]}
                            onToggleBot={onToggleBot}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default memo(UpcomingMeetings)

// This component displays a list of upcoming meetings fetched from the user's calendar. It handles various states such as loading, error,
// and empty states to provide a smooth user experience.
// Users can connect their calendar, refresh the list of meetings, and toggle bot functionality for each meeting directly from this interface.
// The use of date-fns ensures that meeting times are displayed in a user-friendly format, and the component is styled to fit seamlessly into the dashboard's design.
// Each meeting item includes a button to join the meeting if a link is available, making it easy for users to access their meetings directly from the dashboard.
// Overall, this component is a crucial part of the dashboard, providing users with easy access to their upcoming meetings and encouraging engagement with the platform.
'use client'

import React from 'react'
import { useMeetings } from './hooks/useMeetings'
import { useRouter } from 'next/navigation'
import PastMeetings from './components/PastMeetings'
import UpcomingMeetings from './components/UpcomingMeetings'

function Home() {

    const {
        userId,
        upcomingEvents,
        pastMeetings,
        loading,
        pastLoading,
        connected,
        error,
        botToggles,
        initialLoading,
        fetchUpcomingEvents,
        fetchPastMeetings,
        toggleBot,
        directOAuth,
        getAttendeeList,
        getInitials
    } = useMeetings()

    const router = useRouter()
    const handleMeetingClick = (meetingId: string) => {
        router.push(`/meeting/${meetingId}`)
    }
    if (!userId) {
        return (
            <div className='flex items-center justify-center h-screen'>
                Loading...
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-background'>
            <div className='flex gap-6 p-6'>
                <div className='flex-1'>
                    <div className='mb-6'>
                        <h2 className='text-2xl font-bold text-foreground'>
                            Past Meetings
                        </h2>
                    </div>
                    <PastMeetings
                        pastMeetings={pastMeetings}
                        pastLoading={pastLoading}
                        onMeetingClick={handleMeetingClick}
                        getAttendeeList={getAttendeeList}
                        getInitials={getInitials}
                    />
                </div>
                <div className='w-px bg-border'></div>
                <div className='w-96'>
                    <div className='sticky top-6'>
                        <UpcomingMeetings
                            upcomingEvents={upcomingEvents}
                            connected={connected}
                            error={error}
                            loading={loading}
                            initialLoading={initialLoading}
                            botToggles={botToggles}
                            onRefresh={fetchUpcomingEvents}
                            onToggleBot={toggleBot}
                            onConnectCalendar={directOAuth}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home


// This is the main dashboard page that displays past and upcoming meetings.
// It uses the useMeetings hook to fetch and manage meeting data, and passes relevant props to the PastMeetings and UpcomingMeetings components.
// The handleMeetingClick function is used to navigate to the meeting details page when a past meeting is clicked.
// The page also handles loading states and displays a loading message if the user ID is not available yet.
// The layout consists of two main sections: the left side for past meetings and the right side for upcoming meetings, separated by a vertical line.
// The PastMeetings component receives the list of past meetings, loading state, and functions to handle meeting clicks and attendee data processing.
// The UpcomingMeetings component receives the list of upcoming events, connection status, error state, loading states, bot toggles, and functions to refresh events, toggle bots, and connect calendars.
// Note: The actual implementation of the useMeetings hook, PastMeetings component, and UpcomingMeetings component is not shown here, but they are essential for the functionality of this dashboard page.
// The useMeetings hook is responsible for fetching meeting data, managing loading states, handling errors, and providing functions to interact with the calendar and bots.
// The PastMeetings component is responsible for displaying a list of past meetings, allowing users to click on them to view details, and showing attendee avatars using the getAttendeeList and getInitials functions.
// The UpcomingMeetings component is responsible for displaying upcoming events, showing connection status and errors, allowing users to refresh the event list, toggle bots, and connect their calendar.
// Overall, this dashboard page serves as the central hub for users to view and manage their meetings, providing a clear separation between past and upcoming events and integrating with calendar and bot functionalities.
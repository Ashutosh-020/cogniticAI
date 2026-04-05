import React, { memo, useState } from 'react'

interface AttendeeAvatarsProps {
  attendees: any
  getAttendeeList: (attendees: any) => string[]
  getInitials: (name: string) => string
}

function AttendeeAvatarsInner({ attendees, getAttendeeList, getInitials }: AttendeeAvatarsProps) {
  const attendeeList = getAttendeeList(attendees)

  const [open, setOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const visibleAvatars = attendeeList.slice(0, 5)
  const remaining = attendeeList.length - 5

  const popoverList = showAll
    ? attendeeList
    : attendeeList.slice(0, 10)

  return (
    <div
      className="relative flex -space-x-2"
      onMouseEnter={(e) => e.stopPropagation()} // ✅ FIX hover leak
    >

      {/* Avatars */}
      {visibleAvatars.map((attendee, index) => (
        <div key={index} className="relative group/avatar">
          
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-blue-600 border-2 border-background flex items-center justify-center text-white text-xs font-medium hover:scale-110 transition-transform cursor-pointer select-none">
            {getInitials(attendee)}
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/avatar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            {attendee}
          </div>
        </div>
      ))}

      {/* +X Avatar */}
      {attendeeList.length > 5 && (
        <div className="relative">
          <div
            onClick={(e) => {
              e.stopPropagation()
              setOpen(prev => !prev)
            }}
            className="w-8 h-8 rounded-full bg-gray-500 border-2 border-background flex items-center justify-center text-white text-xs font-medium cursor-pointer hover:scale-110 transition-transform select-none"
          >
            +{remaining}
          </div>

          {/* Popover */}
          {open && (
            <div
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()} // ✅ prevent click-through
              className="
                absolute top-9 right-0
                w-72 min-w-65
                bg-card border border-border rounded-lg shadow-lg p-2
                z-999 isolate pointer-events-auto
              "
            >
              <div className="max-h-60 overflow-y-auto">
                {popoverList.map((attendee, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted text-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs select-none">
                      {getInitials(attendee)}
                    </div>

                    {/* FIX: full email visible */}
                    <span className="break-all">
                      {attendee}
                    </span>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              {!showAll && attendeeList.length > 10 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowAll(true)
                  }}
                  className="w-full mt-2 text-xs text-primary hover:underline"
                >
                  View All
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const AttendeeAvatars = memo(AttendeeAvatarsInner)
export default AttendeeAvatars

// This component displays a list of attendee avatars with their initials. If there are more than 4 attendees, it shows a "+X more" avatar.
// Each avatar has a tooltip that shows the full name of the attendee on hover.
// The component takes in three props:
// - attendees: The raw attendee data.
// - getAttendeeList: A function that processes the raw attendee data and returns a list of attendee names.
// - getInitials: A function that takes a name and returns the initials to be displayed in the avatar.
// The component uses Tailwind CSS for styling and includes hover effects for the avatars and tooltips.
// Example usage:
// <AttendeeAvatars
//   attendees={eventAttendees}
//   getAttendeeList={(attendees) => attendees.map(a => a.name)}
//   getInitials={(name) => name.split(' ').map(n => n[0]).join('')}
// />
// In this example, the getAttendeeList function extracts the names from the raw attendee data, and the getInitials function generates initials by taking the first letter of each part of the name.
// Note: The actual implementation of getAttendeeList and getInitials will depend on the structure of the attendee data and how you want to format the initials.
// The component also handles the case where there are more than 4 attendees by showing a "+X more" avatar, which indicates how many additional attendees there are beyond the first 4.
// The tooltips are implemented using absolute positioning and opacity transitions, making them appear when the user hovers over the avatar.
// This component is designed to be reusable and can be integrated into any part of the dashboard where attendee information needs to be displayed in a compact and visually appealing way.
// Note: Make sure to adjust the styling and functionality as needed to fit the specific requirements of your application and the structure of your attendee data.
// The component is also designed to be responsive and should work well on different screen sizes, but you may want to test and adjust the styling as needed for your specific use case.
// Overall, this component provides a clean and efficient way to display attendee information in a compact format while still allowing users to see the full names through tooltips.
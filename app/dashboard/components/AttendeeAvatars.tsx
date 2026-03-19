import React from 'react'
interface AttendeeAvatarsProps {
  attendees: any
  getAttendeeList: (attendees: any) => string[]
  getInitials: (name: string) => string
}



function AttendeeAvatars({ attendees, getAttendeeList, getInitials }: AttendeeAvatarsProps) {
  const attendeeList = getAttendeeList(attendees)
  return (
    <div className='flex -space-x-2'>
      {attendeeList.slice(0, 4).map((attendee, index) => (
        <div
          key={index}
          className='relative group'
          title={attendee}
        >
          <div className='w-6 h-6 rounded-full bg-linear-to-br from-blue-500 to-blue-600 border-2 border-background flex items-center justify-center text-white text-xs font-medium hover:scale-110 transition-transform cursor-pointer'>
            {getInitials(attendee)}
          </div>
          <div className='absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10'>
            {attendee}
          </div>
        </div>
      ))}
      {attendeeList.length > 4 && (
        <div
          className='w-6 h-6 rounded-full bg-gray-500 border-2 border-background flex items-center justify-center text-white text-xs font-medium'
          title={`+${attendeeList.length - 4} more`}

        >
          +{attendeeList.length - 4}
        </div>
      )}

    </div>
  )
}

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
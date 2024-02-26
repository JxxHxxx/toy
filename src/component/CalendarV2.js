import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import '../css/VacationCalendar.css'

export default function CalendarV2() {
  return (
    <div className='full-cal'>
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            />
    </div>
  )
}
import React from 'react'
import { CalendarDays, Ticket } from 'lucide-react'
import indiaFlag from '../assets/india-flag.svg'

const MatchCard = ({ match, onSeeTickets }) => {
  const [timePart, ...locationParts] = match.timeVenue.split('•').map((part) => part.trim())
  const locationText = locationParts.join(' • ')

  return (
    <div className="grid grid-cols-[70px_1fr] gap-3 rounded-xl border border-slate-200 bg-white p-3 md:grid-cols-[80px_1fr_auto] md:items-center">
      <div className="rounded-md border border-slate-200 bg-slate-50 py-2 text-center">
        <h1 className="m-0 text-lg font-bold text-slate-900">{match.date}</h1>
        <h1 className="m-0 text-sm text-slate-500">{match.day}</h1>
      </div>

      <div>
        <h3 className="text-md m-0 font-bold text-slate-900">{match.title}</h3>
        <p className="m-0 mt-1 flex items-center gap-1 text-sm text-slate-600">
          <span>{timePart}</span>
          {locationText && (
            <>
              <span>•</span>
              <img src={indiaFlag} alt="India flag" className="h-3.5 w-5 rounded-[2px] object-cover" />
              <span>{locationText}</span>
            </>
          )}
        </p>
        <div className="mt-2 flex items-center gap-3 text-xs font-semibold">
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-slate-600">
            <CalendarDays size={13} />
            {match.badgeText || 'Today'}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-red-500">
            <Ticket size={13} />
            Only 1% of tickets left
          </span>
        </div>
      </div>

      <div className="md:justify-self-end">
        <button
          type="button"
          onClick={onSeeTickets}
          className="mt-3 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 md:mt-0 md:w-auto cursor-pointer"
        >
          See tickets
        </button>
      </div>
    </div>
  )
}

export default MatchCard

import React, { useState } from 'react'
import { Armchair } from 'lucide-react'

const TicketCountModal = ({ ticketCount, onChange, onContinue }) => {
  const [sitTogether, setSitTogether] = useState(true)

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-xl sm:p-6">
        <h2 className="mb-4 flex items-center justify-center text-3xl font-bold text-slate-900 sm:text-4xl">How many tickets?</h2>

        <select
          value={ticketCount}
          onChange={(e) => onChange(e.target.value)}
          className="mb-4 h-12 w-full rounded-lg border border-slate-300 px-3 text-base outline-none focus:border-lime-500 sm:text-lg"
        >
          <option value="any">Any</option>
          <option value={1}>1 ticket</option>
          <option value={2}>2 tickets</option>
          <option value={3}>3 tickets</option>
          <option value={4}>4 tickets</option>
        </select>

        <div className="mb-5 rounded-xl bg-slate-100 p-3 text-sm text-slate-600">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <div className="flex -space-x-1 text-lime-700">
                <Armchair size={15} />
                <Armchair size={15} />
              </div>
              <span>We want to be seated together</span>
            </div>
            <button
              type="button"
              onClick={() => setSitTogether((prev) => !prev)}
              className={`relative h-6 w-11 rounded-full transition ${sitTogether ? 'bg-lime-700' : 'bg-slate-300'
                }`}
              aria-label="Toggle seated together"
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${sitTogether ? 'left-[22px]' : 'left-[2px]'
                  }`}
              />
            </button>
          </div>
          We will find the best available tickets based on your search criteria.
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="h-12 w-full rounded-xl bg-lime-700 font-semibold text-white transition hover:bg-lime-800"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default TicketCountModal

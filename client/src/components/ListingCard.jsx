import React from 'react'
import { Armchair, BadgePercent, CircleGauge, Download, Eye, Ticket } from 'lucide-react'

const ListingCard = ({ item, count, isSelected = false }) => {
  const isUrgent = (text = '') => {
    const value = text.toLowerCase()
    return value.includes('last') || value.includes('only')
  }

  const getBadgeTone = (text = '') =>
    isUrgent(text)
      ? 'bg-pink-100 text-pink-700'
      : 'bg-lime-100 text-lime-700'

  return (
    <div
      className={`mb-3 rounded-lg border p-3 transition ${
        isSelected ? 'border-emerald-300 bg-emerald-50/40' : 'border-slate-200'
      }`}
    >
      <div className="grid grid-cols-[1fr_auto] gap-x-3">
        <div>
          <h4 className="whitespace-nowrap text-[22px] font-semibold leading-tight text-slate-900">{item.section}</h4>
          {item.row ? <p className="mt-0.5 text-sm font-bold text-slate-900">{item.row}</p> : null}
        </div>
        <div className="text-right">
          {item.left ? (
            <span className={`inline-flex rounded-md px-2 py-1 text-xs font-bold leading-none ${getBadgeTone(item.left)}`}>
              {item.left}
            </span>
          ) : null}
        </div>

        <div className="mt-1">
          <div className="space-y-1 text-sm text-slate-500">
            <p className="flex items-center gap-1 mt-2 font-semibold text-slate-800">
              <span className="flex -space-x-1 text-lime-700">
                <Armchair size={14} strokeWidth={2.4} />
                <Armchair size={14} strokeWidth={2.4} />
              </span>
              {item.together || `${count} tickets together`}
            </p>
            <h1 className="flex items-center gap-1"><Download size={13} strokeWidth={2.4} /> {item.delivery}</h1>
            <h1 className="flex items-center gap-1"><Eye size={13} strokeWidth={2.4} /> {item.view}</h1>
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs font-semibold">
            <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 ${getBadgeTone(item.tagA)}`}>
              <BadgePercent size={12} strokeWidth={2.4} />
              {item.tagA}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 ${getBadgeTone(item.tagB)}`}>
              <Ticket size={12} strokeWidth={2.4} />
              {item.tagB}
            </span>
          </div>
        </div>

        <div className="mt-0 text-right">
          <p className="flex items-center justify-end gap-1 leading-none">
            {item.oldPrice ? <span className="text-sm text-slate-400 line-through">{item.oldPrice}</span> : null}
            <span className="text-3xl font-bold leading-none text-slate-900">{item.price}</span>
          </p>
          {item.rating ? (
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-teal-100 px-2 py-1 text-xs font-semibold text-teal-800">
              <CircleGauge size={12} strokeWidth={2.4} />
              {item.rating}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ListingCard

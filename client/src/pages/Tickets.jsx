import React, { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ListFilter } from 'lucide-react'
import ListingCard from '../components/ListingCard'
import StadiumCanvas from '../components/StadiumCanvas'
import stadiumThumb from '../assets/stadium-thumb.png'

const listings = [
  {
    id: 1,
    zoneId: 'south-top-right',
    section: 'Section North Stand A 3rd Flr.',
    row: 'Row U',
    together: '2 tickets together',
    delivery: 'Instant Download',
    view: 'Clear view',
    tagA: 'Best price',
    tagB: 'Last tickets',
    left: 'Only 3 left',
    oldPrice: '€17',
    price: '€13',
    rating: '10.0 Amazing',
  },
  {
    id: 2,
    zoneId: 'south-top-right',
    section: 'Section North Stand A 2nd Flr.',
    row: 'Row Q',
    together: '2 tickets together',
    delivery: 'Instant Download',
    view: 'Side view',
    tagA: 'Great deal',
    tagB: 'Only 2 left',
    left: '25% off',
    oldPrice: '€26',
    price: '€19',
    rating: '9.3 Great',
  },
  {
    id: 3,
    zoneId: 'north-bottom-right',
    section: 'Section North Stand G 3rd Flr.',
    row: '',
    together: '2 tickets together',
    delivery: 'Instant Download',
    view: 'Clear view',
    tagA: 'Last tickets',
    tagB: 'Only 4 left',
    left: '30% off',
    oldPrice: '€42',
    price: '€30',
    rating: '',
  },
  {
    id: 4,
    zoneId: 'east-left',
    section: 'Section South Stand D 3rd Flr.',
    row: '',
    together: '2 tickets together',
    delivery: 'Instant Download',
    view: 'Clear view',
    tagA: 'Last tickets',
    tagB: 'Only 4 left',
    left: '30% off',
    oldPrice: '€49',
    price: '€34',
    rating: '',
  },
  {
    id: 5,
    zoneId: 'south-top-left',
    section: 'South Stand D Gr Flr.',
    row: '',
    together: '2 tickets together',
    delivery: 'Instant Download',
    view: 'Clear view',
    tagA: 'Last tickets',
    tagB: 'Only 4 left',
    left: '47% off',
    oldPrice: '€64',
    price: '€34',
    rating: '',
  },
]

const defaultListings = listings.filter((item) => [1, 3, 4, 5].includes(item.id))

const Tickets = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const count = query.get('count') || 'any'
  const [selectedSeat, setSelectedSeat] = useState(null)

  // Build a quick lookup so each stand click maps to its own listing set.
  const listingsByZone = useMemo(
    () =>
      listings.reduce((acc, item) => {
        if (!acc[item.zoneId]) acc[item.zoneId] = []
        acc[item.zoneId].push(item)
        return acc
      }, {}),
    []
  )

  // Default view shows the original 4 cards; stand click shows stand-specific cards.
  const visibleListings = useMemo(() => {
    if (!selectedSeat) return defaultListings
    return listingsByZone[selectedSeat.id] || []
  }, [selectedSeat, listingsByZone])

  // Clicking the same stand again resets back to default listings.
  const handleSeatSelect = (zone) => {
    setSelectedSeat((prev) => (prev?.id === zone.id ? null : zone))
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="flex flex-col items-start gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <img
            src={stadiumThumb}
            alt="Stadium preview"
            className="h-14 w-20 rounded-lg object-cover"
          />
          <div>
            <h2 className="text-base font-bold text-slate-900 md:text-xl">
              Rajasthan Royals vs Mumbai Indians
            </h2>
            <p className="text-sm font-semibold text-slate-600">Tue • Apr 7 • 7:30 PM <br /> ACA Stadium, Guwahati, Assam, India</p>
          </div>
        </div>
        <div className="flex items-center gap-5 self-end sm:self-auto">
          <Link className="text-sm font-semibold text-lime-700" to="/">Back</Link>
        </div>
      </header>

      {/* Stadium Section */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 p-3 sm:p-4 md:p-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-2">
          <StadiumCanvas selectedSeatId={selectedSeat?.id} onSeatSelect={handleSeatSelect} />
        </div>

        {/* Listing Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">{visibleListings.length} listings</h3>
            <div className="flex items-center gap-2">
              <button type="button" className="grid h-9 w-9 place-items-center rounded-lg border border-lime-300 bg-lime-50 text-lime-700">
                <ListFilter size={16} />
              </button>
              <span className="rounded-full bg-lime-100 px-3 py-1 text-sm font-semibold text-lime-800">
                {count} tickets
              </span>
            </div>
          </div>

          {selectedSeat && (
            <p className="mb-3 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700">
              Showing seats for: {selectedSeat.label}
            </p>
          )}

          {visibleListings.length ? (
            visibleListings.map((item) => (
              <ListingCard key={item.id} item={item} count={count} isSelected={item.zoneId === selectedSeat?.id} />
            ))
          ) : (
            <p className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
              No listings found for this stand.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tickets

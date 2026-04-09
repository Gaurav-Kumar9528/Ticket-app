import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserRound } from 'lucide-react'
import ViagogoLogo from '../components/ViagogoLogo'
import MatchCard from '../components/MatchCard'
import TicketCountModal from '../components/TicketCountModal'
import stadiumHero from '../assets/home-side-stadium.png'

const matches = [
  {
    id: 1,
    date: 'Apr 7',
    day: 'Tue',
    badgeText: 'Today',
    title: 'Rajasthan Royals vs Mumbai Indians',
    timeVenue: '7:30 PM • Guwahati, Assam, India • ACA Stadium',
  },
  {
    id: 2,
    date: 'Apr 8',
    day: 'Wed',
    badgeText: 'Tomorrow',
    title: 'Delhi Capitals vs Gujarat Titans',
    timeVenue: '7:30 PM • Delhi, India • Arun Jaitley Stadium',
  },
  {
    id: 3,
    date: 'Apr 9',
    day: 'Thu',
    badgeText: 'This week',
    title: 'Kolkata Knight Riders vs Lucknow Super Giants',
    timeVenue: '7:30 PM • Kolkata, West Bengal, India • Eden Gardens',
  },
  {
    id: 4,
    date: 'Apr 10',
    day: 'Fri',
    badgeText: 'This week',
    title: 'Rajasthan Royals vs Royal Challengers Bengaluru',
    timeVenue: '7:30 PM • Guwahati, Assam, India • ACA Stadium',
  },
]

const Home = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [ticketCount, setTicketCount] = useState('any')
  const navigate = useNavigate();

  // Keep selection in the URL so Tickets page can read it directly.
  const handleContinue = () => {
    setShowPopup(false)
    navigate(`/tickets?count=${ticketCount}`)
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      {/* Logo  */}
      <header className="flex h-14 items-center border-b border-slate-200 bg-white px-4 sm:h-16 md:px-6">
        <ViagogoLogo />
      </header>

      <div className="grid w-full grid-cols-1 items-start gap-4 px-3 py-3 sm:px-4 sm:py-4 md:px-6 lg:grid-cols-[63%_35%] lg:gap-3">
        <div className="max-w-[900px] md:ml-1 lg:ml-2">
          <h1 className="mb-6 mt-4 max-w-2xl text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:mb-8 md:mt-8 md:text-6xl">
            Indian Premier <br /> League Tickets
          </h1>
          <div className="mb-3 flex items-start gap-2 rounded-xl border border-sky-200 bg-sky-100 px-3 py-2 text-sm text-sky-700 sm:items-center sm:px-4 sm:py-3 sm:text-base">
            <UserRound size={16} />
            <span>4,747 people viewed Indian Premier League events in the past hour</span>
          </div>
          <p className="mb-4 ml-1 mt-4 font-bold text-slate-900 sm:ml-4">No events near you</p>
        
          {/* Card Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
            <h2 className="mb-3 text-xl font-bold text-slate-900 sm:text-2xl">58 events in all locations</h2>
            {matches.map((match) => (
              <div className="mb-3 last:mb-0" key={match.id}>
                <MatchCard match={match} onSeeTickets={() => setShowPopup(true)} />
              </div>
            ))}
          </div>
        </div>
          
          {/* Hero Section */}
        <div className="mt-1 lg:mt-4">
          <img
            src={stadiumHero}
            alt="Cricket stadium"
            className="h-[220px] w-full rounded-2xl border border-slate-200 object-cover sm:h-[280px] lg:mt-20 lg:h-[360px]"
          />
        </div>
      </div>


      {showPopup && (
        <TicketCountModal
          ticketCount={ticketCount}
          onChange={setTicketCount}
          onContinue={handleContinue}
        />
      )}
    </div>
  )
}


export default Home

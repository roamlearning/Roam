import { useState } from 'react';
import { MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Events Data
const eventsData = [
  {
    id: 1,
    date: 'MON MAY 5',
    day: 5,
    time: '10:00 AM',
    category: 'FREE VENUE',
    level: 'A1–A2',
    levelLabel: 'Beginners',
    title: 'Edgewater Park Walk',
    venue: 'Edgewater Park Lakefront',
    address: '6500 Memorial Shoreway, Cleveland',
    venueUrl: 'https://www.clevelandmetroparks.com/parks/visit/parks/edgewater-park',
    grammarFocus: { A1: 'I see, I hear, It is', A2: 'There is / there are, It looks like...' },
    vocabulary: 'Nature, weather, colors, directions, I can see / hear',
    duration: 1.5,
    roamFee: 15,
    entryFeeOhio: 0,
    entryFeeNonOhio: 0,
    additionalCosts: 'None',
    menuUrl: null,
    color: 'bg-emerald-700',
    tags: ['Free', 'A1–A2'],
    costDisplay: '$15',
    costBreakdown: '($15 Roam fee + $0 venue fee)',
    stripeLink: 'https://buy.stripe.com/dRm00j667agndBY8X7c3m06'
  },
  {
    id: 2,
    date: 'TUE MAY 6',
    day: 6,
    time: '10:30 AM',
    category: 'FREE ENTRY',
    level: 'B1–B2',
    levelLabel: 'Intermediate',
    title: 'Cleveland Museum of Art',
    venue: 'Cleveland Museum of Art',
    address: '11150 East Blvd, University Circle',
    venueUrl: 'https://www.clevelandart.org/',
    grammarFocus: { B1: 'Present perfect — This has been here since...', B2: 'Passive voice — It is believed that...' },
    vocabulary: 'Art vocabulary, opinions, describing what you see',
    duration: 2,
    roamFee: 19,
    entryFeeOhio: 0,
    entryFeeNonOhio: 0,
    additionalCosts: 'Optional cafe: $5–$12',
    menuUrl: 'https://www.clevelandart.org/visit/dining',
    color: 'bg-blue-700',
    tags: ['Free', 'B1–B2'],
    costDisplay: '$19 + optional café and gift shop',
    costBreakdown: '($19 Roam fee + $0 venue fee + optional purchases)',
    stripeLink: 'https://buy.stripe.com/00w7sLamnbkrfK6flvc3m07'
  },
  {
    id: 3,
    date: 'WED MAY 7',
    day: 7,
    time: '11:00 AM',
    category: '$6 WITH OHIO ID',
    level: 'All Levels',
    levelLabel: 'All Levels',
    title: 'Rock & Roll Hall of Fame',
    venue: 'Rock & Roll Hall of Fame',
    address: '1100 Rock and Roll Blvd, Downtown',
    venueUrl: 'https://www.rockhall.com/',
    grammarFocus: { All: 'Worksheets specific to each level' },
    vocabulary: 'Music and culture, persuasive language, nuanced opinions',
    duration: 2.5,
    roamFee: 24,
    entryFeeOhio: 6,
    entryFeeNonOhio: 39.50,
    additionalCosts: 'Gift shop, cafe available',
    menuUrl: null,
    color: 'bg-indigo-700',
    tags: ['$6 Ohio ID', 'All Levels'],
    costDisplay: '$30 with Ohio ID / $63 without Ohio ID',
    costBreakdown: '($24 Roam fee + $6 entry with OH ID / $39.50 without OH ID)',
    stripeLink: 'https://buy.stripe.com/fZu9ATamnbkrbtQ7T3c3m08'
  },
  {
    id: 4,
    date: 'MON MAY 12',
    day: 12,
    time: '10:00 AM',
    category: 'DINING',
    level: 'A1–A2',
    levelLabel: 'Beginners',
    title: 'Coffee Shop',
    venue: 'Rising Star Coffee Roasters',
    address: '1455 W 29th St, Ohio City',
    venueUrl: 'https://risingstarcoffee.com/',
    grammarFocus: { A1: 'I want, I have, I like — ordering with help', A2: 'Can I have...? How much is...?' },
    vocabulary: 'Coffee drinks, sizes, hot/cold, prices, please/thank you',
    duration: 1.5,
    roamFee: 15,
    entryFeeOhio: 0,
    entryFeeNonOhio: 0,
    additionalCosts: 'Coffee/snack: $5–$12',
    menuUrl: 'https://risingstarcoffee.com/',
    color: 'bg-rose-400',
    tags: ['Cafe', 'A1–A2'],
    costDisplay: '$15 + coffee/snack purchase',
    costBreakdown: '($15 Roam fee + $0 venue fee + $5–$12 purchase)',
    stripeLink: 'https://buy.stripe.com/aFa5kDcuv6072Xk1uFc3m09'
  },
  {
    id: 5,
    date: 'TUE MAY 13',
    day: 13,
    time: '10:00 AM',
    category: 'FREE ENTRY',
    level: 'B2',
    levelLabel: 'Upper Intermediate',
    title: 'West Side Market',
    venue: 'West Side Market',
    address: '1979 W 25th St, Ohio City',
    venueUrl: 'https://westsidemarket.org/',
    grammarFocus: { B2: 'Conditionals — If I had known about this place...' },
    vocabulary: 'Produce, quantities, vendor interactions, comparing items',
    duration: 1.5,
    roamFee: 15,
    entryFeeOhio: 0,
    entryFeeNonOhio: 0,
    additionalCosts: 'Market purchases: your choice',
    menuUrl: null,
    color: 'bg-teal-600',
    tags: ['Free entry', 'B2'],
    costDisplay: '$15 + optional market purchases',
    costBreakdown: '($15 Roam fee + $0 venue fee + optional purchases)',
    stripeLink: 'https://buy.stripe.com/00w00jcuv88fdBY0qBc3m0a'
  },
  {
    id: 6,
    date: 'WED MAY 14',
    day: 14,
    time: '12:00 PM',
    category: 'DINING',
    level: 'B1–B2',
    levelLabel: 'Intermediate',
    title: 'The Stoplight Game',
    venue: 'Bar Cento',
    address: '1948 W 25th St, Ohio City',
    venueUrl: 'https://www.biermarkt.com/bar-cento/',
    grammarFocus: { B1: 'Past continuous + interruption: I was talking when...', B2: 'Stoplight Game practice' },
    vocabulary: 'Italian cuisine, polished ordering, expressions for interruption',
    duration: 2,
    roamFee: 19,
    entryFeeOhio: 0,
    entryFeeNonOhio: 0,
    additionalCosts: 'Lunch: $18–$30',
    menuUrl: 'https://www.yelp.com/menu/bar-cento-cleveland',
    color: 'bg-amber-600',
    tags: ['Dining', 'B1–B2'],
    costDisplay: '$19 + lunch purchase',
    costBreakdown: '($19 Roam fee + $0 venue fee + $18–$30 lunch)',
    stripeLink: 'https://buy.stripe.com/eVqdR9gKL3RZapMb5fc3m0b'
  },
  {
    id: 7,
    date: 'WED MAY 21',
    day: 21,
    time: '12:30 PM',
    category: 'DINING',
    level: 'C1',
    levelLabel: 'Advanced & Business',
    title: 'Professional Lunch',
    venue: 'Greenhouse Tavern',
    address: '2038 E 4th St, Downtown Cleveland',
    venueUrl: 'http://www.greenhousetaverns.com/',
    grammarFocus: { C1: 'Hedging and professional register, Networking simulation: introductions and small talk' },
    vocabulary: 'Professional small talk, networking, upscale menu vocabulary',
    duration: 2,
    roamFee: 19,
    entryFeeOhio: 0,
    entryFeeNonOhio: 0,
    additionalCosts: 'Lunch: $20–$40',
    menuUrl: 'http://places.singleplatform.com/the-greenhouse-tavern/menu',
    color: 'bg-violet-700',
    tags: ['Dining', 'C1'],
    costDisplay: '$19 + lunch purchase',
    costBreakdown: '($19 Roam fee + $0 venue fee + $20–$40 lunch)',
    stripeLink: 'https://buy.stripe.com/dRm28r1PR3RZ8hE4GRc3m0c'
  }
];

// Fee Warning Dialog Component
function FeeWarningDialog({ isOpen, onClose, onAgree, eventTitle }: { isOpen: boolean; onClose: () => void; onAgree: () => void; eventTitle: string }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full">
        <div className="text-center">
          <div className="text-5xl mb-4">💰</div>
          <h2 className="text-2xl font-serif text-[#5a3d2a] mb-4">Please Read Before Booking</h2>
          <p className="text-[#8b6b5c] mb-4">
            <strong>{eventTitle}</strong> has the following fee structure:
          </p>
          <div className="bg-[#f5ebe5] rounded-xl p-4 mb-6 text-left">
            <ul className="space-y-2 text-[#5a3d2a]">
              <li>• <strong>Roam Session Fee:</strong> Paid to your teacher</li>
              <li>• <strong>Venue Fee:</strong> May apply (check event details)</li>
              <li>• <strong>On-site Purchases:</strong> Coffee, lunch, tickets, etc.</li>
            </ul>
          </div>
          <p className="text-[#8b6b5c] mb-6 text-sm">
            This allows us to be transparent about our fees while still compensating the teacher. 
            The teacher will be available to assist with completing transactions upon request.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full border border-[#d4867a] text-[#d4867a] hover:bg-[#f5ebe5] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onAgree}
              className="px-6 py-3 rounded-full bg-[#d4867a] text-white hover:bg-[#c2756a] transition-colors"
            >
              I Understand, Continue to Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [calendarFilter, setCalendarFilter] = useState<string>('all');
  const [listFilter, setListFilter] = useState<string>('all');
  const [warningOpen, setWarningOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof eventsData[0] | null>(null);

  const levelFilters = [
    { id: 'all', label: 'All Levels' },
    { id: 'A1-A2', label: 'Beginner (A1–A2)' },
    { id: 'B1-B2', label: 'Intermediate (B1–B2)' },
    { id: 'C1', label: 'Advanced (C1)' },
  ];

  const listFilters = [
    { id: 'all', label: 'All events' },
    { id: 'free', label: '💚 Under $20' },
    { id: 'dining', label: '🍴 Dining' },
    { id: 'A1-A2', label: 'Beginner (A1–A2)' },
    { id: 'B1-B2', label: 'Intermediate (B1–B2)' },
    { id: 'C1', label: 'Advanced / Business' },
  ];

  // Filter events for calendar based on level
  const calendarEvents = eventsData.filter(event => {
    if (calendarFilter === 'all') return true;
    if (calendarFilter === 'A1-A2') return event.level === 'A1–A2';
    if (calendarFilter === 'B1-B2') return event.level === 'B1–B2' || event.level === 'B2';
    if (calendarFilter === 'C1') return event.level === 'C1';
    return true;
  });

  // Filter events for list
  const filteredEvents = eventsData.filter(event => {
    if (listFilter === 'all') return true;
    if (listFilter === 'free') return event.entryFeeOhio === 0 && event.entryFeeNonOhio === 0;
    if (listFilter === 'dining') return event.category === 'DINING';
    if (listFilter === 'A1-A2') return event.level === 'A1–A2';
    if (listFilter === 'B1-B2') return event.level === 'B1–B2' || event.level === 'B2';
    if (listFilter === 'C1') return event.level === 'C1';
    return true;
  });

  // Get event for a specific day
  const getEventForDay = (day: number) => {
    return calendarEvents.find(e => e.day === day);
  };

  const handleBookClick = (event: typeof eventsData[0]) => {
    setSelectedEvent(event);
    setWarningOpen(true);
  };

  const handleAgree = () => {
    setWarningOpen(false);
    if (selectedEvent?.stripeLink) {
      window.open(selectedEvent.stripeLink, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6f3] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-white rounded-full px-4 py-2 text-sm text-[#d4867a] mb-4 border border-[#d4867a]/20">
            UPCOMING EVENTS
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#5a3d2a] mb-4">Field trips and events</h1>
          <p className="text-[#8b6b5c] max-w-2xl mx-auto">
            One optional outing per group per month, Monday through Wednesday. 
            First 10 minutes: grammar review. The rest: real English in the real world.
          </p>
        </div>

        {/* ===== CALENDAR SECTION ===== */}
        <div className="bg-white rounded-3xl p-6 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h2 className="text-xl font-medium text-[#5a3d2a]">May 2025 Calendar</h2>
            
            {/* Calendar Level Filter */}
            <div className="flex flex-wrap gap-2">
              {levelFilters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setCalendarFilter(f.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    calendarFilter === f.id
                      ? 'bg-[#d4867a] text-white'
                      : 'bg-[#faf6f3] text-[#5a3d2a] hover:bg-[#f5ebe5]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-sm font-medium text-[#8b6b5c] py-2">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before May 1 (Thursday) */}
            {[...Array(4)].map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {/* Days */}
            {[...Array(31)].map((_, i) => {
              const day = i + 1;
              const event = getEventForDay(day);
              
              return (
                <div 
                  key={day} 
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm relative ${
                    event ? `${event.color} text-white cursor-pointer hover:opacity-90` : 'bg-[#faf6f3]'
                  }`}
                >
                  <span className="font-medium">{day}</span>
                  {event && (
                    <span className="text-[10px] mt-0.5 opacity-90 truncate w-full px-1">
                      {event.title.split(' ')[0]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#8b6b5c]">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-emerald-700"></span> A1–A2
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-blue-700"></span> B1–B2
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-violet-700"></span> C1
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-indigo-700"></span> All Levels
            </span>
          </div>
        </div>

        {/* ===== HOW IT WORKS SECTION ===== */}
        <div className="bg-white rounded-3xl p-8 mb-10">
          <h2 className="text-2xl font-serif text-[#5a3d2a] mb-6 text-center">How Events Work</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#d4867a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="font-medium text-[#5a3d2a] mb-2">1. Grammar Review</h3>
              <p className="text-sm text-[#8b6b5c]">
                First 10 minutes: targeted grammar review relevant to the day's setting
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#d4867a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🗣️</span>
              </div>
              <h3 className="font-medium text-[#5a3d2a] mb-2">2. Real Conversation</h3>
              <p className="text-sm text-[#8b6b5c]">
                Relaxed conversation, vocabulary building, and real-world practice in authentic settings
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#d4867a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-medium text-[#5a3d2a] mb-2">3. Transparent Pricing</h3>
              <p className="text-sm text-[#8b6b5c]">
                Session fee to Roam + whatever you choose to spend at the venue. No hidden costs.
              </p>
            </div>
          </div>

          {/* What's Included */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-medium text-[#5a3d2a] mb-4 text-center">What's Included</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Pre-event grammar worksheet',
                'Guided conversation practice',
                'Vocabulary building exercises',
                'Teacher support throughout',
                'Post-event review materials',
                'Small group setting (max 8)'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[#8b6b5c]">
                  <Check className="h-4 w-4 text-[#d4867a]" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== SORTABLE EVENTS LIST ===== */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-[#5a3d2a]">Upcoming Events</h2>
          <span className="text-sm text-[#8b6b5c]">{filteredEvents.length} events</span>
        </div>

        {/* List Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {listFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setListFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                listFilter === f.id
                  ? 'bg-[#d4867a] text-white'
                  : 'bg-white text-[#5a3d2a] hover:bg-[#f5ebe5] border border-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Events list */}
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-3xl overflow-hidden">
              {/* Event header */}
              <div className={`${event.color} text-white p-6 relative`}>
                {/* Price badge in top right */}
                <div className="absolute top-4 right-4 bg-white/90 text-[#5a3d2a] px-3 py-1.5 rounded-full text-sm font-bold">
                  {event.category === 'DINING' ? `$${event.roamFee} + Lunch` : `$${event.roamFee}`}
                </div>
                <div className="text-sm opacity-90 mb-2 pr-16">
                  {event.date} · {event.time} · {event.category}
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  {event.levelLabel} ({event.level}) — {event.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {/* Venue entry tag */}
                  {event.entryFeeOhio === 0 && event.entryFeeNonOhio === 0 && (
                    <span className="bg-white/30 px-3 py-1 rounded-full text-sm">
                      {event.category === 'DINING' ? 'Free Entry' : 'Free Venue'}
                    </span>
                  )}
                  {/* Level tag */}
                  <span className="bg-white/30 px-3 py-1 rounded-full text-sm">
                    {event.level}
                  </span>
                </div>
              </div>

              {/* Event details */}
              <div className="p-6 space-y-6">
                {/* Location */}
                <div>
                  <div className="flex items-center gap-2 text-[#d4867a] mb-2">
                    <MapPin className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide">Location</span>
                  </div>
                  <a 
                    href={event.venueUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#5a3d2a] font-medium hover:text-[#d4867a] transition-colors"
                  >
                    {event.venue}
                  </a>
                  <p className="text-[#8b6b5c]">{event.address}</p>
                </div>

                {/* Grammar Focus */}
                <div>
                  <div className="flex items-center gap-2 text-[#d4867a] mb-2">
                    <span className="text-xl">🔤</span>
                    <span className="text-sm font-medium uppercase tracking-wide">Grammar Focus</span>
                  </div>
                  <div className="space-y-1">
                    {Object.entries(event.grammarFocus).map(([level, grammar]) => (
                      <p key={level} className="text-[#5a3d2a]">
                        <span className="font-bold">{level}:</span> {grammar}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Vocabulary */}
                <div>
                  <div className="flex items-center gap-2 text-[#d4867a] mb-2">
                    <span className="text-xl">📚</span>
                    <span className="text-sm font-medium uppercase tracking-wide">Vocabulary</span>
                  </div>
                  <p className="text-[#5a3d2a]">{event.vocabulary}</p>
                </div>

                {/* Costs */}
                <div>
                  <div className="flex items-center gap-2 text-[#d4867a] mb-2">
                    <span className="text-xl">💰</span>
                    <span className="text-sm font-medium uppercase tracking-wide">Costs</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#5a3d2a] font-medium">
                      {event.title} — {event.duration} hours — {event.costDisplay}
                    </p>
                    <p className="text-[#8b6b5c] text-sm">
                      {event.costBreakdown}
                    </p>
                    {event.menuUrl && (
                      <a 
                        href={event.menuUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#d4867a] underline text-sm inline-block mt-1"
                      >
                        View menu →
                      </a>
                    )}
                  </div>
                </div>

                {/* Book Button */}
                <Button 
                  onClick={() => handleBookClick(event)}
                  className="bg-[#d4867a] hover:bg-[#c2756a] text-white rounded-full w-full sm:w-auto"
                >
                  Book This Event →
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl">
            <p className="text-[#8b6b5c]">No events match your filter. Try selecting a different option.</p>
          </div>
        )}

        {/* RSVP CTA */}
        <div className="mt-12 bg-[#f5ebe5] rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-serif text-[#5a3d2a] mb-4">Questions about events?</h2>
          <p className="text-[#8b6b5c] mb-6">
            Spots are capped to keep the group small and the conversation natural. 
            Book early to secure your spot!
          </p>
          <a href="mailto:help@roamlearning.org">
            <Button className="bg-[#d4867a] hover:bg-[#c2756a] text-white rounded-full px-8 py-6 text-lg">
              Contact Us →
            </Button>
          </a>
        </div>
      </div>

      {/* Fee Warning Dialog */}
      <FeeWarningDialog 
        isOpen={warningOpen} 
        onClose={() => setWarningOpen(false)} 
        onAgree={handleAgree}
        eventTitle={selectedEvent?.title || ''}
      />
    </div>
  );
}

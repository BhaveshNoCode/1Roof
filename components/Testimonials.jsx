import Reveal from '@/components/Reveal'

// ── Customer reviews ───────────────────────────────────────────────────
// Placeholder five-star reviews shown until the Google Business Profile is
// connected. To go live, replace `reviews` with real entries and point
// GOOGLE_REVIEWS_URL at the "See all reviews" link on your Google profile.
const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=1+Roof+Furniture+Hyderabad+reviews'
const GOOGLE_RATING = '4.9'
const GOOGLE_REVIEW_COUNT = '180'

const reviews = [
  {
    name: 'Ananya Reddy',
    location: 'Jubilee Hills, Hyderabad',
    quote:
      'The craftsmanship is exceptional. Our lounge sofa feels like a bespoke piece — the finish and comfort are beyond anything we saw elsewhere.',
  },
  {
    name: 'Rahul Mehta',
    location: 'Banjara Hills, Hyderabad',
    quote:
      'From selection to delivery, the experience was effortless and premium. The team understood exactly the look we wanted for our home.',
  },
  {
    name: 'Sneha Kapoor',
    location: 'Gachibowli, Hyderabad',
    quote:
      'Every detail is thoughtfully done. The wooden bed we ordered is solid, elegant and worth every rupee. Truly luxury furniture.',
  },
  {
    name: 'Vikram Nair',
    location: 'Kondapur, Hyderabad',
    quote:
      'Outstanding quality and after-sales care. 1 Roof transformed our living room into something that genuinely turns heads.',
  },
]

function Stars() {
  return (
    <div className="flex gap-1 text-accent" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M12 3l2.09 4.9L19.5 8.4l-3.75 3.4 1.02 5.3L12 14.9 7.23 17.1l1.02-5.3L4.5 8.4l5.41-.5L12 3z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="relative py-20 md:py-28 px-6 md:px-10 bg-cream overflow-hidden">
      {/* Faint oversized serif watermark */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-4 left-1/2 -translate-x-1/2 font-display italic text-[18vw] leading-none text-accent/[0.04] whitespace-nowrap"
      >
        Reviews
      </span>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <Reveal variant="fade">
            <p className="text-xs md:text-sm text-accent tracking-[0.35em] uppercase mb-4">Loved by our clients</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display italic text-primary text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              What Our <span className="text-gold-shimmer">Customers Say</span>
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={200}>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-accent" />
              <span className="w-1.5 h-1.5 rotate-45 bg-accent" />
              <span className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-accent" />
            </div>
          </Reveal>
        </div>

        {/* Google rating badge */}
        <Reveal variant="scale" delay={120} className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-4 rounded-full bg-white border border-cream-deep shadow-soft px-6 py-3">
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
            </svg>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl text-primary leading-none">{GOOGLE_RATING}</span>
              <Stars />
            </div>
            <span className="hidden sm:inline text-sm text-muted border-l border-cream-deep pl-4">
              {GOOGLE_REVIEW_COUNT}+ Google reviews
            </span>
          </div>
        </Reveal>

        {/* Review cards */}
        <div className="grid sm:grid-cols-2 gap-6 md:gap-7">
          {reviews.map((r, i) => (
            <Reveal
              key={r.name}
              delay={i * 100}
              className="relative bg-white rounded-2xl border border-cream-deep shadow-soft p-7 md:p-9 transition-all duration-500 hover:shadow-lift hover:-translate-y-1.5 hover:border-accent/30"
            >
              <span className="absolute top-5 right-7 font-display italic text-6xl text-accent/15 leading-none select-none">”</span>
              <Stars />
              <p className="font-elegant text-xl md:text-[1.4rem] leading-relaxed text-primary/90 mt-4 mb-7">
                {r.quote}
              </p>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light text-white font-display text-lg">
                  {r.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-primary">{r.name}</p>
                  <p className="text-xs text-muted">{r.location}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal variant="fade" delay={150} className="text-center mt-12">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-primary hover:text-accent transition-colors group"
          >
            Read all reviews on Google
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

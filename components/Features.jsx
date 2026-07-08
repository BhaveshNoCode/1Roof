import Reveal from '@/components/Reveal'

const items = [
  {
    title: '15+ Years',
    text: 'Of trusted craftsmanship',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    ),
  },
  {
    title: 'Premium Materials',
    text: 'Hand-selected woods & fabrics',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 0v18m8-13.5L12 12 4 7.5" />
    ),
  },
  {
    title: '200+ Designs',
    text: 'Signature curated pieces',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M12 3l2.09 4.9L19.5 8.4l-3.75 3.4 1.02 5.3L12 14.9 7.23 17.1l1.02-5.3L4.5 8.4l5.41-.5L12 3z" />
    ),
  },
  {
    title: 'After-Sales Care',
    text: 'Dedicated 1 Roof Care',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M18 13v-2a6 6 0 0 0-12 0v2m12 0a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1v-5h1zm-12 0a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1v-5H6zm6 7h2a2 2 0 0 0 2-2" />
    ),
  },
]

export default function Features() {
  return (
    <section className="relative bg-white py-14 md:py-16 px-6">
      {/* Gold hairline framing */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
        {items.map((it, i) => (
          <Reveal
            key={it.title}
            delay={i * 90}
            className={`relative flex flex-col items-center text-center gap-3 group ${
              i !== 0 ? 'lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:h-16 lg:before:w-px lg:before:bg-gradient-to-b lg:before:from-transparent lg:before:via-accent/25 lg:before:to-transparent' : ''
            }`}
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full border border-accent/40 text-accent bg-gradient-to-b from-accent/5 to-transparent transition-all duration-500 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:shadow-gold group-hover:border-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {it.icon}
              </svg>
            </div>
            <h3 className="font-display text-xl md:text-2xl text-primary tracking-wide">{it.title}</h3>
            <p className="text-xs md:text-sm text-muted tracking-[0.12em] uppercase">{it.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

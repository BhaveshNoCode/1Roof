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
    title: 'Pan-India Delivery',
    text: 'Safe, insured shipping',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M3 7h11v8H3V7zm11 3h4l3 3v2h-7v-5zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
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
    <section className="relative bg-white/70 border-y border-accent/10 py-12 md:py-14 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {items.map((it, i) => (
          <Reveal
            key={it.title}
            delay={i * 90}
            className="flex flex-col items-center text-center gap-3 group"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full border border-accent/40 text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:shadow-gold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {it.icon}
              </svg>
            </div>
            <h3 className="font-medium text-primary tracking-wide">{it.title}</h3>
            <p className="text-sm text-muted">{it.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

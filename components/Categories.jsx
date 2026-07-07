'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { categories } from '@/data'

export default function Categories() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.reveal-up') || []

    if (typeof IntersectionObserver === 'undefined') {
      cards.forEach((card) => card.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    cards.forEach((card) => {
      observer.observe(card)
      // Reveal anything already on screen at mount (load-in + safety net).
      const rect = card.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        card.classList.add('is-visible')
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="shop-by-category"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-6 md:px-10 scroll-mt-20 md:scroll-mt-24"
    >
      {/* Faint oversized serif watermark behind the header */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute top-8 left-1/2 -translate-x-1/2 font-display italic text-[20vw] leading-none text-accent/[0.04] whitespace-nowrap"
      >
        1 Roof
      </span>

      {/* Section header */}
      <div className="relative text-center mb-14 md:mb-16">
        <p className="reveal-up text-xs md:text-sm text-accent tracking-[0.35em] uppercase mb-4">
          Shop By Category
        </p>
        <h2 className="reveal-up font-display italic text-primary text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
          Explore Our <span className="text-gold-shimmer">Range</span>
        </h2>
        <div className="reveal-up flex items-center justify-center gap-3">
          <span className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-accent" />
          <span className="w-1.5 h-1.5 rotate-45 bg-accent" />
          <span className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-accent" />
        </div>
      </div>

      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
        {categories.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/collections/${cat.slug}`}
            className="reveal-up group block"
            style={{ transitionDelay: `${(i % 5) * 90}ms` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white border border-cream-deep shadow-soft transition-all duration-500 group-hover:shadow-lift group-hover:-translate-y-1.5 group-hover:border-accent/40">
              {/* Placeholder shown until a real image is supplied */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-5xl font-semibold text-cream-deep select-none">
                  {cat.name.charAt(0)}
                </span>
              </div>
              {/* Category image — full image shown (contain), hidden gracefully if missing */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-110"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              {/* Gold wash + "View" cue that fades in on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-[11px] tracking-[0.25em] uppercase text-white">
                View
              </span>
            </div>
            <p className="mt-3.5 text-center text-sm md:text-base font-medium text-primary group-hover:text-accent transition-colors">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

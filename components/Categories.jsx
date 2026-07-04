'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { categories } from '@/data'

export default function Categories() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.reveal-up') || []
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
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 px-6 md:px-10 max-w-[1400px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-display italic text-accent text-4xl md:text-5xl lg:text-6xl leading-tight mb-3">
          Explore Our Range
        </h2>
        <p className="text-xs md:text-sm text-primary tracking-[0.3em] uppercase">Shop By Category</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
        {categories.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/collections/${cat.slug}`}
            className="reveal-up group block"
            style={{ transitionDelay: `${(i % 5) * 80}ms` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-50 border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              {/* Placeholder shown until a real image is supplied */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-semibold text-gray-300 select-none">
                  {cat.name.charAt(0)}
                </span>
              </div>
              {/* Category image — full image shown (contain), hidden gracefully if missing */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <p className="mt-3 text-center text-sm md:text-base font-medium text-primary group-hover:text-accent transition-colors">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

export default function GalleryLightbox({ images, name }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const gridRef = useRef(null)
  const isOpen = activeIndex !== null

  // Staggered scroll-reveal for the grid tiles.
  useEffect(() => {
    const tiles = gridRef.current?.querySelectorAll('[data-reveal]') || []

    if (typeof IntersectionObserver === 'undefined') {
      tiles.forEach((t) => t.setAttribute('data-visible', 'true'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    )

    tiles.forEach((t) => {
      observer.observe(t)
      const rect = t.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        t.setAttribute('data-visible', 'true')
      }
    })

    return () => observer.disconnect()
  }, [images])

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e) {
      if (e.key === 'Escape') setActiveIndex(null)
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + images.length) % images.length)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, images.length])

  return (
    <>
      <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            data-reveal="up"
            data-visible="false"
            style={{ transitionDelay: `${(i % 4) * 80}ms` }}
            onClick={() => setActiveIndex(i)}
            aria-label={`View ${name} ${i + 1} enlarged`}
            className="group relative aspect-square overflow-hidden rounded-xl bg-white border border-cream-deep shadow-soft transition-all duration-500 hover:shadow-lift hover:-translate-y-1.5 hover:border-accent/40 cursor-zoom-in"
          >
            <img
              src={src}
              alt={`${name} ${i + 1}`}
              loading={i < 8 ? 'eager' : 'lazy'}
              fetchPriority={i < 8 ? 'high' : 'auto'}
              decoding="async"
              className="absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-110"
            />
            {/* Gold wash + zoom hint on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="pointer-events-none absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.35-4.35M11 8v6M8 11h6M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10 animate-fade-in"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white/80 hover:text-white hover:border-accent hover:rotate-90 transition-all duration-300 text-2xl leading-none"
          >
            &times;
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveIndex((i) => (i - 1 + images.length) % images.length)
                }}
                aria-label="Previous image"
                className="absolute left-2 md:left-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white/80 hover:text-white hover:border-accent hover:bg-white/10 transition-all duration-300 text-3xl leading-none"
              >
                &#8249;
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveIndex((i) => (i + 1) % images.length)
                }}
                aria-label="Next image"
                className="absolute right-2 md:right-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white/80 hover:text-white hover:border-accent hover:bg-white/10 transition-all duration-300 text-3xl leading-none"
              >
                &#8250;
              </button>
            </>
          )}

          <img
            key={activeIndex}
            src={images[activeIndex]}
            alt={`${name} ${activeIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full object-contain animate-scale-in rounded"
          />

          {/* Counter */}
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-[0.25em] uppercase">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  )
}

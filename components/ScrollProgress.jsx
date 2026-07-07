'use client'

import { useEffect, useState } from 'react'

/**
 * Global scroll UX: a thin gold reading-progress bar pinned to the top of the
 * viewport, plus a back-to-top button that fades in after scrolling down.
 * Mounted once in the root layout so it appears on every page.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
      setProgress(pct)
      setShowTop(window.scrollY > 600)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-accent-dark via-accent-light to-accent-dark shadow-[0_0_10px_rgba(184,151,90,0.6)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Back to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed bottom-24 right-6 z-50 w-11 h-11 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lift backdrop-blur transition-all duration-300 hover:bg-accent hover:-translate-y-1 ${
          showTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </>
  )
}

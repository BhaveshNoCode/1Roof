'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { categories, LOGO_URL, INSTAGRAM_URL, FACEBOOK_URL } from '@/data'

// Shared brand social icons (used here and in the footer)
function InstagramIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth={1.5} />
      <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14 8.5V7c0-.83.67-1.1 1.14-1.1H17V3h-2.6C11.2 3 10.5 5.4 10.5 6.9v1.6H8.6V11h1.9v10H14v-10h2.2l.3-2.5H14z" />
    </svg>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while an overlay is open; close on Escape.
  useEffect(() => {
    const open = menuOpen || searchOpen
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen, searchOpen])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return categories
    return categories.filter((c) => c.name.toLowerCase().includes(q))
  }, [query])

  const openContactForm = () => window.dispatchEvent(new Event('open-contact-form'))

  return (
    <>
      <header
        className={`sticky top-0 z-50 animate-fade-down transition-all duration-500 ${
          scrolled
            ? 'bg-[#efe6d4]/90 backdrop-blur-xl shadow-soft'
            : 'bg-gradient-to-b from-[#f7f1e6]/95 to-[#efe6d4]/95 backdrop-blur-md'
        }`}
      >
        {/* Gold hairline accents top & bottom */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        <div
          className={`relative w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'
          }`}
        >
          {/* Left cluster: Menu · Search · Instagram · Facebook */}
          <div className="flex items-center gap-4 sm:gap-5 lg:gap-7">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="group flex items-center gap-2 text-primary hover:text-accent transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={1.6} d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              <span className="hidden md:inline text-[11px] font-semibold tracking-[0.28em] uppercase">Menu</span>
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-primary hover:text-accent transition-colors hover:scale-110 duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hidden sm:inline-flex text-primary hover:text-accent transition-colors hover:scale-110 duration-300"
            >
              <InstagramIcon />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hidden sm:inline-flex text-primary hover:text-accent transition-colors hover:scale-110 duration-300"
            >
              <FacebookIcon />
            </a>
          </div>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex-shrink-0 transition-transform duration-300 hover:scale-[1.04]">
            <img
              src={LOGO_URL}
              alt="1 Roof"
              className={`w-auto object-contain transition-all duration-500 ${scrolled ? 'h-11 md:h-14' : 'h-14 md:h-16'}`}
            />
          </Link>

          {/* Right: Contact Us CTA */}
          <div className="flex items-center">
            <button
              onClick={openContactForm}
              className="group relative inline-flex items-center gap-2 text-primary transition-colors"
            >
              {/* Icon on mobile, labelled pill on desktop */}
              <span className="md:hidden inline-flex text-primary hover:text-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
                </svg>
              </span>
              <span className="hidden md:inline-flex items-center border border-accent/60 rounded-full px-6 py-2.5 text-[11px] font-semibold tracking-[0.24em] uppercase text-primary overflow-hidden relative z-0 transition-colors duration-500 group-hover:text-white">
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-accent to-accent-light scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                Contact Us
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Left slide-in category drawer ─────────────────────────── */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-500 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <aside
          className={`absolute inset-y-0 left-0 w-[86%] max-w-sm bg-gradient-to-b from-[#f7f1e6] to-[#efe6d4] shadow-lift flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Shop by category"
        >
          <span className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent" />

          <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-accent/15">
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-accent">1 Roof</p>
              <p className="font-display italic text-2xl text-primary mt-1">Collections</p>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 text-primary hover:text-accent hover:border-accent hover:rotate-90 transition-all duration-300 text-2xl leading-none"
            >
              &times;
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: menuOpen ? `${120 + i * 35}ms` : '0ms' }}
                className={`group flex items-center justify-between rounded-lg px-4 py-3 text-primary hover:bg-white/50 transition-all duration-500 ${
                  menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-0 group-hover:w-4 h-px bg-accent transition-all duration-300" />
                  <span className="text-[15px] font-medium tracking-wide group-hover:text-accent transition-colors">{cat.name}</span>
                </span>
                <span className="text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">&rarr;</span>
              </Link>
            ))}
          </nav>

          <div className="px-7 py-5 border-t border-accent/15 flex items-center gap-5">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-primary hover:text-accent transition-colors">
              <InstagramIcon />
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-primary hover:text-accent transition-colors">
              <FacebookIcon />
            </a>
            <button
              onClick={() => {
                setMenuOpen(false)
                openContactForm()
              }}
              className="ml-auto text-[11px] font-semibold tracking-[0.24em] uppercase text-primary hover:text-accent transition-colors"
            >
              Contact Us
            </button>
          </div>
        </aside>
      </div>

      {/* ── Search overlay ────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[65] transition-opacity duration-300 ${
          searchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!searchOpen}
      >
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
        <div
          className={`relative mx-auto mt-24 w-[92%] max-w-2xl bg-gradient-to-b from-[#f7f1e6] to-[#efe6d4] rounded-2xl shadow-lift overflow-hidden transition-all duration-300 ${
            searchOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'
          }`}
        >
          <span className="block h-0.5 w-full bg-gradient-to-r from-accent to-accent-light" />
          <div className="flex items-center gap-3 px-6 py-5 border-b border-accent/15">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            {searchOpen && (
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search collections…"
                className="flex-1 bg-transparent text-primary placeholder-primary/40 text-lg focus:outline-none"
              />
            )}
            <button onClick={() => setSearchOpen(false)} aria-label="Close search" className="text-primary/60 hover:text-accent text-2xl leading-none transition-colors">
              &times;
            </button>
          </div>
          <div className="max-h-[50vh] overflow-y-auto p-3">
            {results.length === 0 ? (
              <p className="text-center text-primary/60 py-8 text-sm">No collections match “{query}”.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {results.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/collections/${cat.slug}`}
                    onClick={() => {
                      setSearchOpen(false)
                      setQuery('')
                    }}
                    className="group rounded-lg px-4 py-3 text-sm font-medium text-primary hover:bg-white/60 hover:text-accent transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { categories } from '@/data'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 animate-fade-down transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-accent/15'
          : 'bg-white/95 border-b border-gray-100'
      }`}
    >
      {/* Hairline gold accent along the very bottom edge */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div
        className={`relative w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'
        }`}
      >
        {/* Left: Shop Products + Search */}
        <div className="flex items-center gap-6 lg:gap-8">
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-primary hover:text-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>

          {/* Shop Products with dropdown */}
          <div
            className="hidden md:block relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button className="link-underline text-sm md:text-base font-medium text-primary hover:text-accent transition-colors">
              Shop Products
            </button>
            {shopOpen && (
              <div className="absolute top-full left-0 pt-4">
                <div className="bg-white/95 backdrop-blur-md shadow-lift border border-accent/10 rounded-lg min-w-[240px] py-3 z-50 animate-scale-in origin-top overflow-hidden">
                  <span className="block h-0.5 w-full bg-gradient-to-r from-accent to-accent-light" />
                  {categories.map((cat, i) => (
                    <Link
                      key={cat.slug}
                      href={`/collections/${cat.slug}`}
                      className="group flex items-center gap-2 px-5 py-2 text-sm text-primary hover:text-accent hover:bg-cream transition-colors"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-accent transition-all duration-300" />
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search */}
          <button aria-label="Search" className="link-underline flex items-center gap-2 text-primary hover:text-accent transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <span className="hidden md:inline text-sm md:text-base font-medium">Search</span>
          </button>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex-shrink-0 transition-transform duration-300 hover:scale-[1.04]">
          <img
            src="https://res.cloudinary.com/jqtn8ju7/image/upload/f_auto,q_auto/v1783123762/logo_pibrdr.png"
            alt="1 Roof"
            className={`w-auto object-contain transition-all duration-500 ${scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'}`}
          />
        </Link>

        {/* Right: Contact Us */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link
            href="/contact"
            className="link-underline hidden md:inline text-sm md:text-base font-medium text-primary hover:text-accent transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-4 max-h-[70vh] overflow-y-auto animate-fade-down">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">Shop Products</p>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className="block text-sm font-medium text-primary py-2 border-b border-gray-50 hover:text-accent hover:pl-2 transition-all duration-300"
              onClick={() => setMobileOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
          <Link href="/contact" className="block text-sm font-medium text-primary py-2 hover:text-accent hover:pl-2 transition-all duration-300" onClick={() => setMobileOpen(false)}>
            Contact Us
          </Link>
        </div>
      )}
    </header>
  )
}

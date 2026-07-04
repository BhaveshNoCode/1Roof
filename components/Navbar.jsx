'use client'

import { useState } from 'react'
import Link from 'next/link'
import { categories } from '@/data'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="relative w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between h-20 md:h-24">

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
            <button className="text-sm md:text-base font-medium text-primary hover:text-accent transition-colors">
              Shop Products
            </button>
            {shopOpen && (
              <div className="absolute top-full left-0 bg-white shadow-lg border border-gray-100 min-w-[220px] py-3 z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/collections/${cat.slug}`}
                    className="block px-5 py-2 text-sm text-primary hover:text-accent hover:bg-gray-50 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <button aria-label="Search" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <span className="hidden md:inline text-sm md:text-base font-medium">Search</span>
          </button>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex-shrink-0">
          <img src="https://res.cloudinary.com/jqtn8ju7/image/upload/f_auto,q_auto/v1783123762/logo_pibrdr.png" alt="1 Roof" className="h-16 md:h-20 w-auto object-contain" />
        </Link>

        {/* Right: Contact Us */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link
            href="/contact"
            className="hidden md:inline text-sm md:text-base font-medium text-primary hover:text-accent transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 max-h-[70vh] overflow-y-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-2">Shop Products</p>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className="block text-sm font-medium text-primary py-2 border-b border-gray-50 hover:text-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
          <Link href="/contact" className="block text-sm font-medium text-primary py-2 hover:text-accent transition-colors" onClick={() => setMobileOpen(false)}>
            Contact Us
          </Link>
        </div>
      )}
    </header>
  )
}

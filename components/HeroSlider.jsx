'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { heroSlides, heroVariant } from '@/data'

// Import Swiper styles statically so they are part of the initial CSS bundle
// and present on first paint. Importing them dynamically (inside useEffect)
// causes the slides to render unstyled/stacked until the async chunk loads.
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function HeroSlider() {
  const swiperRef = useRef(null)

  useEffect(() => {
    const initSwiper = async () => {
      const { Swiper } = await import('swiper')
      const { Navigation, Pagination, Autoplay } = await import('swiper/modules')

      if (swiperRef.current && !swiperRef.current.swiper) {
        new Swiper(swiperRef.current, {
          modules: [Navigation, Pagination, Autoplay],
          loop: true,
          autoHeight: true,
          speed: 900,
          autoplay: { delay: 5000, disableOnInteraction: false },
          pagination: { el: '.swiper-pagination', clickable: true },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        })
      }
    }
    initSwiper()
  }, [])

  return (
    <section className="relative w-full overflow-hidden animate-fade-in">
      <div ref={swiperRef} className="swiper hero-swiper">
        <div className="swiper-wrapper">
          {heroSlides.map((slide, i) => (
            <div key={i} className="swiper-slide overflow-hidden">
              <Link href={slide.link}>
                <picture>
                  {/* Mobile: taller, smart-cropped so the banner isn't squished into a thin strip */}
                  <source
                    media="(max-width: 640px)"
                    srcSet={heroVariant(slide.image, 'f_auto,q_auto,c_fill,g_auto,ar_4:5,w_800')}
                  />
                  {/* Tablet: a shorter, still smart-cropped variant */}
                  <source
                    media="(max-width: 1024px)"
                    srcSet={heroVariant(slide.image, 'f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1200')}
                  />
                  <img
                    src={slide.image}
                    alt={`Slide ${i + 1}`}
                    className="block w-full h-full object-cover aspect-[4/5] sm:aspect-video lg:aspect-auto lg:h-auto lg:object-contain"
                  />
                </picture>
              </Link>
            </div>
          ))}
        </div>
        <div className="swiper-pagination" />
        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
      </div>

      {/* Soft gradient vignette top & bottom for depth and to seat the controls */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/15 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/25 to-transparent z-10" />

      {/* Animated scroll cue */}
      <a
        href="#shop-by-category"
        aria-label="Scroll to categories"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/60 p-1">
          <span className="h-2 w-1 rounded-full bg-accent animate-bounce" />
        </span>
      </a>
    </section>
  )
}

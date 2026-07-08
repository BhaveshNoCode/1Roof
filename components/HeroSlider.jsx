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
import 'swiper/css/effect-fade'

// Smart-cropped variants per breakpoint. The source photos are mixed aspect
// ratios, so g_auto keeps the furniture centred while c_fill gives every
// slide an identical frame — no height jump between slides.
const DESKTOP = 'f_auto,q_auto,c_fill,g_auto,ar_16:9,w_1920,e_sharpen:60'
const TABLET = 'f_auto,q_auto,c_fill,g_auto,ar_3:2,w_1300'
const MOBILE = 'f_auto,q_auto,c_fill,g_auto,ar_4:5,w_820'

export default function HeroSlider() {
  const swiperRef = useRef(null)

  useEffect(() => {
    const initSwiper = async () => {
      const { Swiper } = await import('swiper')
      const { Navigation, Pagination, Autoplay, EffectFade } = await import('swiper/modules')

      if (swiperRef.current && !swiperRef.current.swiper) {
        new Swiper(swiperRef.current, {
          modules: [Navigation, Pagination, Autoplay, EffectFade],
          loop: true,
          speed: 1100,
          effect: 'fade',
          fadeEffect: { crossFade: true },
          autoplay: { delay: 5500, disableOnInteraction: false },
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
    <section className="relative w-full overflow-hidden animate-fade-in bg-primary">
      <div ref={swiperRef} className="swiper hero-swiper">
        <div className="swiper-wrapper">
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className="swiper-slide relative overflow-hidden h-[58vh] min-h-[420px] sm:h-[64vh] lg:h-[74vh] lg:max-h-[760px]"
            >
              <Link href={slide.link} className="block w-full h-full">
                <picture>
                  <source media="(max-width: 640px)" srcSet={heroVariant(slide.image, MOBILE)} />
                  <source media="(max-width: 1024px)" srcSet={heroVariant(slide.image, TABLET)} />
                  <img
                    src={heroVariant(slide.image, DESKTOP)}
                    alt={`1 Roof premium furniture ${i + 1}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    className="block w-full h-full object-cover"
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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/30 to-transparent z-10" />
    </section>
  )
}

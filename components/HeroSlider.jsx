'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { heroSlides } from '@/data'

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
          autoplay: { delay: 4000, disableOnInteraction: false },
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
    <section className="relative w-full overflow-hidden">
      <div ref={swiperRef} className="swiper">
        <div className="swiper-wrapper">
          {heroSlides.map((slide, i) => (
            <div key={i} className="swiper-slide">
              <Link href={slide.link}>
                <img
                  src={slide.image}
                  alt={`Slide ${i + 1}`}
                  className="block w-full h-auto object-contain"
                />
              </Link>
            </div>
          ))}
        </div>
        <div className="swiper-pagination" />
        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
      </div>
    </section>
  )
}

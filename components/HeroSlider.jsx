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
    </section>
  )
}

import Link from 'next/link'
import Reveal from '@/components/Reveal'

/**
 * Dark contrast band that anchors the page against all the light sections —
 * warm gold glow, elegant serif tagline (from the brand's own metadata) and
 * a fill-on-hover CTA into the category grid.
 */
export default function BrandStatement() {
  return (
    <section className="relative overflow-hidden bg-primary text-white py-24 md:py-32 px-6">
      {/* Warm radial glow */}
      <div className="pointer-events-none absolute -top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-accent/10 blur-3xl" />
      {/* Thin gold frame lines top & bottom */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      <div className="relative max-w-3xl mx-auto text-center">
        <Reveal variant="fade">
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-accent mb-6">
            Crafted for the discerning
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="font-display italic text-4xl md:text-6xl leading-tight mb-8">
            Redefine Your Spaces
          </h2>
        </Reveal>

        <Reveal variant="fade" delay={220}>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-accent" />
            <span className="w-1.5 h-1.5 rotate-45 bg-accent" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-accent" />
          </div>
        </Reveal>

        <Reveal delay={300}>
          <p className="text-gray-300 leading-relaxed max-w-xl mx-auto mb-10">
            Over 15 years of craftsmanship, premium materials and an eye for
            detail — every 1 Roof piece is made to elevate the way you live.
          </p>
        </Reveal>

        <Reveal variant="scale" delay={380}>
          <Link href="/#shop-by-category" className="btn-gold">
            Explore Collections
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

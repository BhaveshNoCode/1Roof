import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GalleryLightbox from '@/components/GalleryLightbox'
import Reveal from '@/components/Reveal'
import cloudinary from '@/lib/cloudinary'
import { categories, categoryFolders } from '@/data'

// Cache each category page (and its Cloudinary lookup) for an hour so repeat
// visits are served instantly instead of hitting the Cloudinary API every time.
export const revalidate = 3600

// Pre-render every category page at build time (Incremental Static
// Regeneration), so in production the page is already generated and navigation
// is instant instead of waiting on the Cloudinary API.
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

// Pulls the Cloudinary public_id out of a delivery URL, e.g.
// ".../upload/f_auto,q_auto/v1783136222/Image1_zxakbl.jpg" -> "Image1_zxakbl".
function publicIdFromUrl(url = '') {
  const last = url.split('/').pop() || ''
  return last.replace(/\.[a-z0-9]+$/i, '')
}

async function getCategoryImages(folder, thumbnailUrl) {
  if (!folder) return []
  const result = await cloudinary.search
    .expression(`asset_folder="${folder}"`)
    .sort_by('public_id', 'asc')
    .max_results(100)
    .execute()

  const thumbId = publicIdFromUrl(thumbnailUrl)

  return result.resources
    // Exclude the thumbnail image used on the homepage card (matched by its
    // public_id, plus a "thumbnail" name check as a fallback).
    .filter(
      (r) =>
        r.public_id !== thumbId &&
        !r.public_id.toLowerCase().includes('thumbnail')
    )
    // Serve small, aggressively-optimized images sized for a grid cell.
    .map((r) =>
      cloudinary.url(r.public_id, {
        secure: true,
        fetch_format: 'auto',
        quality: 'auto:eco',
        crop: 'limit',
        width: 500,
      })
    )
}

// Async grid — streamed inside <Suspense> so the page shell (navbar, back
// button, title) renders instantly while these images are being fetched.
async function Gallery({ slug, name, thumbnailUrl }) {
  const images = await getCategoryImages(categoryFolders[slug], thumbnailUrl)

  if (images.length === 0) {
    return <p className="text-center text-primary/70">Images coming soon.</p>
  }

  return <GalleryLightbox images={images} name={name} />
}

// Placeholder shown instantly while the gallery streams in.
function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-lg skeleton-shimmer" />
      ))}
    </div>
  )
}

export default function CollectionPage({ params }) {
  const category = categories.find((c) => c.slug === params.slug)
  if (!category) notFound()

  return (
    <main>
      <Navbar />
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <Link
          href="/#shop-by-category"
          className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors mb-10"
        >
          <span aria-hidden className="text-lg leading-none transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
          Back to Home
        </Link>

        {/* Animated header */}
        <div className="text-center mb-14">
          <Reveal variant="fade">
            <p className="text-xs md:text-sm text-accent tracking-[0.35em] uppercase mb-4">
              1 Roof Collection
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display italic text-primary text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              {category.name}
            </h1>
          </Reveal>
          <Reveal variant="fade" delay={200}>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-accent" />
              <span className="w-1.5 h-1.5 rotate-45 bg-accent" />
              <span className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-accent" />
            </div>
          </Reveal>
        </div>

        <Suspense fallback={<GallerySkeleton />}>
          <Gallery
            slug={params.slug}
            name={category.name}
            thumbnailUrl={category.image}
          />
        </Suspense>
      </section>
      <Footer />
    </main>
  )
}

import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
      {images.map((src, i) => (
        <div
          key={src}
          className="group relative aspect-square overflow-hidden rounded-lg bg-gray-50 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <img
            src={src}
            alt={`${name} ${i + 1}`}
            // Eager-load the first visible row so it arrives with the page;
            // lazy-load the rest as the user scrolls.
            loading={i < 8 ? 'eager' : 'lazy'}
            fetchPriority={i < 8 ? 'high' : 'auto'}
            decoding="async"
            className="absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  )
}

// Placeholder shown instantly while the gallery streams in.
function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-lg bg-gray-100 animate-pulse" />
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
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors mb-8"
        >
          <span aria-hidden className="text-lg leading-none">&larr;</span>
          Back to Home
        </Link>

        <h1 className="font-display italic text-accent text-4xl md:text-5xl lg:text-6xl leading-tight mb-12 text-center">
          {category.name}
        </h1>

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

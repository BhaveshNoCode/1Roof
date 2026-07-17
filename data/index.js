const CLOUDINARY_BASE = 'https://res.cloudinary.com/jqtn8ju7/image/upload/f_auto,q_auto'
const CLOUDINARY_THUMB = 'https://res.cloudinary.com/jqtn8ju7/image/upload/f_auto,q_auto,c_limit,w_800,h_800'

// ── Brand assets & contact ─────────────────────────────────────────────
// New black & gold "1 ROOF" logo. Delivered as a PNG with the white JPG
// background knocked out (e_make_transparent) so it sits cleanly on the
// champagne navbar. The full lockup is used in the navbar; the roof emblem
// alone is the favicon (see app/icon.png).
export const LOGO_URL =
  'https://res.cloudinary.com/jqtn8ju7/image/upload/e_make_transparent:12/f_png,q_auto/v1783484052/Company_Logo_hlibqn.jpg'

export const WHATSAPP_NUMBER = '919052583002'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

// Public contact numbers, surfaced in the footer's "Let's Talk" column.
export const PHONE_NUMBERS = [
  { label: 'Customer Support', number: '+91 9052583002' },
  { label: 'Services', number: '+91 7995962525' },
]
export const INSTAGRAM_URL =
  'https://www.instagram.com/aamir_1roof?utm_source=qr&igsh=MWR2cWl4em1meXcxaA%3D%3D'
export const FACEBOOK_URL =
  'https://www.facebook.com/people/Mohd-Aamir/pfbid0HxoGQCvfpsqkvETDAp9WLQqEJn8rjzniCUGLNihguUzfTEisTrjnXN5RfqCDrz7ml/?rdid=CgJscbUfGWPFXkVJ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BNwq3KpwQ%2F'

// Re-crops a full-size hero image for a given Cloudinary transformation, so
// each breakpoint gets a smart-cropped variant sized for its container
// instead of the same photo squished to fit.
export function heroVariant(url, transform) {
  return url.replace('/upload/', `/upload/${transform}/`)
}

// New hero photography (uploaded to the Cloudinary "hero" folder). Stored as
// raw versioned URLs; HeroSlider inserts a smart-crop transform per breakpoint.
export const heroSlides = [
  { image: 'https://res.cloudinary.com/jqtn8ju7/image/upload/v1783480188/image5_auo3ax.jpg', link: '/#shop-by-category' },
  { image: 'https://res.cloudinary.com/jqtn8ju7/image/upload/v1783480048/image8_mz1y76.jpg', link: '/#shop-by-category' },
  { image: 'https://res.cloudinary.com/jqtn8ju7/image/upload/v1783479852/image6_t1kwv6.jpg', link: '/#shop-by-category' },
  { image: 'https://res.cloudinary.com/jqtn8ju7/image/upload/v1783480294/image7_frtldw.jpg', link: '/#shop-by-category' },
]

export const categories = [
  { name: 'Accent Chair', slug: 'accent-chair', image: `${CLOUDINARY_THUMB}/v1783136132/image1_xmvjcm.jpg` },
  { name: 'Bed Side Table', slug: 'bed-side-table', image: '/images/categories/bed-side-table.webp' },
  { name: 'Beds', slug: 'beds', image: `${CLOUDINARY_THUMB}/v1783136222/Image1_zxakbl.jpg` },
  { name: 'Center Table', slug: 'center-table', image: '/images/categories/center-table.webp' },
  { name: 'Chase', slug: 'chase', image: `${CLOUDINARY_THUMB}/v1783391430/image1_asdjbd.jpg` },
  { name: 'Console Table', slug: 'console-table', image: '/images/categories/console-table.webp' },
  { name: 'Dining Tables', slug: 'dining-tables', image: `${CLOUDINARY_THUMB}/v1783391766/image9_rchia4.jpg` },
  { name: 'Dining Chairs', slug: 'dining-chairs', image: `${CLOUDINARY_THUMB}/v1783136283/image3_oc1glw.png` },
  { name: 'Lounger Sofa', slug: 'lounger-sofa', image: `${CLOUDINARY_THUMB}/v1783136358/image1_d9smjx.jpg` },
  { name: 'Recliners', slug: 'recliners', image: `${CLOUDINARY_THUMB}/v1784263564/image1_vyhtwq.jpg` },
  { name: 'Sofa', slug: 'sofa', image: `${CLOUDINARY_THUMB}/v1783136421/image2_svukp5.jpg` },
  { name: 'Sofa Cum Bed', slug: 'sofa-cum-bed', image: '/images/categories/sofa-cum-bed.webp' },
  { name: 'Sofa-Slide Table', slug: 'sofa-slide-table', image: '/images/categories/sofa-slide-table.webp' },
  { name: 'Wooden Beds', slug: 'wooden-beds', image: `${CLOUDINARY_THUMB}/v1783478940/image6_p2pcdx.jpg` },
  { name: 'Wooden Sofa', slug: 'wooden-sofa', image: '/images/categories/wooden-sofa.webp' },
]

// Maps a category slug to its Cloudinary asset folder, for categories whose
// full product galleries have been uploaded so far.
export const categoryFolders = {
  'accent-chair': 'categories/accent chairs',
  beds: 'categories/beds',
  chase: 'categories/chase',
  'dining-chairs': 'categories/dining chairs',
  'dining-tables': 'categories/dining tables',
  'lounger-sofa': 'categories/lounger sofa',
  recliners: 'categories/recliners',
  sofa: 'categories/sofa',
  'wooden-beds': 'categories/wooden beds',
}

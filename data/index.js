const CLOUDINARY_BASE = 'https://res.cloudinary.com/jqtn8ju7/image/upload/f_auto,q_auto'
const CLOUDINARY_THUMB = 'https://res.cloudinary.com/jqtn8ju7/image/upload/f_auto,q_auto,c_limit,w_800,h_800'

// Re-crops a full-size hero banner URL for a given transformation, so mobile
// and tablet can get a taller, smart-cropped version instead of the same
// wide banner squished down to a thin strip.
export function heroVariant(url, transform) {
  return url.replace('/upload/f_auto,q_auto/', `/upload/${transform}/`)
}

export const heroSlides = [
  { image: `${CLOUDINARY_BASE}/v1783123815/Slide1_oumpnb.webp`, link: '/' },
  { image: `${CLOUDINARY_BASE}/v1783123816/Slide2_w7azrt.webp`, link: '/' },
  { image: `${CLOUDINARY_BASE}/v1783123818/Slide3_kfwbzl.webp`, link: '/' },
  { image: `${CLOUDINARY_BASE}/v1783123820/Slide4_n7qvno.webp`, link: '/' },
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
  { name: 'Recliners', slug: 'recliners', image: '/images/categories/recliners.webp' },
  { name: 'Sofa', slug: 'sofa', image: `${CLOUDINARY_THUMB}/v1783136421/image2_svukp5.jpg` },
  { name: 'Sofa Cum Bed', slug: 'sofa-cum-bed', image: '/images/categories/sofa-cum-bed.webp' },
  { name: 'Side-Side Table', slug: 'side-side-table', image: '/images/categories/side-side-table.webp' },
  { name: 'Wooden Beds', slug: 'wooden-beds', image: '/images/categories/wooden-beds.webp' },
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
  sofa: 'categories/sofa',
}

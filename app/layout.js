import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'
import ContactWidget from '@/components/ContactWidget'

export const metadata = {
  title: '1Roof | Premium & Luxury Furniture Store | Hyderabad',
  description:
    'Premium & Luxury Furniture Store based in Hyderabad, with an industry experience of more than 15 years. Redefine your Spaces with 1Roof\'s Premium Range of Furniture.',
  keywords: 'luxury furniture, premium furniture, Hyderabad furniture store, sofa, bed, dining table',
  openGraph: {
    title: '1Roof | Premium & Luxury Furniture Store',
    description: 'Redefine your spaces with 1Roof\'s Premium Range of Furniture.',
    url: 'https://bontrue.in',
    siteName: '1Roof',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Open the connection to Cloudinary early so images start faster. */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* If JS is disabled, reveal all scroll-animated content immediately. */}
        <noscript>
          <style>{`[data-reveal],.reveal-up{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <ScrollProgress />
        {children}
        <ContactWidget />
      </body>
    </html>
  )
}

import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}

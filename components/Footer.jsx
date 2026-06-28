import Link from 'next/link'

// Central WhatsApp contact — used by both the social link and the floating button
const WHATSAPP_URL = 'https://wa.me/919052583002'

const footerLinks = {
  SHOP: [
    { label: 'Sofas', href: '/collections/sofa' },
    { label: 'Recliners', href: '/collections/recliners' },
    { label: 'Beds', href: '/collections/beds' },
    { label: 'Dining', href: '/collections/dining' },
    { label: 'Tables', href: '/collections/center-table' },
    { label: 'Chairs', href: '/collections/accent-chair' },
  ],
  ABOUT: [
    { label: 'About Us', href: '/about' },
    { label: 'Boncare', href: '/boncare' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Career', href: '/careers' },
    { label: 'Blogs', href: '/blogs' },
  ],
  POLICIES: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: '1 Roof Policies', href: '/policies' },
  ],
  'MANUFACTURING PLANT': [
    { label: 'Moosapet', href: '/stores/moosapet' },
    { label: 'Kompally', href: '/stores/kompally' },
  ],
}

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/bontruefurniture/', icon: 'IG' },
  { label: 'Facebook', href: 'https://facebook.com/bontrue', icon: 'FB' },
  { label: 'WhatsApp', href: WHATSAPP_URL, icon: 'WA' },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold tracking-wider mb-5 text-accent break-words">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-serif text-xl tracking-widest">1 ROOF</span>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socialLinks.map((s) => (
              <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 border border-gray-600 flex items-center justify-center text-xs text-gray-400 hover:border-accent hover:text-accent transition-colors"
                aria-label={s.label}
              >
                {s.icon}
              </Link>
            ))}
          </div>

          <p className="text-xs text-gray-500">© 2026 1 Roof Furniture. All rights reserved.</p>
        </div>
      </div>

      {/* WhatsApp Button */}
      <Link
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors z-50"
        aria-label="WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </Link>
    </footer>
  )
}

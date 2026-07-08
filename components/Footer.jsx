import Link from 'next/link'
import { categories, INSTAGRAM_URL, FACEBOOK_URL } from '@/data'
import ContactLink from '@/components/ContactLink'

const shopLinks = categories.map((c) => ({ label: c.name, href: `/collections/${c.slug}` }))

// Shop is split across two columns (8 + 7) so the footer isn't one long list.
const footerColumns = [
  { title: 'SHOP', links: shopLinks.slice(0, 8) },
  { title: 'SHOP', links: shopLinks.slice(8) },
  {
    title: 'ABOUT',
    links: [
      { label: 'About Us', href: '/about' },
      { label: '1 Roof Care', href: '/1-roof-care' },
      { label: 'Contact Us', action: 'contact' },
      { label: 'Career', href: '/careers' },
      { label: 'Blogs', href: '/blogs' },
    ],
  },
  {
    title: 'POLICIES',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: '1 Roof Policies', href: '/policies' },
    ],
  },
  {
    title: 'MANUFACTURING PLANT',
    links: [
      { label: 'Moosapet', href: '/stores/moosapet' },
      { label: 'Kompally', href: '/stores/kompally' },
    ],
  },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: INSTAGRAM_URL,
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth={1.5} fill="none" stroke="currentColor" />
        <circle cx="12" cy="12" r="4" strokeWidth={1.5} fill="none" stroke="currentColor" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
      </>
    ),
  },
  {
    label: 'Facebook',
    href: FACEBOOK_URL,
    icon: (
      <path fill="currentColor" d="M14 8.5V7c0-.83.67-1.1 1.14-1.1H17V3h-2.6C11.2 3 10.5 5.4 10.5 6.9v1.6H8.6V11h1.9v10H14v-10h2.2l.3-2.5H14z" />
    ),
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-primary text-white pt-16 pb-8 px-4">
      {/* Gold gradient top accent */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
          {footerColumns.map((col, i) => (
            <div key={`${col.title}-${i}`}>
              <h4 className="text-xs font-semibold tracking-wider mb-5 text-accent break-words">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.action === 'contact' ? (
                      <ContactLink className="group inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
                        <span className="w-0 group-hover:w-3 h-px bg-accent transition-all duration-300" />
                        {link.label}
                      </ContactLink>
                    ) : (
                      <Link href={link.href} className="group inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
                        <span className="w-0 group-hover:w-3 h-px bg-accent transition-all duration-300" />
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display italic text-2xl tracking-widest text-gold-shimmer">1 ROOF</span>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socialLinks.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:border-accent hover:text-white hover:bg-accent hover:-translate-y-0.5 transition-all duration-300"
                aria-label={s.label}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
                  {s.icon}
                </svg>
              </Link>
            ))}
          </div>

          <p className="text-xs text-gray-500">© 2026 1 Roof Furniture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

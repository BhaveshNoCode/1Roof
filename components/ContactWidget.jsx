'use client'

import { useEffect, useState } from 'react'
import { WHATSAPP_URL } from '@/data'

function WhatsAppGlyph({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const EMPTY = { name: '', email: '', mobile: '', city: '', note: '' }

export default function ContactWidget() {
  const [open, setOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  // Allow "Contact Us" links elsewhere (navbar, footer) to open the form.
  useEffect(() => {
    const openForm = () => {
      setOpen(false)
      setSubmitted(false)
      setFormOpen(true)
    }
    window.addEventListener('open-contact-form', openForm)
    return () => window.removeEventListener('open-contact-form', openForm)
  }, [])

  useEffect(() => {
    document.body.style.overflow = formOpen ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setFormOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [formOpen])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const err = {}
    if (!form.name.trim()) err.name = 'Please enter your name'
    if (!form.mobile.trim() || form.mobile.replace(/\D/g, '').length < 7)
      err.mobile = 'Please enter a valid mobile number'
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = 'Please enter a valid email'
    if (!form.city.trim()) err.city = 'Please enter your city'
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    // Deliver the lead to the business via WhatsApp (no email backend yet).
    const lines = [
      'New enquiry from the 1 Roof website',
      '',
      `Name: ${form.name}`,
      form.email && `Email: ${form.email}`,
      `Mobile: ${form.mobile}`,
      `City: ${form.city}`,
      form.note && `Note: ${form.note}`,
    ].filter(Boolean)
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener')

    setSubmitted(true)
    setForm(EMPTY)
    setErrors({})
  }

  const fields = [
    { k: 'name', label: 'Name', type: 'text', placeholder: 'Your full name', required: true },
    { k: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com', required: false },
    { k: 'mobile', label: 'Mobile Number', type: 'tel', placeholder: '+91 98765 43210', required: true },
    { k: 'city', label: 'City', type: 'text', placeholder: 'e.g. Hyderabad', required: true },
  ]

  return (
    <>
      {/* ── Floating widget ─────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* WhatsApp action */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className={`group flex items-center gap-3 transition-all duration-300 ${
            open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          style={{ transitionDelay: open ? '120ms' : '0ms' }}
        >
          <span className="rounded-full bg-primary/90 text-white text-xs font-medium tracking-wide px-3 py-1.5 shadow-lift backdrop-blur">
            WhatsApp
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 group-hover:scale-110">
            <WhatsAppGlyph className="w-6 h-6" />
          </span>
        </a>

        {/* Contact form action */}
        <button
          onClick={() => {
            setOpen(false)
            setSubmitted(false)
            setFormOpen(true)
          }}
          aria-label="Open contact form"
          className={`group flex items-center gap-3 transition-all duration-300 ${
            open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          style={{ transitionDelay: open ? '60ms' : '0ms' }}
        >
          <span className="rounded-full bg-primary/90 text-white text-xs font-medium tracking-wide px-3 py-1.5 shadow-lift backdrop-blur">
            Contact Form
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-accent border border-accent/30 shadow-lift transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5h16v11H7l-3 3V5z" />
              <path strokeLinecap="round" strokeWidth={1.5} d="M8 9h8M8 12.5h5" />
            </svg>
          </span>
        </button>

        {/* Main FAB */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close contact menu' : 'Open contact menu'}
          aria-expanded={open}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-dark via-accent to-accent-light text-white shadow-gold transition-all duration-300 hover:scale-105"
        >
          {!open && (
            <span className="absolute inset-0 rounded-full bg-accent/50 animate-ping [animation-duration:2.8s]" />
          )}
          <span className={`relative transition-all duration-300 ${open ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9 9 0 0 1-3.8-.8L3 21l1.9-5.2A8.5 8.5 0 1 1 21 11.5z" />
            </svg>
          </span>
          <span className={`absolute transition-all duration-300 ${open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 6l12 12M18 6L6 18" />
            </svg>
          </span>
        </button>
      </div>

      {/* ── Contact form modal ──────────────────────────────────── */}
      {formOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setFormOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Contact form"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-gradient-to-b from-white to-cream rounded-2xl shadow-lift overflow-hidden animate-scale-in max-h-[92vh] overflow-y-auto"
          >
            <span className="block h-1 w-full bg-gradient-to-r from-accent-dark via-accent-light to-accent-dark" />

            <button
              onClick={() => setFormOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 text-primary/70 hover:text-accent hover:border-accent hover:rotate-90 transition-all duration-300 text-xl leading-none"
            >
              &times;
            </button>

            {submitted ? (
              <div className="px-8 py-14 text-center">
                <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <h3 className="font-display italic text-3xl text-primary mb-3">Thank You</h3>
                <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto">
                  Your enquiry has been sent. Our team will reach out to you shortly.
                </p>
                <button
                  onClick={() => setFormOpen(false)}
                  className="mt-8 btn-gold"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="px-7 pt-8 pb-8">
                <p className="text-[11px] tracking-[0.32em] uppercase text-accent text-center mb-2">Get in touch</p>
                <h3 className="font-display italic text-3xl text-primary text-center mb-1">Contact Us</h3>
                <p className="text-center text-xs text-muted mb-6">We usually respond within a few hours.</p>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {fields.map((f) => (
                    <div key={f.k}>
                      <label htmlFor={`cf-${f.k}`} className="block text-xs font-medium tracking-wide text-primary/80 mb-1.5">
                        {f.label} {f.required && <span className="text-accent">*</span>}
                      </label>
                      <input
                        id={`cf-${f.k}`}
                        type={f.type}
                        value={form[f.k]}
                        onChange={set(f.k)}
                        placeholder={f.placeholder}
                        className={`w-full rounded-lg border bg-white/70 px-4 py-2.5 text-sm text-primary placeholder-primary/35 transition-all focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent ${
                          errors[f.k] ? 'border-red-400' : 'border-cream-deep'
                        }`}
                      />
                      {errors[f.k] && <p className="mt-1 text-xs text-red-500">{errors[f.k]}</p>}
                    </div>
                  ))}

                  <div>
                    <label htmlFor="cf-note" className="block text-xs font-medium tracking-wide text-primary/80 mb-1.5">
                      Write a Note
                    </label>
                    <textarea
                      id="cf-note"
                      rows={3}
                      value={form.note}
                      onChange={set('note')}
                      placeholder="Tell us what you're looking for…"
                      className="w-full rounded-lg border border-cream-deep bg-white/70 px-4 py-2.5 text-sm text-primary placeholder-primary/35 transition-all focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-lg bg-primary text-white py-3.5 text-[12px] font-semibold tracking-[0.2em] uppercase transition-colors duration-500 hover:text-primary z-0"
                  >
                    <span className="absolute inset-0 -z-10 bg-gradient-to-r from-accent to-accent-light scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                    Submit Enquiry
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

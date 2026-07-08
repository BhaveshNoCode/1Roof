'use client'

// Small client island so the (server-rendered) footer can open the contact
// form modal, which lives in the globally-mounted ContactWidget.
export default function ContactLink({ className = '', children }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('open-contact-form'))}
      className={className}
    >
      {children}
    </button>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-triggered reveal wrapper. Children start hidden/offset (via the
 * [data-reveal] CSS in globals.css) and animate in once they enter the
 * viewport. Respects prefers-reduced-motion (handled in CSS).
 *
 * Props:
 *  - variant: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade' | 'blur'
 *  - delay:   ms delay before the transition starts (for stagger)
 *  - as:      element/component to render (default 'div')
 *  - once:    reveal only the first time (default true)
 */
export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  as: Tag = 'div',
  className = '',
  once = true,
  threshold = 0.15,
  style,
  ...rest
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No IntersectionObserver support → reveal immediately, never hide content.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(el)

    // Reveal above-the-fold content on mount (a load-in animation) without
    // waiting on a scroll. Also a safety net for environments that don't emit
    // observer callbacks for already-visible elements.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true)
    }

    return () => observer.disconnect()
  }, [once, threshold])

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-visible={visible ? 'true' : 'false'}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

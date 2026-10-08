'use client'

import { useEffect, useRef, useState } from 'react'

export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.2,
  once = true,
  rootMargin = '0px',
}: { threshold?: number; once?: boolean; rootMargin?: string } = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once, rootMargin])

  return { ref, inView }
}

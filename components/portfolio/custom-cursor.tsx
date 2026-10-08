'use client'

import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
const TRAIL_LENGTH = 6

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: pos.x, y: pos.y }
    const trail = Array.from({ length: TRAIL_LENGTH }, () => ({ x: pos.x, y: pos.y }))
    let hovered: Element | null = null
    let visible = false

    const spawnParticles = (x: number, y: number) => {
      if (reduced) return
      for (let i = 0; i < 7; i++) {
        const p = document.createElement('span')
        const angle = (Math.PI * 2 * i) / 7 + Math.random() * 0.5
        const dist = 18 + Math.random() * 18
        p.className = 'cursor-particle'
        p.style.left = `${x}px`
        p.style.top = `${y}px`
        p.style.background = i % 2 ? 'var(--neon-blue)' : 'var(--neon-purple)'
        p.style.boxShadow = '0 0 6px currentColor'
        p.style.setProperty('--tx', `${Math.cos(angle) * dist}px`)
        p.style.setProperty('--ty', `${Math.sin(angle) * dist}px`)
        p.addEventListener('animationend', () => p.remove())
        document.body.appendChild(p)
      }
    }

    const setVisible = (v: boolean) => {
      visible = v
      const o = v ? '1' : '0'
      if (dotRef.current) dotRef.current.style.opacity = o
      if (ringRef.current) ringRef.current.style.opacity = o
      trailRefs.current.forEach((t, i) => t && (t.style.opacity = v ? String(0.45 - i * 0.07) : '0'))
    }

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!visible) setVisible(true)
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
    }
    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.(INTERACTIVE) ?? null
      if (target === hovered) return
      hovered = target
      if (ringRef.current) ringRef.current.dataset.state = target ? 'hover' : 'idle'
      if (target) spawnParticles(e.clientX, e.clientY)
    }
    const onDown = () => ringRef.current && (ringRef.current.dataset.pressed = 'true')
    const onUp = () => ringRef.current && (ringRef.current.dataset.pressed = 'false')
    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerleave', onLeave)

    let raf = 0
    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.2
      ring.y += (pos.y - ring.y) * 0.2
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
      let lead = pos
      trail.forEach((t, i) => {
        t.x += (lead.x - t.x) * 0.35
        t.y += (lead.y - t.y) * 0.35
        const el = trailRefs.current[i]
        if (el) el.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) translate(-50%, -50%)`
        lead = t
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div aria-hidden="true" className="cursor-layer pointer-events-none fixed inset-0 z-[100]">
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el
          }}
          className="fixed left-0 top-0 rounded-full bg-neon-blue"
          style={{
            width: 5 - i * 0.6,
            height: 5 - i * 0.6,
            opacity: 0,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
      <div
        ref={ringRef}
        data-state="idle"
        className="cursor-ring fixed left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-neon-blue/80 opacity-0 shadow-[0_0_14px_rgb(59_164_255/0.45)]"
      >
        <span className="absolute -top-1 left-1/2 h-1.5 w-px -translate-x-1/2 bg-neon-blue" />
        <span className="absolute -bottom-1 left-1/2 h-1.5 w-px -translate-x-1/2 bg-neon-blue" />
        <span className="absolute -left-1 top-1/2 h-px w-1.5 -translate-y-1/2 bg-neon-purple" />
        <span className="absolute -right-1 top-1/2 h-px w-1.5 -translate-y-1/2 bg-neon-purple" />
      </div>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-white opacity-0 shadow-[0_0_10px_3px_rgb(59_164_255/0.9)]"
      />
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'

type Star = { x: number; y: number; z: number; px: number; py: number; hue: number }
type Mote = { x: number; y: number; vx: number; vy: number; r: number; color: number; phase: number }

const COLORS = ['59,164,255', '164,92,255', '220,225,255']

function makeGlowSprite(rgb: string) {
  const size = 64
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  grad.addColorStop(0, `rgba(${rgb},1)`)
  grad.addColorStop(0.25, `rgba(${rgb},0.5)`)
  grad.addColorStop(1, `rgba(${rgb},0)`)
  g.fillStyle = grad
  g.fillRect(0, 0, size, size)
  return c
}

export function SpaceBackground({ warp = false }: { warp?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const warpRef = useRef(warp)

  useEffect(() => {
    warpRef.current = warp
  }, [warp])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sprites = COLORS.map(makeGlowSprite)
    let w = 0
    let h = 0
    let dpr = 1
    let stars: Star[] = []
    let motes: Mote[] = []

    const resetStar = (s: Star, far = true) => {
      s.x = (Math.random() * 2 - 1) * 1.2
      s.y = (Math.random() * 2 - 1) * 1.2
      s.z = far ? 0.7 + Math.random() * 0.3 : 0.05 + Math.random() * 0.95
      s.px = NaN
      s.py = NaN
      s.hue = Math.random() < 0.6 ? 2 : Math.random() < 0.5 ? 0 : 1
      return s
    }

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const starCount = w < 768 ? 220 : 420
      stars = Array.from({ length: starCount }, () => resetStar({} as Star, false))
      const moteCount = w < 768 ? 18 : 34
      motes = Array.from({ length: moteCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.08 - Math.random() * 0.2,
        r: 6 + Math.random() * 18,
        color: Math.random() < 0.5 ? 0 : 1,
        phase: Math.random() * Math.PI * 2,
      }))
    }
    init()

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / w - 0.5
      mouse.ty = e.clientY / h - 0.5
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', init)

    let speed = 0.4
    let raf = 0
    let last = performance.now()

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3)
      last = now
      const target = warpRef.current ? 28 : reduced ? 0.05 : 0.4
      speed += (target - speed) * 0.04 * dt
      mouse.x += (mouse.tx - mouse.x) * 0.04 * dt
      mouse.y += (mouse.ty - mouse.y) * 0.04 * dt

      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2
      const k = Math.max(w, h) * 0.5

      for (const s of stars) {
        s.z -= speed * 0.0009 * dt
        if (s.z <= 0.02) resetStar(s)
        const depth = 1 - s.z
        const sx = cx + (s.x / s.z) * k * 0.35 - mouse.x * depth * 40
        const sy = cy + (s.y / s.z) * k * 0.35 - mouse.y * depth * 40
        if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) {
          resetStar(s)
          continue
        }
        const size = Math.max(0.3, depth * 2.2)
        const alpha = Math.min(1, depth * 1.4) * (0.6 + 0.4 * Math.sin(now * 0.002 + s.x * 40))
        const rgb = COLORS[s.hue]
        if (speed > 3 && !Number.isNaN(s.px)) {
          ctx.strokeStyle = `rgba(${rgb},${alpha})`
          ctx.lineWidth = size
          ctx.beginPath()
          ctx.moveTo(s.px, s.py)
          ctx.lineTo(sx, sy)
          ctx.stroke()
        } else {
          ctx.fillStyle = `rgba(${rgb},${alpha})`
          ctx.fillRect(sx, sy, size, size)
        }
        s.px = sx
        s.py = sy
      }

      for (const m of motes) {
        m.x += m.vx * dt
        m.y += m.vy * dt
        m.phase += 0.01 * dt
        if (m.y < -40) {
          m.y = h + 40
          m.x = Math.random() * w
        }
        const a = 0.25 + 0.2 * Math.sin(m.phase)
        ctx.globalAlpha = a
        const d = m.r * 2
        ctx.drawImage(sprites[m.color], m.x - m.r - mouse.x * 20, m.y - m.r - mouse.y * 20, d, d)
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute -left-1/4 -top-1/4 h-[70vmax] w-[70vmax] rounded-full bg-neon-purple/15 blur-[120px] animate-drift" />
      <div
        className="absolute -bottom-1/3 -right-1/4 h-[70vmax] w-[70vmax] rounded-full bg-neon-blue/12 blur-[140px] animate-drift"
        style={{ animationDelay: '-8s', animationDuration: '30s' }}
      />
      <div className="absolute left-1/3 top-1/3 h-[40vmax] w-[40vmax] rounded-full bg-[#5b3bff]/10 blur-[120px]" />
      <div className="bg-grid-floor opacity-40" />
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="absolute left-[8%] top-[22%] h-10 w-10 rotate-45 border border-neon-blue/30 animate-drift" style={{ animationDuration: '26s' }} />
      <div className="absolute right-[10%] top-[30%] h-16 w-16 rounded-full border border-neon-purple/25 animate-drift" style={{ animationDuration: '34s', animationDelay: '-12s' }} />
      <svg className="absolute bottom-[24%] left-[18%] h-12 w-12 text-neon-purple/30 animate-drift" style={{ animationDuration: '40s', animationDelay: '-5s' }} viewBox="0 0 40 40" fill="none">
        <polygon points="20,3 37,35 3,35" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg className="absolute right-[22%] bottom-[16%] h-14 w-14 text-neon-blue/25 animate-drift" style={{ animationDuration: '36s', animationDelay: '-18s' }} viewBox="0 0 40 40" fill="none">
        <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(4_4_10/0.85)_100%)]" />
    </div>
  )
}

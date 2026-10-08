'use client'

import { useRef } from 'react'

const FACES = [
  'rotateY(0deg)',
  'rotateY(90deg)',
  'rotateY(180deg)',
  'rotateY(-90deg)',
  'rotateX(90deg)',
  'rotateX(-90deg)',
]

export function HeroHologram() {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--tilt-x', `${-y * 18}deg`)
    el.style.setProperty('--tilt-y', `${x * 18}deg`)
  }

  const onLeave = () => {
    ref.current?.style.setProperty('--tilt-x', '0deg')
    ref.current?.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto aspect-square w-full max-w-[420px] [perspective:900px]"
    >
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        style={{ transform: 'rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))' }}
      >
        <div className="absolute inset-0 rounded-full border border-neon-blue/25 animate-spin-slow">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-0 h-2 w-px origin-[0_210px] bg-neon-blue/60"
              style={{ transform: `rotate(${i * 15}deg)` }}
            />
          ))}
        </div>
        <div className="absolute inset-[12%] rounded-full border border-dashed border-neon-purple/40 animate-spin-reverse" />
        <div className="absolute inset-[24%] rounded-full border-2 border-transparent border-t-neon-blue border-r-neon-purple/60 animate-spin-slow [animation-duration:8s]" />
        <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,rgb(124_92_255/0.35),transparent_70%)] blur-xl" />

        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 [perspective:600px]">
          <div className="relative h-full w-full animate-cube [transform-style:preserve-3d]">
            {FACES.map((f) => (
              <div
                key={f}
                className="absolute inset-0 border border-neon-blue/70 bg-neon-blue/5 shadow-[inset_0_0_30px_rgb(59_164_255/0.35)] backdrop-blur-[1px]"
                style={{ transform: `${f} translateZ(56px)` }}
              >
                <div className="absolute inset-3 border border-neon-purple/40" />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-[6%] top-[18%] glass px-3 py-2 font-mono text-[10px] text-neon-blue animate-float-y">
          {'fps: 144'}
        </div>
        <div className="absolute bottom-[14%] right-[2%] glass px-3 py-2 font-mono text-[10px] text-neon-purple animate-float-y [animation-delay:-3s]">
          {'player.Spawn()'}
        </div>
        <div className="absolute right-[8%] top-[10%] h-3 w-3 rotate-45 bg-neon-purple shadow-[0_0_14px_var(--neon-purple)] animate-float-y [animation-delay:-1.5s]" />
      </div>
    </div>
  )
}

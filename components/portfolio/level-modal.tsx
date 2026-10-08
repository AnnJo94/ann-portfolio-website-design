'use client'

import { ArrowRight, Check, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

export function LevelModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [phase, setPhase] = useState<'loading' | 'ready'>('loading')
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setPhase('ready'), 1100)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  useEffect(() => {
    if (phase === 'ready') closeRef.current?.focus()
  }, [phase])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="level-title"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md animate-in fade-in duration-300"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {phase === 'loading' ? (
        <div className="flex flex-col items-center gap-4 text-center" role="status">
          <div className="relative size-24">
            <div className="absolute inset-0 rounded-full border-2 border-neon-blue/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-neon-blue animate-spin" />
            <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-neon-purple animate-spin" style={{ animationDirection: 'reverse' }} />
          </div>
          <p className="font-display text-[10px] tracking-[0.5em] text-neon-blue">ENTERING LEVEL {project.level}</p>
          <p className="font-display text-2xl font-black uppercase tracking-[0.15em] text-white text-glow-purple sm:text-4xl">{project.name}</p>
          <div className="h-0.5 w-56 overflow-hidden bg-white/10">
            <div className="h-full origin-left bg-gradient-to-r from-neon-blue to-neon-purple" style={{ animation: 'load-bar 1s ease-out forwards' }} />
          </div>
        </div>
      ) : (
        <div className="glass hud-corners relative max-h-[90svh] w-full max-w-4xl overflow-y-auto animate-in zoom-in-90 fade-in duration-500">
          <div className="relative aspect-[21/9] w-full">
            <Image src={project.image} alt={`${project.name} gameplay artwork`} fill sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b18] via-[#0b0b18]/40 to-transparent" />
            <div aria-hidden="true" className="absolute inset-0 scanlines" />
            <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8">
              <p className="font-display text-[10px] tracking-[0.4em] text-neon-blue">LEVEL {project.level} // MISSION BRIEFING</p>
              <h3 id="level-title" className="mt-1 font-display text-3xl font-black uppercase tracking-wide text-white sm:text-5xl">
                {project.name}
              </h3>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Exit level"
              className="glass absolute right-4 top-4 flex size-10 items-center justify-center rounded-full text-white transition-all hover:border-neon-purple/60 hover:shadow-[0_0_20px_rgb(164_92_255/0.5)]"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1.3fr_1fr]">
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-display text-[10px] tracking-[0.3em] text-neon-purple">TYPE</p>
                <p className="mt-1.5 text-foreground">{project.type}</p>
              </div>
              <div>
                <p className="font-display text-[10px] tracking-[0.3em] text-neon-purple">DESCRIPTION</p>
                <p className="mt-1.5 text-pretty leading-relaxed text-muted-foreground">{project.description}</p>
              </div>
              <div>
                <p className="font-display text-[10px] tracking-[0.3em] text-neon-purple">MY ROLE</p>
                <p className="mt-1.5 leading-relaxed text-foreground">{project.role}</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-display text-[10px] tracking-[0.3em] text-neon-blue">OBJECTIVES</p>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {project.features.map((f, i) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-foreground animate-in fade-in slide-in-from-left-2" style={{ animationDelay: `${i * 90}ms`, animationFillMode: 'both' }}>
                      <span className="flex size-5 items-center justify-center border border-emerald-400/50 bg-emerald-400/10">
                        <Check className="size-3 text-emerald-300" aria-hidden="true" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-display text-[10px] tracking-[0.3em] text-neon-blue">LOADOUT</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <li key={t} className="border border-neon-blue/30 bg-neon-blue/10 px-2.5 py-1 font-mono text-xs text-white">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    'group flex w-fit items-center gap-3 border border-neon-blue/60 bg-neon-blue/15 px-6 py-3.5 font-display text-xs font-bold tracking-[0.25em] text-white clip-hud transition-all hover:bg-neon-blue/25 hover:shadow-[0_0_30px_rgb(59_164_255/0.45)]',
                  )}
                >
                  VIEW SOURCE
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body,
  )
}

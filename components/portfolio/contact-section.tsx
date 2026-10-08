'use client'

import { ArrowRight, BriefcaseBusiness, Check, Code2, Mail } from 'lucide-react'
import { useState } from 'react'
import { useInView } from '@/hooks/use-in-view'
import { CONTACT_LINKS } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'EMAIL', value: CONTACT_LINKS.email, href: `mailto:${CONTACT_LINKS.email}`, icon: Mail },
  { label: 'LINKEDIN', value: 'ann-joseph94', href: CONTACT_LINKS.linkedin, icon: BriefcaseBusiness },
  { label: 'GITHUB', value: 'AnnJo94', href: CONTACT_LINKS.github, icon: Code2 },
]

const BURST = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2
  const dist = 90 + (i % 4) * 30
  return { tx: Math.cos(angle) * dist, ty: Math.sin(angle) * dist, color: i % 2 ? 'var(--neon-blue)' : 'var(--neon-purple)', delay: (i % 3) * 40 }
})

export function ContactSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 })
  const [ready, setReady] = useState(false)
  const [burstKey, setBurstKey] = useState(0)

  const start = () => {
    setReady(true)
    setBurstKey((k) => k + 1)
    setTimeout(() => {
      window.location.href = `mailto:${CONTACT_LINKS.email}?subject=${encodeURIComponent("Let's build a game together")}`
    }, 1200)
  }

  return (
    <section id="contact" className="relative px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32">
      <div ref={ref} className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <div data-visible={inView} className="reveal flex flex-col items-center">
          <p className="font-display text-[10px] tracking-[0.5em] text-neon-blue sm:text-xs">[12] FINAL OBJECTIVE</p>
          <div className="relative mt-6">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-neon-purple/20 blur-3xl" />
            <h2 className="text-balance font-display text-5xl font-black tracking-wide text-white text-glow-blue sm:text-7xl md:text-8xl">
              MISSION
              <span className="block text-gradient">COMPLETE</span>
            </h2>
          </div>
          <div className="mt-6 flex items-center gap-3 font-display text-[10px] tracking-[0.3em] text-muted-foreground">
            <span>SCORE 999,999</span>
            <span className="h-1 w-1 rounded-full bg-neon-purple" aria-hidden="true" />
            <span>RANK S</span>
          </div>
          <p className="mt-8 text-pretty text-lg text-foreground sm:text-xl">Want to build something together?</p>
          <div className="mt-6 flex items-center gap-2">
            <span className="h-px w-8 bg-neon-blue/50" aria-hidden="true" />
            <h3 className="font-display text-sm font-bold tracking-[0.3em] text-white sm:text-base">
              CONTACT METHODS
            </h3>
            <span className="h-px w-8 bg-neon-purple/50" aria-hidden="true" />
          </div>
        </div>

        <ul className="mt-8 grid w-full gap-4 sm:grid-cols-3">
          {LINKS.map((l, i) => {
            const Icon = l.icon
            return (
              <li key={l.label} data-visible={inView} className="reveal" style={{ transitionDelay: `${0.2 + i * 0.1}s` }}>
                <a
                  href={l.href}
                  target={l.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="group glass hud-corners flex items-center gap-4 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-neon-blue/50 hover:shadow-[0_0_30px_rgb(59_164_255/0.3)]"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center border border-neon-blue/40 bg-neon-blue/10 transition-colors group-hover:bg-neon-blue/25">
                    <Icon className="size-5 text-neon-blue" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[10px] tracking-[0.3em] text-muted-foreground">{l.label}</span>
                    <span className="block truncate text-sm font-medium text-white">{l.value}</span>
                  </span>
                  <ArrowRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-white" aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="relative mt-14">
          <button
            type="button"
            onClick={start}
            className={cn(
              'group relative flex items-center gap-3 overflow-hidden border px-8 py-4 font-display text-sm font-bold tracking-[0.3em] text-white clip-hud transition-all duration-500',
              ready
                ? 'border-emerald-400/70 bg-emerald-400/15 shadow-[0_0_40px_rgb(52_211_153/0.45)]'
                : 'border-neon-blue/60 bg-neon-blue/15 hover:bg-neon-blue/25 hover:shadow-[0_0_40px_rgb(59_164_255/0.5)]',
            )}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />
            {ready ? 'LAUNCHING MISSION' : 'START A NEW PROJECT'}
            {ready ? <Check className="size-5" aria-hidden="true" /> : <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
          </button>

          {burstKey > 0 && (
            <div key={burstKey} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
              <span className="absolute left-0 top-0 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-400" style={{ animation: 'pulse-ring 0.9s ease-out forwards' }} />
              {BURST.map((p, i) => (
                <span
                  key={i}
                  className="absolute left-0 top-0 size-1.5 rounded-full"
                  style={
                    {
                      background: p.color,
                      boxShadow: `0 0 8px ${p.color}`,
                      '--tx': `${p.tx}px`,
                      '--ty': `${p.ty}px`,
                      animation: `burst 0.9s cubic-bezier(0.2,0.8,0.2,1) ${p.delay}ms forwards`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          )}
        </div>

        <p role="status" aria-live="polite" className={cn('mt-6 h-5 font-display text-xs tracking-[0.5em] transition-all duration-500', ready ? 'text-emerald-300 opacity-100' : 'opacity-0')}>
          {ready ? '> SYSTEM READY_' : ''}
        </p>

        {/* Futuristic Mission Debrief Final Footer */}
        <footer className="mt-20 flex w-full flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 font-display text-[9px] tracking-[0.3em] text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>ANN.EXE // ONLINE // LATENCY 14MS</span>
          </div>
          <span>© {new Date().getFullYear()} ANN — GAME DEVELOPER</span>
          <span className="text-neon-purple text-glow-purple">THANKS FOR PLAYING</span>
        </footer>
      </div>
    </section>
  )
}

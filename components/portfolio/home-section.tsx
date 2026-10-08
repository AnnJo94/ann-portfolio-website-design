'use client'

import { ArrowRight, ChevronDown } from 'lucide-react'
import type { NavId } from '@/lib/portfolio-data'
import { HeroHologram } from './hero-hologram'

const STATS = [
  { label: 'CLASS', value: 'Game Dev' },
  { label: 'ENGINE', value: 'Unity' },
  { label: 'LANGUAGES', value: 'C++ / C#' },
  { label: 'STATUS', value: 'Leveling Up' },
]

export function HomeSection({ onNavigate }: { onNavigate: (id: NavId) => void }) {
  return (
    <section id="home" className="relative flex min-h-svh items-center px-6 pb-24 pt-28 md:px-10">
      <div className="pointer-events-auto absolute right-[4%] top-1/2 hidden w-[34vw] max-w-[420px] -translate-y-1/2 animate-rise-in lg:block xl:right-[8%]" style={{ animationDelay: '0.5s' }}>
        <HeroHologram />
      </div>
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="flex max-w-3xl flex-col gap-6">
          <p className="flex items-center gap-3 font-display text-[10px] tracking-[0.4em] text-neon-blue animate-rise-in sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-blue shadow-[0_0_10px_var(--neon-blue)]" />
            PLAYER 1 READY
          </p>
          <h1 className="font-display text-5xl font-black leading-[1.05] tracking-wide text-white animate-rise-in sm:text-7xl md:text-8xl" style={{ animationDelay: '0.1s' }}>
            {"Hi, I'm "}
            <span className="text-gradient">Ann</span>
            <span className="mt-3 block text-2xl font-bold tracking-[0.25em] text-neon-purple text-glow-purple sm:text-3xl md:text-4xl">
              GAME DEVELOPER
            </span>
          </h1>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground animate-rise-in sm:text-lg" style={{ animationDelay: '0.2s' }}>
            I build gameplay systems and interactive experiences in Unity using C#. From game mechanics and player systems to complete gameplay features, I turn ideas into playable experiences and keep improving with every project.
          </p>
          <div className="flex flex-wrap gap-4 animate-rise-in" style={{ animationDelay: '0.3s' }}>
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="group flex items-center gap-3 border border-neon-blue/60 bg-neon-blue/15 px-6 py-3.5 font-display text-xs font-bold tracking-[0.25em] text-white clip-hud transition-all hover:bg-neon-blue/25 hover:shadow-[0_0_30px_rgb(59_164_255/0.45)]"
            >
              SELECT LEVEL
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="border border-white/15 px-6 py-3.5 font-display text-xs font-bold tracking-[0.25em] text-muted-foreground clip-hud transition-all hover:border-neon-purple/60 hover:text-white hover:shadow-[0_0_30px_rgb(164_92_255/0.35)]"
            >
              VIEW PROFILE
            </button>
          </div>
        </div>

        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-3 animate-rise-in sm:grid-cols-4" style={{ animationDelay: '0.45s' }}>
          {STATS.map((s) => (
            <div key={s.label} className="glass hud-corners px-4 py-3">
              <dt className="font-display text-[9px] tracking-[0.3em] text-muted-foreground">{s.label}</dt>
              <dd className="mt-1 font-display text-sm font-semibold text-white">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <button
        type="button"
        onClick={() => onNavigate('about')}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-display text-[9px] tracking-[0.4em] text-muted-foreground transition-colors hover:text-white md:bottom-8 md:flex"
      >
        SCROLL TO EXPLORE
        <ChevronDown className="size-4 animate-bounce text-neon-blue" aria-hidden="true" />
      </button>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { useInView } from '@/hooks/use-in-view'
import { SectionHeading } from './section-heading'

const PROFILE_ROWS = [
  { label: 'ROLE', values: ['Game Developer'] },
  { label: 'FOCUS', values: ['Gameplay Programming', 'Game Mechanics', 'Interactive Experiences'] },
  { label: 'CURRENTLY LEARNING', values: ['Unity', 'C#', 'Game Development'] },
  { label: 'INTERESTS', values: ['3D Games', 'Survival Games', 'Open World Games'] },
]

const ATTRIBUTES = [
  { label: 'LOGIC', value: 8 },
  { label: 'CREATIVITY', value: 9 },
  { label: 'CURIOSITY', value: 10 },
  { label: 'PERSISTENCE', value: 8 },
]

export function AboutSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section id="about" className="relative px-6 pt-24 pb-12 md:px-10 md:pt-32 md:pb-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" kicker="CHARACTER PROFILE" title="ABOUT ME" />

        <div ref={ref} className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Portrait */}
          <div data-visible={inView} className="reveal relative mx-auto aspect-square w-full max-w-[420px]">
            <div aria-hidden="true" className="absolute inset-0 rounded-full border border-dashed border-neon-blue/40 animate-spin-slow" />
            <div aria-hidden="true" className="absolute inset-[6%] rounded-full border-2 border-transparent border-r-neon-purple/70 border-t-neon-purple/70 animate-spin-reverse" style={{ animationDuration: '14s' }} />
            <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-[3%] animate-spin-slow" style={{ animationDuration: '40s' }}>
              {Array.from({ length: 36 }, (_, i) => (
                <line key={i} x1="50" y1="1" x2="50" y2={i % 3 === 0 ? 4 : 2.5} stroke="var(--neon-blue)" strokeOpacity="0.6" strokeWidth="0.4" transform={`rotate(${i * 10} 50 50)`} />
              ))}
            </svg>
            <div className="absolute inset-[13%] overflow-hidden rounded-full border border-neon-blue/50 shadow-[0_0_60px_rgb(59_164_255/0.35)]">
              <Image src="/images/me-photo.jpeg" alt="Portrait of Ann, game developer" fill sizes="(min-width: 1024px) 340px, 70vw" className="object-cover" priority />
              <div aria-hidden="true" className="absolute inset-0 scanlines" />
              <div aria-hidden="true" className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-neon-blue/20 to-transparent" style={{ animation: 'scan 3.5s linear infinite' }} />
            </div>

            <div className="glass absolute left-0 top-[12%] px-3 py-1.5 font-display text-[10px] tracking-[0.2em] text-white animate-float-y">
              LVL <span className="text-neon-blue">05</span>
            </div>
            <div className="glass absolute right-0 top-[30%] px-3 py-1.5 font-display text-[10px] tracking-[0.2em] text-white animate-float-y" style={{ animationDelay: '-2s' }}>
              CLASS: <span className="text-neon-purple">DEV</span>
            </div>
            <div className="glass absolute bottom-[10%] left-[4%] flex items-center gap-2 px-3 py-1.5 font-display text-[10px] tracking-[0.2em] text-white animate-float-y" style={{ animationDelay: '-4s' }}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              ONLINE
            </div>
          </div>

          {/* Info panel */}
          <div data-visible={inView} className="reveal glass hud-corners relative overflow-hidden p-6 sm:p-8" style={{ transitionDelay: '0.15s' }}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 scanlines opacity-40" />
            <div className="relative flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="font-display text-[10px] tracking-[0.4em] text-muted-foreground">PLAYER NAME</p>
                <h3 className="mt-1 font-display text-4xl font-black tracking-wider text-white text-glow-blue">ANN</h3>
                <p className="mt-1 font-display text-xs tracking-[0.35em] text-neon-purple">GAME DEVELOPER</p>
              </div>
              <div className="w-full max-w-[200px]">
                <div className="flex justify-between font-display text-[9px] tracking-[0.25em] text-muted-foreground">
                  <span>XP</span>
                  <span className="text-white">7,420 / 10,000</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-neon-blue to-neon-purple transition-[width] duration-[1600ms] ease-out"
                    style={{ width: inView ? '74%' : '0%' }}
                  />
                </div>
              </div>
            </div>

            <dl className="relative mt-6 flex flex-col gap-5">
              {PROFILE_ROWS.map((row, i) => (
                <div
                  key={row.label}
                  className="grid gap-2 transition-all duration-700 sm:grid-cols-[180px_1fr] sm:items-start"
                  style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-16px)', transitionDelay: `${0.3 + i * 0.12}s` }}
                >
                  <dt className="font-display text-[10px] tracking-[0.3em] text-neon-blue">{row.label}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {row.values.map((v) => (
                      <span key={v} className="border border-white/10 bg-white/5 px-2.5 py-1 text-sm text-foreground">
                        {v}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="relative mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6">
              {ATTRIBUTES.map((a, i) => (
                <div key={a.label}>
                  <div className="flex justify-between font-display text-[9px] tracking-[0.25em]">
                    <span className="text-muted-foreground">{a.label}</span>
                    <span className="text-white">{a.value}</span>
                  </div>
                  <div className="mt-1.5 flex gap-0.5" aria-hidden="true">
                    {Array.from({ length: 10 }, (_, j) => (
                      <span
                        key={j}
                        className="h-1.5 flex-1 transition-colors duration-300"
                        style={{
                          backgroundColor: inView && j < a.value ? (j < 5 ? 'var(--neon-blue)' : 'var(--neon-purple)') : 'rgb(255 255 255 / 0.08)',
                          transitionDelay: `${0.8 + i * 0.1 + j * 0.04}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

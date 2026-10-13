'use client'

import {
  ArrowRight,
  Briefcase,
  BriefcaseBusiness,
  Check,
  Code2,
  ExternalLink,
  Globe,
  Mail,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { useInView } from '@/hooks/use-in-view'
import { CONTACT_LINKS } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'EMAIL', value: CONTACT_LINKS.email, href: `mailto:${CONTACT_LINKS.email}`, icon: Mail },
  { label: 'LINKEDIN', value: 'ann-joseph94', href: CONTACT_LINKS.linkedin, icon: BriefcaseBusiness },
  { label: 'GITHUB', value: 'AnnJo94', href: CONTACT_LINKS.github, icon: Code2 },
]

function UpworkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {/* Upwork Vibrant Green Ring & Glyph */}
      <path
        fill="#14a800"
        d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.172c0 1.506-1.226 2.731-2.731 2.731s-2.731-1.225-2.731-2.731V3.492H0v7.172c0 3.012 2.451 5.463 5.463 5.463 2.628 0 4.823-1.866 5.342-4.349.529 1.464 1.341 2.946 2.428 4.195l-1.921 9.027h2.793l1.378-6.474c.959.585 2.039.919 3.078.919 3.003 0 5.438-2.435 5.438-5.438.001-3.002-2.434-5.437-5.439-5.437z"
      />
    </svg>
  )
}

function BraintrustIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {/* Braintrust Official Modern Teal & Indigo Network Hexagon mark */}
      <defs>
        <linearGradient id="braintrust-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#12d6df" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#braintrust-grad)" />
      {/* Intersecting Brain/Nodes Polygon Mark */}
      <polygon points="12 5 18 8.5 18 15.5 12 19 6 15.5 6 8.5" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.2" fill="#ffffff" />
    </svg>
  )
}

function KhamsatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {/* Khamsat Official Warm Orange circular jewel & geometric 5 mark */}
      <circle cx="12" cy="12" r="10" fill="#f39c12" />
      <circle cx="12" cy="12" r="5.5" fill="#ffffff" />
      <path d="M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" fill="#f39c12" />
    </svg>
  )
}

function NafezlyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {/* Nafezly Official Electric Blue & Cyan Shield Gradient with Lightning Mark */}
      <defs>
        <linearGradient id="nafezly-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0066ff" />
          <stop offset="100%" stopColor="#00ccff" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#nafezly-grad)" />
      <polygon points="13 4 5.5 13 11.5 13 10.5 20 18.5 11 12.5 11 13 4" fill="#ffffff" />
    </svg>
  )
}

function KafiilIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {/* Kafiil Official Vibrant Emerald & Cyan Diamond mark */}
      <defs>
        <linearGradient id="kafiil-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00b894" />
          <stop offset="100%" stopColor="#00cec9" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#kafiil-grad)" />
      {/* Handshake / Shield geometric symbol */}
      <path
        d="M8 12.5l2.5 2.5 5.5-5.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FreelanceYardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {/* FreelanceYard Official Deep Navy & Golden Orange "FY" monogram symbol */}
      <defs>
        <linearGradient id="fy-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#fy-grad)" />
      {/* F & Y clean geometric monogram */}
      <path
        d="M8 8h5M8 12h3.5M8 8v8M14 11l2 2.5 2-2.5M16 13.5v2.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const FREELANCE_PLATFORMS = [
  {
    name: 'Upwork',
    arabicName: 'Upwork',
    role: 'Global Freelance',
    href: CONTACT_LINKS.upwork,
    bgColor: 'rgba(20, 168, 0, 0.12)',
    borderColor: 'rgba(20, 168, 0, 0.4)',
    hoverShadow: '0 0 22px rgba(20, 168, 0, 0.55)',
    icon: UpworkIcon,
  },
  {
    name: 'Braintrust',
    arabicName: 'Braintrust',
    role: 'Enterprise Talent',
    href: CONTACT_LINKS.braintrust,
    bgColor: 'rgba(18, 214, 223, 0.12)',
    borderColor: 'rgba(18, 214, 223, 0.4)',
    hoverShadow: '0 0 22px rgba(18, 214, 223, 0.55)',
    icon: BraintrustIcon,
  },
  {
    name: 'FreelanceYard',
    arabicName: 'FreelanceYard',
    role: 'Creative & Tech Talent',
    href: CONTACT_LINKS.freelanceyard,
    bgColor: 'rgba(217, 119, 6, 0.12)',
    borderColor: 'rgba(217, 119, 6, 0.4)',
    hoverShadow: '0 0 22px rgba(217, 119, 6, 0.55)',
    icon: FreelanceYardIcon,
  },
  {
    name: 'Khamsat',
    arabicName: 'خمسات',
    role: 'Micro Services',
    href: CONTACT_LINKS.khamsat,
    bgColor: 'rgba(243, 156, 18, 0.12)',
    borderColor: 'rgba(243, 156, 18, 0.4)',
    hoverShadow: '0 0 22px rgba(243, 156, 18, 0.55)',
    icon: KhamsatIcon,
  },
  {
    name: 'Nafezly',
    arabicName: 'نفذلي',
    role: 'Project Contracts',
    href: CONTACT_LINKS.nafezly,
    bgColor: 'rgba(0, 153, 255, 0.12)',
    borderColor: 'rgba(0, 153, 255, 0.4)',
    hoverShadow: '0 0 22px rgba(0, 153, 255, 0.55)',
    icon: NafezlyIcon,
  },
  {
    name: 'Kafiil',
    arabicName: 'كفيل',
    role: 'Freelance & Contests',
    href: CONTACT_LINKS.kafiil,
    bgColor: 'rgba(0, 184, 148, 0.12)',
    borderColor: 'rgba(0, 184, 148, 0.4)',
    hoverShadow: '0 0 22px rgba(0, 184, 148, 0.55)',
    icon: KafiilIcon,
  },
]

const BURST = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2
  const dist = 90 + (i % 4) * 30
  return { tx: Math.cos(angle) * dist, ty: Math.sin(angle) * dist, color: i % 2 ? 'var(--neon-blue)' : 'var(--neon-purple)', delay: (i % 3) * 40 }
})

const SPARKLE_DROPS = [
  { sx: -170, drift: 12, delay: 0, dur: 2.3, color: '#3ba4ff', size: 3 },
  { sx: -125, drift: -8, delay: 0.6, dur: 2.6, color: '#ffffff', size: 2.5 },
  { sx: -80, drift: 14, delay: 1.2, dur: 2.1, color: '#a45cff', size: 3 },
  { sx: -35, drift: -10, delay: 0.3, dur: 2.4, color: '#3ba4ff', size: 2 },
  { sx: 10, drift: 15, delay: 1.7, dur: 2.8, color: '#ffffff', size: 3 },
  { sx: 55, drift: -12, delay: 0.9, dur: 2.2, color: '#a45cff', size: 2.5 },
  { sx: 100, drift: 10, delay: 1.4, dur: 2.5, color: '#3ba4ff', size: 3 },
  { sx: 145, drift: -15, delay: 0.4, dur: 2.7, color: '#ffffff', size: 2 },
  { sx: 185, drift: 8, delay: 1.8, dur: 2.3, color: '#a45cff', size: 2.5 },
]

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

        {/* Freelancing Profiles Small Circle Icons Dock */}
        <div data-visible={inView} className="reveal mt-14 flex w-full flex-col items-center border-t border-white/10 pt-8 text-center">
          <span className="font-display text-[9px] tracking-[0.4em] text-neon-blue">
            FREELANCE CLIENT HIRES
          </span>

          {/* Minimalist Small Circular Icon Dock with floating animated tooltip */}
          <div className="mt-4 flex items-center justify-center gap-4">
            {FREELANCE_PLATFORMS.map((platform) => {
              const Icon = platform.icon
              return (
                <div key={platform.name} className="relative flex flex-col items-center">
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex size-10 items-center justify-center rounded-full border shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 focus:outline-none"
                    style={{
                      backgroundColor: platform.bgColor,
                      borderColor: platform.borderColor,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = platform.hoverShadow
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.85)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.borderColor = platform.borderColor
                    }}
                    aria-label={`${platform.name} (${platform.arabicName})`}
                  >
                    <Icon className="size-5 transition-transform duration-300 group-hover:scale-115" />

                    {/* Cyber floating tooltip on hover */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 scale-90 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 z-30"
                    >
                      <div className="flex items-center gap-1.5 whitespace-nowrap rounded border border-white/20 bg-background/95 px-2.5 py-1 font-display text-[9px] font-bold tracking-wider text-white shadow-xl backdrop-blur-md">
                        <span>{platform.name}</span>
                        <span className="text-muted-foreground text-[8px]">({platform.arabicName})</span>
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-background/95" />
                      </div>
                    </div>
                  </a>
                </div>
              )
            })}
          </div>
        </div>

        {/* End Section: "Let's Connect" (Left) + Catching Phrase (Center) + "Who am I ?" (Right) */}
        <div data-visible={inView} className="reveal relative mt-16 w-full">
          {/* Subtle ambient radiant glow behind section */}
          <div aria-hidden="true" className="absolute -inset-x-10 top-1/2 -z-10 h-28 -translate-y-1/2 rounded-full bg-gradient-to-r from-neon-blue/15 via-neon-purple/20 to-neon-blue/15 blur-3xl opacity-75" />

          <div className="grid items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
            {/* Left: "Let's Connect" paragraph section */}
            <div className="glass hud-corners flex flex-col justify-center p-5 text-left sm:p-6 lg:col-span-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-blue shadow-[0_0_8px_var(--neon-blue)]" aria-hidden="true" />
                <span className="font-display text-[9px] tracking-[0.35em] text-neon-blue">
                  OPEN CHANNEL // REACH OUT
                </span>
              </div>
              <h4 className="mt-1 font-display text-base font-bold tracking-wide text-white sm:text-lg">
                Let&apos;s Connect
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                I am always open to discussing new projects, exploring creative ideas, and collaborating on innovative gaming experiences.
              </p>
            </div>

            {/* Center: Compact Catching Phrase with delicate falling & disappearing sparkles */}
            <div className="glass hud-corners relative flex flex-col items-center justify-center p-5 text-center sm:p-6 lg:col-span-4">
              {/* Sparkle Emitter Area */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                {SPARKLE_DROPS.map((s, i) => (
                  <span
                    key={i}
                    className="animate-spark-drop absolute top-2 rounded-full"
                    style={
                      {
                        left: `${50 + (s.sx / 4)}%`,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        backgroundColor: s.color,
                        boxShadow: `0 0 6px ${s.color}`,
                        '--sx': '0px',
                        '--drift': `${s.drift * 0.7}px`,
                        '--dur': `${s.dur}s`,
                        animationDelay: `${s.delay}s`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>

              <span className="mb-1.5 block font-display text-[8px] tracking-[0.35em] text-neon-blue/90">
                // CREATIVE PHILOSOPHY
              </span>
              <p className="font-display text-sm font-bold italic tracking-wide text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] sm:text-base">
                “A Gamer’s heart,{' '}
                <span className="text-gradient not-italic">a Developer’s mindset.</span>”
              </p>
              <div className="mx-auto mt-2.5 flex items-center justify-center gap-2">
                <span className="h-px w-6 bg-gradient-to-r from-transparent to-neon-blue" aria-hidden="true" />
                <span className="size-1 rotate-45 bg-neon-purple shadow-[0_0_6px_var(--neon-purple)]" aria-hidden="true" />
                <span className="h-px w-6 bg-gradient-to-l from-transparent to-neon-purple" aria-hidden="true" />
              </div>
            </div>

            {/* Right: "Who am I ?" paragraph section */}
            <div className="glass hud-corners flex flex-col justify-center p-5 text-left sm:p-6 lg:col-span-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-purple shadow-[0_0_8px_var(--neon-purple)]" aria-hidden="true" />
                <span className="font-display text-[9px] tracking-[0.35em] text-neon-purple">
                  IDENTITY // BIOGRAPHY
                </span>
              </div>
              <h4 className="mt-1 font-display text-base font-bold tracking-wide text-white sm:text-lg">
                Who am I?
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                I’m <span className="font-semibold text-white">Ann Joseph</span>, a Computer Science student driven by a deep passion for games and a vision to turn creative ideas into meaningful gaming experiences.
              </p>
            </div>
          </div>
        </div>

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

'use client'

import Image from 'next/image'
import {
  Award,
  BookOpen,
  Calendar,
  ExternalLink,
  GraduationCap,
  MapPin,
} from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

export type EducationItem = {
  degree: string
  major: string
  institution: string
  institutionLogo?: string
  url?: string
  period: string
  location?: string
  status: 'COMPLETED' | 'IN PROGRESS'
  highlights: string[]
  gradeOrBadge?: string
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "Bachelor of Computer Science & AI",
    major: "Computer Science & Artificial Intelligence",
    institution: "Al Ryada University for Science & Technology (RST)",
    institutionLogo: "/images/rst_logo.png",
    url: "https://rst.edu.eg/",
    period: "2025 — 2028",
    location: "Campus",
    status: "IN PROGRESS",
    highlights: [
      "Core Coursework: Data Structures, Algorithms, Object-Oriented Programming (C++ / C#)",
      "Specialized Track: Artificial Intelligence, Computer Graphics & Intelligent Interactive Systems",
      "Academic Projects: Unity 3D projects and 2D projects",
    ],
    gradeOrBadge: "IN PROGRESS",
  },
]

export function EducationSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section id="education" className="relative px-6 pb-16 pt-8 md:px-10 md:pb-20">
      <div className="mx-auto max-w-6xl">
        {/* Subtle sub-heading styled to cleanly sit under About Me */}
        <div ref={ref} data-visible={inView} className="reveal mb-8 flex flex-col gap-2">
          <div className="flex items-center gap-3 font-display text-[10px] tracking-[0.4em] text-neon-blue sm:text-xs">
            <span className="text-neon-purple">[ACADEMIC LOGS]</span>
            <span>KNOWLEDGE BASE</span>
            <span className="h-px w-12 bg-gradient-to-r from-neon-blue to-transparent" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-3">
            <GraduationCap className="size-6 text-neon-blue" aria-hidden="true" />
            <h3 className="font-display text-2xl font-black tracking-wide text-white sm:text-3xl">
              EDUCATION & TRAINING
            </h3>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Academic foundations and formal technical training supporting my gameplay engineering skills.
          </p>
        </div>

        {/* Education Hero Card (Enlarged Full-Width Showcase) */}
        <div className="w-full">
          {EDUCATION_DATA.map((item, idx) => (
            <div
              key={idx}
              data-visible={inView}
              className="reveal glass hud-corners group relative flex flex-col justify-between overflow-hidden p-7 transition-all duration-500 hover:border-neon-blue/60 hover:shadow-[0_0_40px_rgb(59_164_255/0.25)] sm:p-9 md:p-10"
              style={{ transitionDelay: '0.1s' }}
            >
              {/* Subtle ambient corner aura */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-neon-blue/15 blur-3xl transition-opacity duration-700"
              />

              <div>
                {/* Header Strip */}
                <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/10 pb-6">
                  <div className="flex min-w-0 flex-1 items-start gap-4 sm:gap-5">
                    <div className="flex size-14 shrink-0 items-center justify-center border border-neon-blue/50 bg-neon-blue/15 shadow-[0_0_20px_rgb(59_164_255/0.3)] sm:size-16">
                      <GraduationCap className="size-8 text-neon-blue" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-display text-[10px] tracking-[0.3em] text-neon-purple sm:text-xs">
                        [{item.major.toUpperCase()}]
                      </span>
                      <h4 className="mt-1 font-display text-2xl font-black tracking-wide text-white sm:text-3xl md:text-4xl">
                        {item.degree}
                      </h4>
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group/link mt-2 inline-flex items-center gap-2 text-base font-semibold text-neon-blue transition-colors hover:text-white hover:underline sm:text-lg"
                          title={`Visit ${item.institution} official website`}
                        >
                          <span>{item.institution}</span>
                          <ExternalLink className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <p className="mt-2 text-base font-medium text-muted-foreground sm:text-lg">{item.institution}</p>
                      )}
                    </div>
                  </div>

                  {/* Right side: University Logo (Big & Crisp) + Status badge */}
                  <div className="flex shrink-0 items-center gap-5 sm:gap-6">
                    {item.institutionLogo && (
                      <a
                        href={item.url || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="group/logo relative flex items-center justify-center p-0 transition-all duration-300 focus:outline-none"
                        title={`Visit ${item.institution}`}
                      >
                        <Image
                          src={item.institutionLogo}
                          alt={`${item.institution} Logo`}
                          width={90}
                          height={120}
                          className="h-20 w-auto object-contain transition-transform duration-300 group-hover/logo:scale-110 group-hover/logo:brightness-115 sm:h-24"
                        />
                      </a>
                    )}

                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      <span
                        className={cn(
                          'rounded-md border px-3.5 py-1 font-display text-[10px] font-bold tracking-[0.2em] sm:text-xs',
                          item.status === 'COMPLETED'
                            ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300'
                            : 'border-neon-blue/60 bg-neon-blue/15 text-neon-blue shadow-[0_0_15px_rgb(59_164_255/0.3)]',
                        )}
                      >
                        {item.status}
                      </span>
                      {item.gradeOrBadge && (
                        <span className="inline-flex items-center gap-1.5 font-display text-[10px] tracking-[0.15em] text-amber-400 sm:text-xs">
                          <Award className="size-3.5" aria-hidden="true" />
                          {item.gradeOrBadge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Meta row */}
                <div className="my-5 flex flex-wrap items-center gap-6 font-display text-xs tracking-[0.25em] text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="size-4 text-neon-blue" aria-hidden="true" />
                    <span>{item.period}</span>
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-2">
                      <MapPin className="size-4 text-neon-purple" aria-hidden="true" />
                      <span>{item.location}</span>
                    </span>
                  )}
                </div>

                {/* Highlights List - Expanded & Clear */}
                <div className="border-t border-white/5 pt-5">
                  <span className="mb-3 block font-display text-[10px] tracking-[0.25em] text-neon-blue">
                    CORE ACADEMIC CURRICULUM & PROJECTS:
                  </span>
                  <ul className="grid gap-3 text-sm leading-relaxed text-foreground/90 sm:grid-cols-2 md:text-base">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-neon-blue shadow-[0_0_8px_var(--neon-blue)]" aria-hidden="true" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

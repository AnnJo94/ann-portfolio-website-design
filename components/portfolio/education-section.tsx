'use client'

import { Award, BookOpen, Calendar, ExternalLink, GraduationCap, MapPin } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

export type EducationItem = {
  degree: string
  major: string
  institution: string
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
    institution: "Al Ryada University",
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
  {
    degree: "Certification & Intensive Training",
    major: "Unity 3D Game Development & Gameplay Systems",
    institution: "Game Engineering Academy",
    period: "2023 — 2024",
    status: "COMPLETED",
    highlights: [
      "Mastery of Unity ScriptableObjects, NavMesh AI, Physics Joints & Audio Mixers",
      "Performance optimization & memory profiling for real-time 60 FPS rendering",
    ],
    gradeOrBadge: "CERTIFIED",
  },
]

export function EducationSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section id="education" className="relative px-6 pb-20 pt-8 md:px-10 md:pb-24">
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

        {/* Education Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {EDUCATION_DATA.map((item, idx) => (
            <div
              key={idx}
              data-visible={inView}
              className="reveal glass hud-corners group relative p-6 transition-all duration-300 hover:border-neon-blue/50 hover:shadow-[0_0_30px_rgb(59_164_255/0.2)]"
              style={{ transitionDelay: `${0.1 + idx * 0.15}s` }}
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center border border-neon-blue/40 bg-neon-blue/10">
                    <BookOpen className="size-5 text-neon-blue" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-display text-[9px] tracking-[0.25em] text-neon-purple">
                      {item.major}
                    </span>
                    <h4 className="font-display text-base font-bold text-white sm:text-lg">
                      {item.degree}
                    </h4>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-neon-blue transition-colors hover:text-white hover:underline"
                        title={`Visit ${item.institution} official website`}
                      >
                        <span>{item.institution}</span>
                        <ExternalLink className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true" />
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-muted-foreground">{item.institution}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <span
                    className={cn(
                      'rounded px-2 py-0.5 font-display text-[8px] tracking-[0.15em]',
                      item.status === 'COMPLETED'
                        ? 'border border-emerald-400/50 bg-emerald-400/10 text-emerald-300'
                        : 'border border-neon-blue/50 bg-neon-blue/10 text-neon-blue',
                    )}
                  >
                    {item.status}
                  </span>
                  {item.gradeOrBadge && (
                    <span className="inline-flex items-center gap-1 font-display text-[9px] tracking-[0.15em] text-amber-400">
                      <Award className="size-3" aria-hidden="true" />
                      {item.gradeOrBadge}
                    </span>
                  )}
                </div>
              </div>

              {/* Meta row */}
              <div className="my-3.5 flex flex-wrap items-center gap-4 font-display text-[10px] tracking-[0.2em] text-muted-foreground/80">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3 text-neon-blue" aria-hidden="true" />
                  {item.period}
                </span>
                {item.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3 text-neon-purple" aria-hidden="true" />
                    {item.location}
                  </span>
                )}
              </div>

              {/* Highlights */}
              <ul className="space-y-2 border-t border-white/5 pt-3 text-xs leading-relaxed text-foreground/85">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-neon-blue shadow-[0_0_6px_var(--neon-blue)]" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

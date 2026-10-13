'use client'

import Image from 'next/image'
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Cpu,
  ExternalLink,
  Layers,
  Network,
  Radio,
  Server,
  ShieldAlert,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

export type WorkExperienceItem = {
  id: string
  number: string
  role: string
  organization: string
  organizationLogo?: string
  url?: string
  program: string
  period: string
  round?: string
  status: 'CURRENTLY ENROLLED' | 'COMPLETED' | 'INTERNSHIP / TRAINING'
  statusType: 'current' | 'completed'
  summary: string
  category: string
  tags: string[]
  responsibilities?: string[]
}

export const WORK_EXPERIENCES: WorkExperienceItem[] = [
  {
    id: 'exp-01',
    number: '01',
    role: 'Game Development Trainee',
    organization: 'Digital Egypt Pioneers Initiative (DEPI)',
    organizationLogo: '/images/depi_logo.png',
    url: 'https://depi.gov.eg/login',
    program: 'DEPI Game Development Training Program',
    round: 'Round 5',
    period: 'Currently Enrolled',
    status: 'CURRENTLY ENROLLED',
    statusType: 'current',
    category: 'GAME DEVELOPMENT',
    summary:
      'Currently enrolled in the DEPI Game Development training program, developing practical skills in Unity, C#, gameplay programming, and game development through hands-on projects and training.',
    tags: ['Unity', 'C#', 'Gameplay Programming', 'Game Architecture', 'Physics & AI', 'Interactive Mechanics'],
    responsibilities: [
      'Architecting and implementing gameplay mechanics, character controllers, and interactive state systems in Unity with C#.',
      'Developing hands-on 2D and 3D game projects focusing on game feel, core loops, collision systems, and camera controls.',
      'Applying industry game design patterns, ScriptableObjects architecture, and performance optimization techniques.',
    ],
  },
  {
    id: 'exp-02',
    number: '02',
    role: 'IT Department Intern',
    organization: 'Hospital IT Department',
    program: 'Internship / Practical Training',
    period: 'Training / Internship',
    status: 'INTERNSHIP / TRAINING',
    statusType: 'completed',
    category: 'IT INFRASTRUCTURE & SYSTEMS',
    summary:
      'During my IT Department training at a hospital, I gained practical hands-on experience supporting critical healthcare IT systems, networks, and medical staff technical operations.',
    tags: [
      'Network Infrastructure',
      'Hospital Information System (HIS)',
      'CCTV & IP Cameras',
      'Hardware & Software Support',
      'Troubleshooting',
      'Systems Support',
    ],
    responsibilities: [
      'Network infrastructure & basic network troubleshooting and configuration',
      'Hospital Information System (HIS) operation and support',
      'CCTV and IP cameras installation, monitoring, and maintenance',
      'Hardware and software support across hospital workstations',
      'Printer troubleshooting and peripheral device maintenance',
      'Installing and configuring computers and specialized software',
      'Providing responsive technical support to hospital medical and admin staff',
      'Identifying, logging, and resolving common IT system and hardware problems',
    ],
  },
]

export function WorkExperienceSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section id="experience" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          kicker="CAREER & FIELD OPS"
          title="WORK EXPERIENCE"
          description="Real-world development programs, industry training, and hands-on technical internships."
        />

        <div ref={ref} className="space-y-10">
          {WORK_EXPERIENCES.map((item, idx) => {
            const isCurrent = item.statusType === 'current'

            return (
              <div
                key={item.id}
                data-visible={inView}
                className="reveal glass hud-corners group relative overflow-hidden p-6 transition-all duration-500 hover:border-neon-blue/60 hover:shadow-[0_0_35px_rgb(59_164_255/0.25)] sm:p-8"
                style={{ transitionDelay: `${0.15 + idx * 0.15}s` }}
              >
                {/* Background ambient glow */}
                <div
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute -right-20 -top-20 size-64 rounded-full blur-3xl transition-opacity duration-700',
                    isCurrent ? 'bg-neon-purple/15' : 'bg-neon-blue/15',
                  )}
                />

                {/* Header Strip */}
                <div className="relative flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                  <div className="flex items-start gap-4">
                    {/* Index Badge */}
                    <div className="flex size-12 shrink-0 items-center justify-center border border-neon-blue/50 bg-neon-blue/10 font-display text-base font-bold text-neon-blue shadow-[0_0_15px_rgb(59_164_255/0.3)] sm:size-14 sm:text-lg">
                      {item.number}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-[9px] tracking-[0.25em] text-neon-purple sm:text-[10px]">
                          [{item.category}]
                        </span>
                      </div>
                      <h3 className="mt-1 font-display text-xl font-black tracking-wide text-white sm:text-2xl md:text-3xl">
                        {item.role}
                      </h3>
                      <div className="mt-1 flex flex-col gap-1 text-sm sm:text-base">
                        <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                          {item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-neon-blue hover:underline"
                              title={`Visit ${item.organization}`}
                            >
                              <Building2 className="size-4 text-neon-blue transition-transform group-hover/link:scale-110" aria-hidden="true" />
                              <span>{item.organization}</span>
                              <ExternalLink className="size-3 text-neon-blue opacity-75 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100" aria-hidden="true" />
                            </a>
                          ) : (
                            <span className="flex items-center gap-1.5 font-medium text-foreground">
                              <Building2 className="size-4 text-neon-blue" aria-hidden="true" />
                              {item.organization}
                            </span>
                          )}
                        </div>

                        {/* Round info directly beneath organization */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span>{item.program}</span>
                          {item.round && (
                            <>
                              <span className="text-white/20">•</span>
                              <span className="inline-flex items-center rounded border border-neon-purple/50 bg-neon-purple/15 px-2 py-0.5 font-display text-[9px] tracking-[0.15em] text-neon-purple">
                                {item.round.toUpperCase()}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side: Logo + Status Indicator Badge ("CURRENTLY ENROLLED") */}
                  <div className="flex shrink-0 items-center gap-4">
                    {item.organizationLogo && (
                      <a
                        href={item.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/logo relative flex items-center justify-center p-0 transition-all duration-300 focus:outline-none"
                        title={item.organization}
                      >
                        <Image
                          src={item.organizationLogo}
                          alt={`${item.organization} Logo`}
                          width={60}
                          height={60}
                          className="h-14 w-auto object-contain transition-transform duration-300 group-hover/logo:scale-110 group-hover/logo:brightness-110"
                        />
                      </a>
                    )}

                    <div className="flex flex-col items-start gap-1.5 sm:items-end">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded border px-3 py-1 font-display text-[9px] tracking-[0.2em] sm:text-[10px]',
                          isCurrent
                            ? 'border-neon-purple/70 bg-neon-purple/15 text-neon-purple shadow-[0_0_15px_rgb(164_92_255/0.4)]'
                            : 'border-neon-blue/50 bg-neon-blue/10 text-neon-blue',
                        )}
                      >
                        {isCurrent ? (
                          <>
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-purple opacity-75" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-purple" />
                            </span>
                            {item.status}
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="size-3" aria-hidden="true" />
                            {item.status}
                          </>
                        )}
                      </span>

                      <span className="flex items-center gap-1 font-display text-[10px] tracking-[0.2em] text-muted-foreground">
                        <Calendar className="size-3 text-neon-blue" aria-hidden="true" />
                        {item.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Summary Section */}
                <div className="relative mt-6">
                  <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                    {item.summary}
                  </p>
                </div>

                {/* Practical Experience Bullet Points */}
                {item.responsibilities && item.responsibilities.length > 0 && (
                  <div className="relative mt-6 border-t border-white/5 pt-5">
                    <div className="mb-3 flex items-center gap-2 font-display text-[10px] tracking-[0.25em] text-neon-blue">
                      <Wrench className="size-3.5" aria-hidden="true" />
                      <span>KEY PRACTICAL EXPERIENCE & AREAS OF FOCUS:</span>
                    </div>

                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {item.responsibilities.map((resp, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm"
                        >
                          <span
                            className={cn(
                              'mt-1.5 size-1.5 shrink-0 rounded-full',
                              isCurrent
                                ? 'bg-neon-purple shadow-[0_0_8px_var(--neon-purple)]'
                                : 'bg-neon-blue shadow-[0_0_8px_var(--neon-blue)]',
                            )}
                            aria-hidden="true"
                          />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech & Skills Tags */}
                <div className="relative mt-6 flex flex-wrap items-center gap-2 border-t border-white/5 pt-5">
                  <span className="font-display text-[9px] tracking-[0.2em] text-muted-foreground">
                    STACK & SKILLS:
                  </span>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/10 bg-white/5 px-2.5 py-1 font-sans text-xs text-foreground/90 transition-colors group-hover:border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

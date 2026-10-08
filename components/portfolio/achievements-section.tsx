'use client'

import {
  Briefcase,
  ChevronRight,
  Flame,
  Gamepad2,
  Lock,
  Rocket,
  ShieldAlert,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const NEXT_GOALS = [
  {
    icon: Gamepad2,
    title: 'Participate in Game Jams',
    desc: 'Sprint with teams under time constraints to prototype inventive mechanics and ship game jam entries.',
    tag: 'QUEST 01',
    accent: 'blue',
  },
  {
    icon: Trophy,
    title: 'Compete in Game Development Competitions',
    desc: 'Showcase polished game design, algorithms, and technical mastery against global peer creators.',
    tag: 'QUEST 02',
    accent: 'purple',
  },
  {
    icon: Rocket,
    title: 'Publish My Own Games',
    desc: 'Release standalone commercial & indie titles across platforms (Itch.io, Steam, WebGL).',
    tag: 'QUEST 03',
    accent: 'blue',
  },
  {
    icon: Briefcase,
    title: 'Earn My First Game Dev Internship',
    desc: 'Join a professional studio or development team as a Junior Gameplay Programmer / Engine Intern.',
    tag: 'QUEST 04',
    accent: 'purple',
  },
]

export function AchievementsSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section id="achievements" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="10"
          kicker="PLAYER TROPHY ROOM"
          title="ACHIEVEMENTS"
          description="Tracking unlocked trophies, career milestones, and incoming campaign objectives."
        />

        <div ref={ref} className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Main Locked Trophy Showcase Card */}
          <div
            data-visible={inView}
            className="reveal glass hud-corners relative flex flex-col justify-between overflow-hidden p-6 sm:p-8 lg:col-span-5"
          >
            {/* Ambient pulsed glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-neon-purple/20 blur-3xl"
            />

            <div>
              {/* Badge Strip */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="flex items-center gap-2 font-display text-[9px] tracking-[0.25em] text-neon-blue">
                  <ShieldAlert className="size-3.5" aria-hidden="true" />
                  STATUS: IN TRAINING
                </span>
                <span className="rounded border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 font-display text-[8px] tracking-[0.2em] text-amber-300">
                  LEVEL LOCKED
                </span>
              </div>

              {/* Large Locked Hologram Vault */}
              <div className="my-8 flex flex-col items-center text-center">
                <div className="relative flex size-24 items-center justify-center rounded-2xl border border-dashed border-neon-purple/60 bg-neon-purple/10 shadow-[0_0_40px_rgb(164_92_255/0.3)] transition-transform duration-500 hover:scale-105 sm:size-28">
                  <Lock className="size-10 text-neon-purple animate-pulse sm:size-12" aria-hidden="true" />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl border border-neon-purple/40"
                    style={{ animation: 'pulse-ring 2.4s ease-out infinite' }}
                  />
                </div>

                <div className="mt-6 flex items-center gap-2 font-display text-sm tracking-[0.2em] text-muted-foreground sm:text-base">
                  <span>🔒 ACHIEVEMENTS</span>
                </div>

                <h3 className="mt-2 text-balance font-display text-2xl font-black tracking-wide text-white sm:text-3xl">
                  Achievement Unlocked:{' '}
                  <span className="text-gradient block sm:inline">Not Yet...</span>
                </h3>

                <p className="mt-4 text-pretty text-sm leading-relaxed text-foreground/85 sm:text-base">
                  Currently developing my skills and building projects to prepare for game jams,
                  competitions, and future opportunities in the game development industry.
                </p>
              </div>
            </div>

            {/* Exp progress bar placeholder */}
            <div className="border-t border-white/10 pt-5">
              <div className="flex justify-between font-display text-[9px] tracking-[0.2em] text-muted-foreground">
                <span>QUEST MASTERY PROGRESS</span>
                <span className="text-neon-blue">CHARGING CORE_</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-1000"
                  style={{ width: inView ? '65%' : '0%' }}
                />
              </div>
            </div>
          </div>

          {/* Next Goals Quest List */}
          <div
            data-visible={inView}
            className="reveal flex flex-col justify-between gap-4 lg:col-span-7"
            style={{ transitionDelay: '0.15s' }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Flame className="size-4 text-neon-purple" aria-hidden="true" />
                <h4 className="font-display text-xs font-bold tracking-[0.25em] text-white sm:text-sm">
                  NEXT GOALS & TARGETS
                </h4>
              </div>
              <span className="font-display text-[9px] tracking-[0.2em] text-muted-foreground">
                ACTIVE QUEUE: 4
              </span>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              {NEXT_GOALS.map((goal, i) => {
                const Icon = goal.icon
                const isPurple = goal.accent === 'purple'

                return (
                  <div
                    key={goal.title}
                    className="glass hud-corners group relative flex flex-col justify-between p-5 transition-all duration-300 hover:-translate-y-1 hover:border-neon-blue/60 hover:shadow-[0_0_25px_rgb(59_164_255/0.2)]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div
                          className={cn(
                            'flex size-10 items-center justify-center border transition-colors',
                            isPurple
                              ? 'border-neon-purple/50 bg-neon-purple/10 text-neon-purple'
                              : 'border-neon-blue/50 bg-neon-blue/10 text-neon-blue',
                          )}
                        >
                          <Icon className="size-5" aria-hidden="true" />
                        </div>
                        <span className="font-display text-[8px] tracking-[0.2em] text-muted-foreground">
                          {goal.tag}
                        </span>
                      </div>

                      <h5 className="mt-4 font-display text-sm font-bold tracking-wide text-white group-hover:text-glow-blue sm:text-base">
                        {goal.title}
                      </h5>

                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {goal.desc}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 border-t border-white/5 pt-3 font-display text-[8px] tracking-[0.2em] text-neon-blue">
                      <span>OBJECTIVE ARMED</span>
                      <ChevronRight className="size-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

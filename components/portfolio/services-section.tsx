'use client'

import {
  Bot,
  Box,
  ChevronRight,
  Code2,
  Gamepad2,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

export type ServiceItem = {
  id: string
  number: string
  title: string
  tagline: string
  description: string
  icon: typeof Gamepad2
  capabilities: string[]
  accent: 'blue' | 'purple'
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'game-dev',
    number: '01',
    title: 'Game Development',
    tagline: 'Full-Cycle Development',
    description: 'Bringing game ideas to life with Unity and C#.',
    icon: Gamepad2,
    capabilities: ['Unity 6 / 2022+ Architecture', 'C# Systems & Tooling', 'Cross-Platform Builds', 'Game Loop Optimization'],
    accent: 'blue',
  },
  {
    id: 'gameplay-programming',
    number: '02',
    title: 'Gameplay Programming',
    tagline: 'Feel & Mechanics',
    description: 'Building mechanics, player systems, interactions, and engaging gameplay experiences.',
    icon: Code2,
    capabilities: ['Player Controllers & Movement', 'Combat & Interaction Systems', 'State Machines & Stats', 'Game Feel & Juice (Camera/VFX)'],
    accent: 'purple',
  },
  {
    id: 'prototyping',
    number: '03',
    title: '2D & 3D Prototyping',
    tagline: 'Idea to Playable',
    description: 'Turning ideas into playable prototypes and experimenting with new game concepts.',
    icon: Box,
    capabilities: ['Rapid Gameplay Proof-of-Concept', 'Physics Experiments & Sandbox', 'Greybox Level Testing', 'Core Loop Validation'],
    accent: 'blue',
  },
  {
    id: 'game-ai',
    number: '04',
    title: 'Game AI',
    tagline: 'Intelligent Behaviors',
    description: 'Creating enemy behaviors, navigation, and intelligent gameplay systems.',
    icon: Bot,
    capabilities: ['NavMesh & 3D Pathfinding', 'State & Behavior Trees', 'Patrol / Chase / Combat AI', 'Player Sensing & Perception'],
    accent: 'purple',
  },
  {
    id: 'game-ui',
    number: '05',
    title: 'Game UI',
    tagline: 'HUD & In-Game Interfaces',
    description: 'Designing and developing interactive HUDs, menus, and in-game interfaces.',
    icon: Layers,
    capabilities: ['Responsive Diegetic HUDs', 'Menu Systems & Settings', 'Inventory & Dialogue Panels', 'UI Audio & Haptic Feedback'],
    accent: 'blue',
  },
]

export function ServicesSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section id="services" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="06"
          kicker="CAPABILITIES & LOADOUT"
          title="OFFERED SERVICES"
          description="Specialized game engineering and interactive development services for studios, indie teams, and creative projects."
        />

        <div
          ref={ref}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES_DATA.map((service, idx) => {
            const Icon = service.icon
            const isPurple = service.accent === 'purple'
            // Let the 5th card stretch full width or 2 columns on lg for nice layout balance
            const isLast = idx === 4

            return (
              <div
                key={service.id}
                data-visible={inView}
                className={cn(
                  'reveal glass hud-corners group relative flex flex-col justify-between overflow-hidden p-6 transition-all duration-500 sm:p-7',
                  'hover:-translate-y-1 hover:border-neon-blue/60 hover:shadow-[0_0_35px_rgb(59_164_255/0.25)]',
                  isLast && 'md:col-span-2 lg:col-span-1',
                )}
                style={{ transitionDelay: `${0.1 + idx * 0.1}s` }}
              >
                {/* Background ambient corner glow */}
                <div
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute -right-16 -top-16 size-44 rounded-full blur-3xl transition-opacity duration-700',
                    isPurple ? 'bg-neon-purple/15' : 'bg-neon-blue/15',
                  )}
                />

                {/* Top Row: Icon + Number Index */}
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div
                      className={cn(
                        'flex size-12 items-center justify-center border transition-colors duration-300',
                        isPurple
                          ? 'border-neon-purple/50 bg-neon-purple/10 text-neon-purple group-hover:bg-neon-purple/20'
                          : 'border-neon-blue/50 bg-neon-blue/10 text-neon-blue group-hover:bg-neon-blue/20',
                      )}
                    >
                      <Icon className="size-6 transition-transform group-hover:scale-110" aria-hidden="true" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-display text-[9px] tracking-[0.25em] text-muted-foreground">
                        SERVICE
                      </span>
                      <span
                        className={cn(
                          'font-display text-sm font-bold',
                          isPurple ? 'text-neon-purple' : 'text-neon-blue',
                        )}
                      >
                        [{service.number}]
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-5">
                    <span className="font-display text-[9px] tracking-[0.25em] text-muted-foreground sm:text-[10px]">
                      {service.tagline.toUpperCase()}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold tracking-wide text-white transition-colors group-hover:text-glow-blue sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Capabilities list */}
                <div className="mt-6 border-t border-white/5 pt-4">
                  <div className="mb-2.5 flex items-center gap-1.5 font-display text-[9px] tracking-[0.2em] text-muted-foreground">
                    <Zap className="size-3 text-neon-blue" aria-hidden="true" />
                    <span>CAPABILITIES:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-center gap-2 transition-colors group-hover:text-foreground">
                        <ChevronRight className="size-3 text-neon-blue" aria-hidden="true" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

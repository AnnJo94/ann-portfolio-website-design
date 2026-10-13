'use client'

import { Check, Lock, Play } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { JOURNEY } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

function JourneyLevel({ item, index }: { item: (typeof JOURNEY)[number]; index: number }) {
  const { ref, inView } = useInView<HTMLLIElement>({ threshold: 0.6 })
  const current = 'current' in item && item.current
  const left = index % 2 === 0

  return (
    <li ref={ref} className="relative grid grid-cols-[48px_1fr] gap-5 md:grid-cols-[1fr_64px_1fr] md:gap-8">
      {/* Checkpoint */}
      <div className="relative row-span-1 flex justify-center md:col-start-2">
        <div
          className={cn(
            'relative z-10 flex size-12 items-center justify-center rotate-45 border-2 transition-all duration-700 md:size-14',
            inView
              ? current
                ? 'border-neon-purple bg-neon-purple/20 shadow-[0_0_30px_rgb(164_92_255/0.7)]'
                : 'border-neon-blue bg-neon-blue/20 shadow-[0_0_30px_rgb(59_164_255/0.6)]'
              : 'border-white/15 bg-background',
          )}
        >
          <span className="-rotate-45">
            {!inView ? (
              <Lock className="size-4 text-muted-foreground" aria-hidden="true" />
            ) : current ? (
              <Play className="size-4 fill-neon-purple text-neon-purple" aria-hidden="true" />
            ) : (
              <Check className="size-5 text-neon-blue" aria-hidden="true" />
            )}
          </span>
          {inView && <span aria-hidden="true" className={cn('absolute inset-0 border', current ? 'border-neon-purple' : 'border-neon-blue')} style={{ animation: `pulse-ring 1.6s ease-out ${current ? 'infinite' : '1'}` }} />}
        </div>
      </div>

        {/* Card */}
        <div
          className={cn(
            'pb-14 transition-all duration-700 md:row-start-1',
            left ? 'md:col-start-1 md:text-left' : 'md:col-start-3',
          )}
          style={{ opacity: inView ? 1 : 0.25, transform: inView ? 'none' : `translateX(${left ? '-20px' : '20px'})` }}
        >
          <div className="glass hud-corners inline-block w-full max-w-md p-5 text-left">
            <div className="flex items-center gap-3 font-display text-[10px] tracking-[0.35em]">
              <span className={current ? 'text-neon-purple' : 'text-neon-blue'}>LEVEL {item.level}</span>
              <span className="text-muted-foreground">{!inView ? 'LOCKED' : current ? 'IN PROGRESS' : 'COMPLETE'}</span>
            </div>
            <h3 className="mt-2 font-display text-lg font-bold text-white sm:text-xl">{item.title}</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            <p className="mt-3 font-display text-[9px] tracking-[0.25em] text-muted-foreground">
              REWARD: <span className="text-white">{item.reward.toUpperCase()}</span>
            </p>
          </div>
        </div>
    </li>
  )
}

export function JourneySection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 })
  return (
    <section id="journey" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="06" kicker="PROGRESSION" title="THE JOURNEY" description="Every level unlocked along the way. Scroll to progress through the campaign." />
        <div ref={ref} className="relative">
          <div aria-hidden="true" className="absolute bottom-14 left-6 top-6 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
            <div
              className="h-full w-full origin-top bg-gradient-to-b from-neon-blue via-neon-blue to-neon-purple shadow-[0_0_10px_var(--neon-blue)] transition-transform duration-[2500ms] ease-out"
              style={{ transform: inView ? 'scaleY(1)' : 'scaleY(0)' }}
            />
          </div>
          <ol className="relative">
            {JOURNEY.map((item, i) => (
              <JourneyLevel key={item.level} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useMemo, useState } from 'react'
import { useInView } from '@/hooks/use-in-view'
import { SKILL_EDGES, SKILL_NODES, type SkillNode } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const STATUS_COLOR: Record<SkillNode['status'], string> = {
  MASTERED: 'text-neon-blue',
  UNLOCKED: 'text-neon-blue',
  TRAINING: 'text-neon-purple',
  RESEARCHING: 'text-muted-foreground',
}

function getConnected(id: string) {
  const set = new Set<string>([id])
  const walk = (dir: 'up' | 'down', from: string) => {
    for (const [a, b] of SKILL_EDGES) {
      const next = dir === 'down' ? (a === from ? b : null) : b === from ? a : null
      if (next && !set.has(next)) {
        set.add(next)
        walk(dir, next)
      }
    }
  }
  walk('up', id)
  walk('down', id)
  return set
}

export function SkillTree() {
  const [activeId, setActiveId] = useState<string>('gamedev')
  const [hovering, setHovering] = useState(false)
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const connected = useMemo(() => getConnected(activeId), [activeId])
  const active = SKILL_NODES.find((n) => n.id === activeId)!
  const byId = useMemo(() => Object.fromEntries(SKILL_NODES.map((n) => [n.id, n])), [])

  return (
    <section id="skills" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          kicker="SKILL TREE"
          title="SKILLS"
          description="Every skill unlocks the next. Hover or tap a node to trace its path through the tree."
        />

        <div ref={ref} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div
            data-visible={inView}
            className="reveal glass relative h-[560px] overflow-hidden rounded-2xl sm:h-[640px]"
            onPointerLeave={() => setHovering(false)}
          >
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(164_92_255/0.12),transparent_60%)]" />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30"
              style={{ backgroundImage: 'radial-gradient(rgb(59 164 255 / 0.35) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />

            <div className="absolute inset-x-4 inset-y-10 sm:inset-x-10">
              <svg className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                <defs>
                  <linearGradient id="edge-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--neon-blue)" />
                    <stop offset="100%" stopColor="var(--neon-purple)" />
                  </linearGradient>
                </defs>
                {SKILL_EDGES.map(([a, b]) => {
                  const from = byId[a]
                  const to = byId[b]
                  const lit = connected.has(a) && connected.has(b)
                  return (
                    <line
                      key={`${a}-${b}`}
                      x1={`${from.x}%`}
                      y1={`${from.y}%`}
                      x2={`${to.x}%`}
                      y2={`${to.y}%`}
                      stroke={lit ? 'var(--neon-blue)' : 'rgb(255 255 255 / 0.12)'}
                      strokeWidth={lit ? 2 : 1}
                      className={cn('transition-all duration-500', lit && 'edge-active')}
                      style={{ filter: lit ? 'drop-shadow(0 0 4px var(--neon-blue))' : undefined }}
                    />
                  )
                })}
              </svg>

              {SKILL_NODES.map((node, i) => {
                const isActive = node.id === activeId
                const lit = connected.has(node.id)
                const big = node.root
                return (
                  <button
                    key={node.id}
                    type="button"
                    onPointerEnter={() => {
                      setActiveId(node.id)
                      setHovering(true)
                    }}
                    onFocus={() => setActiveId(node.id)}
                    onClick={() => setActiveId(node.id)}
                    aria-pressed={isActive}
                    aria-label={`${node.label}, ${node.status.toLowerCase()}, level ${node.level}`}
                    className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 transition-all duration-700"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      opacity: inView ? 1 : 0,
                      transitionDelay: inView ? `${i * 70}ms` : '0ms',
                    }}
                  >
                    <span
                      className={cn(
                        'relative flex items-center justify-center rotate-45 border transition-all duration-300',
                        big ? 'h-12 w-12 sm:h-14 sm:w-14' : 'h-9 w-9 sm:h-11 sm:w-11',
                        lit
                          ? 'border-neon-blue bg-neon-blue/15 shadow-[0_0_24px_rgb(59_164_255/0.6)]'
                          : 'border-white/20 bg-background/80',
                        isActive && 'scale-110 border-neon-purple bg-neon-purple/25 shadow-[0_0_36px_rgb(164_92_255/0.8)]',
                      )}
                    >
                      <span className={cn('-rotate-45 font-display text-[10px] font-bold sm:text-xs', lit ? 'text-white' : 'text-muted-foreground')}>
                        {node.level}
                      </span>
                      {isActive && (
                        <>
                          <span aria-hidden="true" className="absolute inset-0 border border-neon-purple" style={{ animation: 'pulse-ring 1.4s ease-out infinite' }} />
                          <span aria-hidden="true" className="absolute -inset-3 animate-spin-slow" style={{ animationDuration: '4s' }}>
                            <span className="absolute left-0 top-0 h-1 w-1 rounded-full bg-neon-blue shadow-[0_0_6px_var(--neon-blue)]" />
                            <span className="absolute bottom-0 right-0 h-1 w-1 rounded-full bg-neon-purple shadow-[0_0_6px_var(--neon-purple)]" />
                          </span>
                        </>
                      )}
                    </span>
                    <span
                      className={cn(
                        'max-w-[84px] text-center font-display text-[8px] font-semibold leading-tight tracking-[0.12em] transition-colors sm:max-w-none sm:whitespace-nowrap sm:text-[10px]',
                        lit ? 'text-white' : 'text-muted-foreground',
                        big && 'sm:text-xs',
                      )}
                    >
                      {node.label.toUpperCase()}
                    </span>
                  </button>
                )
              })}
            </div>

            <p className="absolute left-4 top-3 font-display text-[9px] tracking-[0.3em] text-muted-foreground">
              SKILL POINTS: <span className="text-neon-blue">03</span>
            </p>
          </div>

          {/* Info panel */}
          <aside
            data-visible={inView}
            aria-live="polite"
            className="reveal glass hud-corners relative flex flex-col gap-5 overflow-hidden p-6 lg:self-start"
            style={{ transitionDelay: '0.2s' }}
          >
            <div aria-hidden="true" key={active.id} className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-neon-blue/15 to-transparent" style={{ animation: 'scan 0.8s ease-out' }} />
            <div className="relative">
              <p className="font-display text-[10px] tracking-[0.35em] text-neon-blue">{active.tier}</p>
              <h3 key={active.id} className="mt-2 font-display text-2xl font-black text-white animate-rise-in">{active.label}</h3>
            </div>
            <div className="relative flex items-center justify-between border-y border-white/10 py-3 font-display text-[10px] tracking-[0.25em]">
              <span className={STATUS_COLOR[active.status]}>{active.status}</span>
              <span className="text-muted-foreground">
                RANK <span className="text-white">{active.level}</span>/5
              </span>
            </div>
            <div className="relative flex gap-1" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={cn('h-2 flex-1 skew-x-[-20deg] transition-colors', i < active.level ? 'bg-gradient-to-r from-neon-blue to-neon-purple' : 'bg-white/10')} />
              ))}
            </div>
            <p className="relative text-pretty leading-relaxed text-muted-foreground">{active.description}</p>
            <p className="relative font-display text-[9px] tracking-[0.25em] text-muted-foreground">
              {hovering ? 'TRACING PATH // ' : 'CONNECTED NODES // '}
              <span className="text-white">{connected.size - 1}</span>
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}

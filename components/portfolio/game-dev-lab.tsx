'use client'

import { AudioLines, Box, Brain, Clapperboard, Code, Cpu, Orbit } from 'lucide-react'
import { useRef, useState, type ReactNode } from 'react'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

function CodeVisual() {
  const lines = [
    ['void', ' Update() {'],
    ['  if', ' (player.Grounded)'],
    ['    ', 'Jump(force);'],
    ['  ', 'ApplyGravity();'],
    ['', '}'],
  ]
  return (
    <div className="font-mono text-[10px] leading-relaxed">
      {lines.map(([k, rest], i) => (
        <div key={i} className="overflow-hidden whitespace-nowrap" style={{ animation: `typing 0.8s steps(20) ${i * 0.25}s both` }}>
          <span className="text-neon-purple">{k}</span>
          <span className="text-white/80">{rest}</span>
        </div>
      ))}
      <span className="inline-block h-3 w-1.5 bg-neon-blue animate-blink" />
    </div>
  )
}

function EngineVisual() {
  const items = ['Scene', '  Player', '  Main Camera', '  Directional Light', '  Terrain']
  return (
    <ul className="font-mono text-[10px] leading-relaxed text-white/70">
      {items.map((it, i) => (
        <li key={it} className={cn('whitespace-pre rounded px-1', i === 1 && 'bg-neon-blue/25 text-white')}>
          {i === 0 ? '▾ ' : '  • '}
          {it.trim()}
        </li>
      ))}
    </ul>
  )
}

function WorldVisual() {
  return (
    <div className="flex h-full items-center justify-center" style={{ perspective: '300px' }}>
      <div className="relative size-12" style={{ transformStyle: 'preserve-3d', animation: 'cube-spin 8s linear infinite' }}>
        {[
          'translateZ(24px)',
          'rotateY(180deg) translateZ(24px)',
          'rotateY(90deg) translateZ(24px)',
          'rotateY(-90deg) translateZ(24px)',
          'rotateX(90deg) translateZ(24px)',
          'rotateX(-90deg) translateZ(24px)',
        ].map((t) => (
          <div key={t} className="absolute inset-0 border border-neon-blue/70 bg-neon-blue/5" style={{ transform: t }} />
        ))}
      </div>
    </div>
  )
}

function AIVisual() {
  const nodes = [
    [12, 50],
    [40, 20],
    [40, 80],
    [70, 35],
    [70, 70],
    [92, 50],
  ]
  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 4], [1, 4], [3, 5], [4, 5],
  ]
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      {edges.map(([a, b]) => (
        <line key={`${a}${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="var(--neon-purple)" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="3 3" className="animate-dash" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={i === 5 ? 'var(--neon-blue)' : 'var(--neon-purple)'}>
          <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.2 + i * 0.2}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  )
}

function PhysicsVisual() {
  return (
    <div className="relative flex h-full items-end justify-center gap-4 pb-1">
      <div className="size-5 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple shadow-[0_0_14px_var(--neon-blue)]" style={{ animation: 'bounce-ball 0.9s cubic-bezier(0.5,0,0.5,1) infinite' }} />
      <div className="size-4 rounded-full bg-neon-purple/80" style={{ animation: 'bounce-ball 1.2s cubic-bezier(0.5,0,0.5,1) infinite' }} />
      <div className="absolute inset-x-2 bottom-0 h-px bg-neon-blue/60" />
    </div>
  )
}

function AudioVisual() {
  return (
    <div className="flex h-full items-center justify-center gap-1">
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          className="h-10 w-1 origin-center rounded-full bg-gradient-to-t from-neon-blue to-neon-purple"
          style={{ animation: `eq ${0.5 + ((i * 37) % 7) / 10}s ease-in-out ${i * 0.05}s infinite` }}
        />
      ))}
    </div>
  )
}

function AnimationVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {[0, 1].map((row) => (
        <div key={row} className="relative h-3">
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
          {[10, 35, 60, 85].map((x) => (
            <span key={x} className="absolute top-1/2 size-2 -translate-y-1/2 rotate-45 border border-neon-purple/70" style={{ left: `${x}%` }} />
          ))}
          <span className="absolute top-1/2 size-2.5 -translate-y-1/2 rotate-45 bg-neon-blue shadow-[0_0_8px_var(--neon-blue)]" style={{ animation: `keyframe-move ${2 + row}s ease-in-out infinite` }} />
        </div>
      ))}
    </div>
  )
}

type LabItem = { id: string; title: string; desc: string; icon: typeof Code; visual: ReactNode; file: string }

const LAB_ITEMS: LabItem[] = [
  { id: 'code', title: 'CODE', file: 'PlayerController.cs', desc: 'Gameplay logic and systems.', icon: Code, visual: <CodeVisual /> },
  { id: 'engine', title: 'GAME ENGINE', file: 'Hierarchy', desc: 'Scenes, components, and the tools that bring a game together.', icon: Cpu, visual: <EngineVisual /> },
  { id: 'world', title: '3D WORLD', file: 'World.unity', desc: 'Building spaces, cameras, and environments to explore.', icon: Box, visual: <WorldVisual /> },
  { id: 'ai', title: 'AI', file: 'EnemyBrain.cs', desc: 'Creating enemies and intelligent behaviors.', icon: Brain, visual: <AIVisual /> },
  { id: 'physics', title: 'PHYSICS', file: 'Rigidbody', desc: 'Making game worlds feel interactive.', icon: Orbit, visual: <PhysicsVisual /> },
  { id: 'audio', title: 'AUDIO', file: 'Mixer', desc: 'Sound that gives every action weight and feedback.', icon: AudioLines, visual: <AudioVisual /> },
  { id: 'animation', title: 'ANIMATION', file: 'Timeline', desc: 'Motion and keyframes that bring characters to life.', icon: Clapperboard, visual: <AnimationVisual /> },
]

export function GameDevLab() {
  const [active, setActive] = useState<string | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })
  const current = LAB_ITEMS.find((i) => i.id === active)

  const onMove = (e: React.PointerEvent) => {
    const el = stageRef.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${-y * 6}deg`)
    el.style.setProperty('--ry', `${x * 8}deg`)
  }

  return (
    <section id="lab" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="08"
          kicker="VIRTUAL WORKSPACE"
          title="GAME DEV LAB"
          description="Everything that goes into making a game, floating in one workspace. Hover or tap a module to inspect it."
        />

        <div ref={ref} className="relative" style={{ perspective: '1200px' }}>
          <div
            ref={stageRef}
            onPointerMove={onMove}
            onPointerLeave={() => {
              stageRef.current?.style.setProperty('--rx', '0deg')
              stageRef.current?.style.setProperty('--ry', '0deg')
            }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_top,rgb(59_164_255/0.12),transparent_60%),radial-gradient(ellipse_at_bottom,rgb(164_92_255/0.14),transparent_60%)] px-4 py-10 transition-transform duration-500 ease-out sm:px-8 sm:py-14"
            style={{ transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))', transformStyle: 'preserve-3d' }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: 'linear-gradient(rgb(59 164 255 / 0.1) 1px, transparent 1px), linear-gradient(90deg, rgb(59 164 255 / 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
              }}
            />

            <ul className="relative flex flex-wrap justify-center gap-4 sm:gap-6">
              {LAB_ITEMS.map((item, i) => {
                const Icon = item.icon
                const isActive = active === item.id
                return (
                  <li
                    key={item.id}
                    className="w-[calc(50%-0.5rem)] transition-all duration-700 sm:w-[220px]"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'none' : 'translateY(40px) scale(0.9)',
                      transitionDelay: `${i * 80}ms`,
                    }}
                  >
                    <div className="animate-float-y" style={{ animationDelay: `${-i * 0.9}s`, animationDuration: `${5 + (i % 3)}s` }}>
                      <button
                        type="button"
                        onPointerEnter={() => setActive(item.id)}
                        onPointerLeave={() => setActive(null)}
                        onFocus={() => setActive(item.id)}
                        onBlur={() => setActive(null)}
                        onClick={() => setActive(item.id)}
                        aria-describedby={`lab-${item.id}`}
                        className={cn(
                          'group relative flex w-full flex-col overflow-hidden rounded-xl border bg-card/70 text-left backdrop-blur-md transition-all duration-300',
                          isActive
                            ? '-translate-y-1 border-neon-blue/70 shadow-[0_0_40px_rgb(59_164_255/0.35)]'
                            : 'border-white/10 hover:border-white/20',
                          active && !isActive && 'opacity-50',
                        )}
                      >
                        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                          <span className="flex items-center gap-2 font-display text-[10px] font-bold tracking-[0.2em] text-white">
                            <Icon className={cn('size-3.5', isActive ? 'text-neon-blue' : 'text-neon-purple')} aria-hidden="true" />
                            {item.title}
                          </span>
                          <span className="flex gap-1" aria-hidden="true">
                            <span className="size-1.5 rounded-full bg-white/20" />
                            <span className={cn('size-1.5 rounded-full', isActive ? 'bg-neon-blue' : 'bg-white/20')} />
                          </span>
                        </div>
                        <div className="relative h-24 px-3 py-3" aria-hidden="true">
                          {item.visual}
                          {isActive && <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-neon-blue/20 to-transparent" style={{ animation: 'scan 1s ease-out' }} />}
                        </div>
                        <div className="border-t border-white/10 px-3 py-2.5">
                          <p className="truncate font-mono text-[10px] text-muted-foreground">{item.file}</p>
                          <p
                            id={`lab-${item.id}`}
                            className={cn(
                              'grid text-xs leading-snug text-foreground transition-all duration-300',
                              isActive ? 'mt-1.5 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                            )}
                          >
                            <span className="overflow-hidden">{item.desc}</span>
                          </p>
                        </div>
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="relative mx-auto mt-10 flex max-w-xl items-center gap-3 rounded-lg border border-white/10 bg-background/60 px-4 py-3 font-mono text-xs" aria-live="polite">
              <span className="text-neon-blue">{'>'}</span>
              <span className="truncate text-muted-foreground">
                {current ? (
                  <>
                    <span className="text-neon-purple">inspect</span> {current.title.toLowerCase()} — <span className="text-white">{current.desc}</span>
                  </>
                ) : (
                  'awaiting input… hover a module to inspect'
                )}
              </span>
              <span className="ml-auto inline-block h-3.5 w-1.5 shrink-0 bg-neon-blue animate-blink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

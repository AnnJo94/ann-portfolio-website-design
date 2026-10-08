'use client'

import { ArrowRight, ChevronLeft, ChevronRight, Lock, Star } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { useInView } from '@/hooks/use-in-view'
import { PROJECTS, type Project } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { LevelModal } from './level-modal'
import { SectionHeading } from './section-heading'

const STATUS_STYLE: Record<Project['status'], string> = {
  COMPLETED: 'border-emerald-400/50 text-emerald-300',
  'IN DEVELOPMENT': 'border-neon-blue/60 text-neon-blue',
  PROTOTYPE: 'border-neon-purple/60 text-neon-purple',
  LOCKED: 'border-white/20 text-muted-foreground',
}

export function ProjectsSection() {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [dragX, setDragX] = useState(0)
  const drag = useRef<{ startX: number; id: number; moved: boolean } | null>(null)
  const wheelLock = useRef(0)
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const project = PROJECTS[index]
  const total = PROJECTS.length

  const closeModal = useCallback(() => setOpen(false), [])
  const go = useCallback((dir: number) => setIndex((i) => Math.max(0, Math.min(total - 1, i + dir))), [total])

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { startX: e.clientX, id: e.pointerId, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 6) drag.current.moved = true
    setDragX(dx)
  }
  const endDrag = () => {
    if (!drag.current) return
    if (dragX < -60) go(1)
    else if (dragX > 60) go(-1)
    setDragX(0)
    setTimeout(() => (drag.current = null), 0)
  }
  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 20) return
    const now = Date.now()
    if (now - wheelLock.current < 450) return
    wheelLock.current = now
    go(e.deltaX > 0 ? 1 : -1)
  }

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="07"
          kicker="LEVEL SELECT"
          title="PROJECTS"
          description="Each project is a playable level. Drag, swipe, or use the arrows to browse — then enter a level to see the full briefing."
        />
      </div>

      <div ref={ref} data-visible={inView} className="reveal">
        {/* Carousel stage */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Project levels"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(1)
            if (e.key === 'ArrowLeft') go(-1)
            if (e.key === 'Enter' && project.status !== 'LOCKED') setOpen(true)
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onWheel={onWheel}
          className="relative mx-auto h-[380px] max-w-6xl touch-pan-y select-none outline-none sm:h-[440px]"
          style={{ perspective: '1400px' }}
        >
          <div aria-hidden="true" className="absolute bottom-6 left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-[50%] bg-neon-blue/20 blur-3xl" />
          {PROJECTS.map((p, i) => {
            const offset = i - index + dragX / 320
            const abs = Math.abs(offset)
            const isActive = i === index
            const locked = p.status === 'LOCKED'
            return (
              <button
                key={p.level}
                type="button"
                aria-label={`Level ${p.level}: ${p.name}${locked ? ' (locked)' : ''}`}
                aria-current={isActive ? 'true' : undefined}
                tabIndex={isActive ? 0 : -1}
                onClick={() => {
                  if (drag.current?.moved) return
                  if (isActive) {
                    if (!locked) setOpen(true)
                  } else setIndex(i)
                }}
                className={cn(
                  'group absolute left-1/2 top-1/2 w-[78vw] max-w-[440px] text-left',
                  dragX === 0 && 'transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]',
                )}
                style={{
                  transform: `translate(-50%, -50%) translateX(${offset * 62}%) translateZ(${-abs * 220}px) rotateY(${offset * -22}deg)`,
                  opacity: abs > 2.2 ? 0 : 1 - abs * 0.35,
                  zIndex: 10 - Math.round(abs),
                  filter: isActive ? 'none' : `blur(${Math.min(abs, 2) * 1.5}px) saturate(0.6)`,
                }}
              >
                <div
                  className={cn(
                    'relative overflow-hidden rounded-xl border bg-card transition-all duration-500',
                    isActive
                      ? 'border-neon-blue/70 shadow-[0_0_60px_rgb(59_164_255/0.35),0_30px_60px_rgb(0_0_0/0.6)]'
                      : 'border-white/10',
                  )}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 440px, 78vw"
                      draggable={false}
                      className={cn('object-cover transition-transform duration-700', isActive && 'group-hover:scale-105', locked && 'grayscale-[60%] brightness-50')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    <div aria-hidden="true" className="absolute inset-0 scanlines opacity-60" />
                    {locked && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <Lock className="size-8 text-white/80" aria-hidden="true" />
                        <span className="font-display text-[10px] tracking-[0.4em] text-white/80">COMING SOON</span>
                      </div>
                    )}
                    <span className={cn('absolute right-3 top-3 border bg-background/60 px-2 py-1 font-display text-[9px] tracking-[0.2em] backdrop-blur', STATUS_STYLE[p.status])}>
                      {p.status}
                    </span>
                  </div>
                  <div className="relative flex items-end justify-between gap-4 p-5">
                    <div>
                      <p className="font-display text-[10px] tracking-[0.4em] text-neon-blue">LEVEL {p.level}</p>
                      <h3 className="mt-1 font-display text-xl font-black uppercase tracking-wide text-white sm:text-2xl">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.type}</p>
                    </div>
                    <div className="flex shrink-0 gap-0.5" aria-label={`Difficulty ${p.difficulty} of 5`}>
                      {Array.from({ length: 5 }, (_, s) => (
                        <Star key={s} className={cn('size-3', s < p.difficulty ? 'fill-neon-purple text-neon-purple' : 'text-white/20')} aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                </div>
                {/* platform */}
                <div aria-hidden="true" className={cn('mx-auto mt-4 h-2 w-3/4 rounded-[50%] transition-all duration-500', isActive ? 'bg-neon-blue/60 shadow-[0_0_30px_8px_rgb(59_164_255/0.4)]' : 'bg-white/10')} />
              </button>
            )
          })}

          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous level"
            className="glass absolute left-2 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition-all hover:border-neon-blue/60 hover:shadow-[0_0_20px_rgb(59_164_255/0.4)] disabled:opacity-30 md:left-8"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === total - 1}
            aria-label="Next level"
            className="glass absolute right-2 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition-all hover:border-neon-blue/60 hover:shadow-[0_0_20px_rgb(59_164_255/0.4)] disabled:opacity-30 md:right-8"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Level pips */}
        <div className="mt-4 flex justify-center gap-2">
          {PROJECTS.map((p, i) => (
            <button
              key={p.level}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to level ${p.level}`}
              className={cn('h-1.5 rounded-full transition-all duration-300', i === index ? 'w-10 bg-neon-blue shadow-[0_0_10px_var(--neon-blue)]' : 'w-4 bg-white/20 hover:bg-white/40')}
            />
          ))}
        </div>

        {/* Selected details */}
        <div className="mx-auto mt-12 max-w-6xl px-0 md:px-4">
          <div key={project.level} className="glass hud-corners grid gap-8 p-6 animate-rise-in sm:p-8 md:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3 font-display text-[10px] tracking-[0.3em]">
                <span className="text-neon-blue">LEVEL {project.level}</span>
                <span className="text-white/20">/</span>
                <span className="text-muted-foreground">{project.type.toUpperCase()}</span>
              </div>
              <h3 className="font-display text-3xl font-black uppercase tracking-wide text-white">{project.name}</h3>
              <p className="text-pretty leading-relaxed text-muted-foreground">{project.description}</p>
              <div>
                <p className="font-display text-[10px] tracking-[0.3em] text-neon-purple">MY ROLE</p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">{project.role}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(true)}
                disabled={project.status === 'LOCKED'}
                className="group mt-2 flex w-fit items-center gap-3 border border-neon-blue/60 bg-neon-blue/15 px-6 py-3.5 font-display text-xs font-bold tracking-[0.25em] text-white clip-hud transition-all hover:bg-neon-blue/25 hover:shadow-[0_0_30px_rgb(59_164_255/0.45)] disabled:cursor-not-allowed disabled:border-white/15 disabled:bg-white/5 disabled:text-muted-foreground disabled:shadow-none"
              >
                {project.status === 'LOCKED' ? 'LEVEL LOCKED' : 'VIEW PROJECT'}
                {project.status === 'LOCKED' ? <Lock className="size-4" aria-hidden="true" /> : <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
              </button>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-display text-[10px] tracking-[0.3em] text-neon-blue">TECHNOLOGIES</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <li key={t} className="border border-neon-blue/30 bg-neon-blue/10 px-2.5 py-1 font-mono text-xs text-white">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-display text-[10px] tracking-[0.3em] text-neon-blue">FEATURES</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                      <span className="h-1.5 w-1.5 rotate-45 bg-neon-purple shadow-[0_0_6px_var(--neon-purple)]" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && <LevelModal project={project} onClose={closeModal} />}
    </section>
  )
}

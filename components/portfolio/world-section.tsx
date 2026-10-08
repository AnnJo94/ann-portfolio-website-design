'use client'

import dynamic from 'next/dynamic'
import { useInView } from '@/hooks/use-in-view'
import { SectionHeading } from './section-heading'

const IslandScene = dynamic(() => import('./island-scene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center font-display text-[10px] tracking-[0.4em] text-neon-blue" role="status">
      RENDERING WORLD…
    </div>
  ),
})

const READOUTS = [
  { k: 'BIOME', v: 'Digital Archipelago' },
  { k: 'CRYSTALS', v: '05 / 05' },
  { k: 'GRAVITY', v: '0.38 G' },
]

export function WorldSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05, once: false, rootMargin: '200px 0px' })

  return (
    <section id="world" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="09"
          kicker="WORLD PREVIEW"
          title="FLOATING ISLAND"
          description="A small slice of a world I'd love to build. Move your cursor to orbit the island."
        />
        <div ref={ref} className="relative h-[460px] overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_center,rgb(91_59_255/0.18),transparent_70%)] sm:h-[600px]">
          <IslandScene active={inView} />

          <div className="pointer-events-none absolute inset-x-4 top-4 flex flex-wrap items-start justify-between gap-3 sm:inset-x-6 sm:top-6">
            <div className="glass hud-corners px-3 py-2">
              <p className="font-display text-[9px] tracking-[0.3em] text-muted-foreground">ZONE</p>
              <p className="font-display text-xs font-bold tracking-[0.2em] text-white">SKYHAVEN-01</p>
            </div>
            <div className="glass hidden px-3 py-2 sm:block">
              <dl className="flex gap-5">
                {READOUTS.map((r) => (
                  <div key={r.k}>
                    <dt className="font-display text-[9px] tracking-[0.3em] text-muted-foreground">{r.k}</dt>
                    <dd className="font-mono text-xs text-white">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[9px] tracking-[0.4em] text-muted-foreground sm:bottom-6">
            MOVE CURSOR TO ORBIT
          </p>
        </div>
      </div>
    </section>
  )
}

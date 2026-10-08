'use client'

import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

export function SectionHeading({
  index,
  kicker,
  title,
  description,
  align = 'left',
}: {
  index: string
  kicker: string
  title: string
  description?: string
  align?: 'left' | 'center'
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 })
  return (
    <div ref={ref} data-visible={inView} className={cn('reveal mb-12 flex flex-col gap-4 md:mb-16', align === 'center' && 'items-center text-center')}>
      <div className="flex items-center gap-3 font-display text-[10px] tracking-[0.4em] text-neon-blue sm:text-xs">
        <span className="text-neon-purple">[{index}]</span>
        <span>{kicker}</span>
        <span className="h-px w-12 bg-gradient-to-r from-neon-blue to-transparent" aria-hidden="true" />
      </div>
      <h2 className="text-balance font-display text-4xl font-black tracking-wide text-white sm:text-5xl md:text-6xl">{title}</h2>
      {description && <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  )
}

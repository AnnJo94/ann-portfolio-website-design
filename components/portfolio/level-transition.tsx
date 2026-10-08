'use client'

import { cn } from '@/lib/utils'

export function LevelTransition({ label, index, visible }: { label: string; index: number; visible: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 z-[70] flex items-center justify-center transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div className="absolute inset-0 flex flex-col">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="flex-1 origin-left bg-background transition-transform duration-300 ease-out"
            style={{ transform: visible ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: visible ? `${i * 25}ms` : '0ms' }}
          />
        ))}
      </div>
      <div className="absolute inset-0 scanlines opacity-50" />
      {visible && (
        <div className="relative flex flex-col items-center gap-3 animate-rise-in">
          <p className="font-display text-[10px] tracking-[0.5em] text-neon-blue">LOADING LEVEL {String(index + 1).padStart(2, '0')}</p>
          <p className="font-display text-3xl font-black tracking-[0.2em] text-white text-glow-purple sm:text-5xl">{label}</p>
          <div className="mt-2 h-0.5 w-48 overflow-hidden bg-white/10">
            <div className="h-full origin-left bg-gradient-to-r from-neon-blue to-neon-purple" style={{ animation: 'load-bar 0.6s ease-out forwards' }} />
          </div>
        </div>
      )}
    </div>
  )
}

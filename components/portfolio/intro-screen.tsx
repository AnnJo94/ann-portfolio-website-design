'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const BOOT_LINES = ['LOADING ASSETS', 'COMPILING SHADERS', 'GENERATING TERRAIN', 'SPAWNING PLAYER', 'WORLD READY']

export function IntroScreen({ leaving, onEnter }: { leaving: boolean; onEnter: () => void }) {
  const [progress, setProgress] = useState(0)
  const ready = progress >= 100

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const duration = 1800
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const line = BOOT_LINES[Math.min(BOOT_LINES.length - 1, Math.floor((progress / 100) * (BOOT_LINES.length - 1)))]

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6 transition-all duration-[1200ms] ease-[cubic-bezier(0.7,0,0.3,1)]',
        leaving && 'pointer-events-none scale-[2.2] opacity-0 blur-md',
      )}
      role="dialog"
      aria-label="Welcome to Ann's world"
    >
      {/* HUD frame */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-4 md:inset-8">
        <div className="absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-neon-blue/70" />
        <div className="absolute right-0 top-0 h-10 w-10 border-r-2 border-t-2 border-neon-blue/70" />
        <div className="absolute bottom-0 left-0 h-10 w-10 border-b-2 border-l-2 border-neon-purple/70" />
        <div className="absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-neon-purple/70" />
        <p className="absolute left-14 top-2 font-display text-[10px] tracking-[0.3em] text-neon-blue/80">SECTOR 07 // ANN.WORLD</p>
        <p className="absolute right-14 top-2 hidden font-display text-[10px] tracking-[0.3em] text-muted-foreground sm:block">BUILD v2.6.0</p>
        <p className="absolute bottom-2 left-14 font-mono text-[10px] text-muted-foreground">X:042.19 Y:117.88 Z:003.41</p>
        <p className="absolute bottom-2 right-14 flex items-center gap-2 font-display text-[10px] tracking-[0.3em] text-neon-purple/80">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-purple animate-blink" /> REC
        </p>
      </div>

      {/* Holographic rings */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[78vmin] w-[78vmin] rounded-full border border-neon-blue/15 animate-spin-slow" style={{ borderStyle: 'dashed' }} />
        <div className="absolute inset-[10%] rounded-full border border-neon-purple/20 animate-spin-reverse" />
        <div className="absolute inset-[22%] rounded-full border-t-2 border-neon-blue/40 animate-spin-slow" style={{ animationDuration: '8s' }} />
        <div className="absolute inset-[30%] rounded-full bg-neon-purple/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center text-center">
        <p className="mb-6 font-display text-[11px] tracking-[0.5em] text-neon-blue/90 animate-rise-in">PLAYER ONE</p>
        <h1
          className="glitch font-display text-[28vw] font-black leading-none tracking-tight text-white text-glow-blue sm:text-[11rem] md:text-[13rem]"
          data-text="ANN"
        >
          ANN
        </h1>
        <p className="mt-2 font-display text-sm tracking-[0.6em] text-neon-purple text-glow-purple sm:text-lg">GAME DEVELOPER</p>
        <p className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          Building worlds, mechanics, and experiences through code.
        </p>

        <div className="mt-10 h-16 w-full max-w-sm">
          {ready ? (
            <button
              type="button"
              onClick={onEnter}
              autoFocus
              className="group relative mx-auto flex items-center gap-3 overflow-hidden border border-neon-blue/60 bg-neon-blue/10 px-8 py-4 font-display text-sm font-bold tracking-[0.3em] text-white clip-hud transition-all duration-300 animate-rise-in hover:bg-neon-blue/20 hover:shadow-[0_0_40px_rgb(59_164_255/0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-blue sm:text-base"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              ENTER MY WORLD
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          ) : (
            <div className="flex flex-col gap-2" role="status" aria-live="polite">
              <div className="flex justify-between font-display text-[10px] tracking-[0.3em] text-muted-foreground">
                <span>{line}</span>
                <span className="text-neon-blue">{progress}%</span>
              </div>
              <div className="h-1 overflow-hidden bg-white/5">
                <div
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_12px_rgb(59_164_255/0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { Briefcase, Cpu, FolderKanban, Home, Mail, MessageSquare, Trophy, User } from 'lucide-react'
import { NAV_ITEMS, type NavId } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

const ICONS = {
  home: Home,
  about: User,
  skills: Cpu,
  projects: FolderKanban,
  experience: Briefcase,
  achievements: Trophy,
  feedback: MessageSquare,
  contact: Mail,
}

export function HudNav({ active, onNavigate }: { active: NavId; onNavigate: (id: NavId) => void }) {
  const activeIndex = NAV_ITEMS.findIndex((n) => n.id === active)

  return (
    <>
      {/* Desktop HUD */}
      <header className="fixed inset-x-0 top-4 z-40 hidden justify-center px-4 md:flex">
        <div className="flex w-full max-w-6xl items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="glass hud-corners flex items-center gap-3 px-4 py-2.5"
            aria-label="Ann — back to home"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-blue" />
            </span>
            <span className="font-display text-xs font-bold tracking-[0.3em] text-white">ANN.EXE</span>
          </button>

          <nav aria-label="Main" className="glass relative rounded-full px-2 py-1.5">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = item.id === active
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'relative rounded-full px-3.5 py-2 font-display text-[10px] font-semibold tracking-[0.2em] transition-all duration-300 lg:px-4 lg:text-[11px]',
                        isActive
                          ? 'bg-neon-blue/15 text-white shadow-[0_0_18px_rgb(59_164_255/0.35)]'
                          : 'text-muted-foreground hover:bg-white/5 hover:text-white',
                      )}
                    >
                      {isActive && <span className="absolute -top-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-neon-blue" />}
                      {item.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="glass hud-corners hidden items-center gap-3 px-4 py-2.5 lg:flex" aria-hidden="true">
            <div className="flex h-4 items-end gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="w-0.5 origin-bottom bg-neon-purple"
                  style={{ height: '100%', animation: `eq ${0.6 + i * 0.15}s ease-in-out ${i * 0.1}s infinite` }}
                />
              ))}
            </div>
            <span className="font-display text-[10px] tracking-[0.25em] text-muted-foreground">
              LVL <span className="text-white">{String(activeIndex + 1).padStart(2, '0')}</span>/{String(NAV_ITEMS.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </header>

      {/* Mobile HUD */}
      <nav aria-label="Main" className="fixed inset-x-3 bottom-3 z-40 md:hidden">
        <ul className="glass flex items-center justify-between rounded-2xl px-1.5 py-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.id]
            const isActive = item.id === active
            return (
              <li key={item.id} className="flex-1">
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'flex w-full flex-col items-center gap-0.5 rounded-lg px-0.5 py-1.5 transition-colors sm:gap-1 sm:rounded-xl sm:py-2',
                    isActive ? 'bg-neon-blue/15 text-white' : 'text-muted-foreground',
                  )}
                >
                  <Icon className={cn('size-3.5 sm:size-4', isActive && 'text-neon-blue')} aria-hidden="true" />
                  <span className="font-display text-[6px] tracking-tight sm:text-[7px] sm:tracking-[0.12em]">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

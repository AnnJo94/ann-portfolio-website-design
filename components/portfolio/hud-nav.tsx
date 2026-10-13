'use client'

import Image from 'next/image'
import { Award, Briefcase, Cpu, FolderKanban, Globe, GraduationCap, Home, Mail, MessageSquare, Moon, Sun, Trophy, User, Wrench } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NAV_ITEMS, type NavId } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

const ICONS = {
  home: Home,
  about: User,
  education: GraduationCap,
  credentials: Award,
  skills: Cpu,
  experience: Briefcase,
  services: Wrench,
  projects: FolderKanban,
  achievements: Trophy,
  feedback: MessageSquare,
  contact: Mail,
}

export function HudNav({ active, onNavigate }: { active: NavId; onNavigate: (id: NavId) => void }) {
  const activeIndex = NAV_ITEMS.findIndex((n) => n.id === active)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [lang, setLang] = useState<'EN' | 'AR'>('EN')

  useEffect(() => {
    const savedTheme = localStorage.getItem('ann_theme') as 'dark' | 'light' | null
    if (savedTheme) {
      setTheme(savedTheme)
      if (savedTheme === 'light') {
        document.documentElement.classList.add('light')
      } else {
        document.documentElement.classList.remove('light')
      }
    }

    const savedLang = localStorage.getItem('ann_lang') as 'EN' | 'AR' | null
    if (savedLang) {
      setLang(savedLang)
      document.documentElement.setAttribute('dir', savedLang === 'AR' ? 'rtl' : 'ltr')
      document.documentElement.setAttribute('lang', savedLang.toLowerCase())
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('ann_theme', next)
    if (next === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }

  const toggleLang = () => {
    const next = lang === 'EN' ? 'AR' : 'EN'
    setLang(next)
    localStorage.setItem('ann_lang', next)
    document.documentElement.setAttribute('dir', next === 'AR' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', next.toLowerCase())
  }

  return (
    <>
      {/* Desktop HUD */}
      <header className="fixed inset-x-0 top-3 z-40 hidden justify-center px-4 md:flex">
        <div className="flex w-full max-w-7xl items-center justify-center relative">
          {/* Logo pinned neatly to the left */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="group absolute left-0 flex shrink-0 items-center p-0 transition-transform duration-300 hover:scale-105 focus:outline-none"
            aria-label="Ann — back to home"
          >
            {/* Crisp HD Logo */}
            <Image
              src="/images/logo.png"
              alt="Ann Portfolio Logo"
              width={72}
              height={72}
              className="h-10 w-auto max-w-[120px] object-contain animate-letter-sheen select-none transition-all duration-300 group-hover:brightness-125"
              priority
            />
          </button>

          {/* Centered Navigation Dock */}
          <nav aria-label="Main" className="glass relative mx-auto rounded-full px-1.5 py-1 shadow-lg">
            <ul className="flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const isActive = item.id === active
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'relative rounded-full px-2 py-1 font-display text-[8.5px] font-semibold tracking-tight transition-all duration-300 lg:px-2.5 lg:text-[9px] lg:tracking-wider xl:px-3 xl:text-[9.5px]',
                        isActive
                          ? 'bg-neon-blue/15 text-white shadow-[0_0_12px_rgb(59_164_255/0.35)]'
                          : 'text-muted-foreground hover:bg-white/5 hover:text-white',
                      )}
                    >
                      {isActive && <span className="absolute -top-0.5 left-1/2 h-0.5 w-2.5 -translate-x-1/2 rounded-full bg-neon-blue" />}
                      {lang === 'AR' ? item.labelAr : item.label}
                    </button>
                  </li>
                )
              })}

              {/* Language Switch Button: EN/AR */}
              <li className="ml-0.5 pl-1 border-l border-white/15">
                <button
                  type="button"
                  onClick={toggleLang}
                  aria-label="Switch Language EN/AR"
                  title="Switch Language EN/AR"
                  className={cn(
                    'flex h-6 items-center gap-1 rounded-full px-2 font-display text-[8.5px] font-bold tracking-wider transition-all duration-300',
                    'text-muted-foreground hover:bg-white/10 hover:text-white hover:shadow-[0_0_12px_rgb(59_164_255/0.4)]',
                  )}
                >
                  <Globe className="size-2.5 text-neon-blue" aria-hidden="true" />
                  <span>EN/AR</span>
                </button>
              </li>

              {/* Theme Toggle Button next to Language Switch on Desktop */}
              <li className="pl-0.5">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                  title={`Toggle ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                  className="flex size-6 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-[0_0_12px_rgb(59_164_255/0.4)]"
                >
                  {theme === 'dark' ? (
                    <Sun className="size-3 text-amber-300 transition-transform hover:rotate-45" aria-hidden="true" />
                  ) : (
                    <Moon className="size-3 text-neon-purple transition-transform hover:-rotate-12" aria-hidden="true" />
                  )}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile HUD */}
      <nav aria-label="Main" className="fixed inset-x-2 bottom-2 z-40 md:hidden">
        <ul className="glass flex items-center justify-between overflow-x-auto rounded-2xl px-1 py-1">
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.id]
            const isActive = item.id === active
            return (
              <li key={item.id} className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'flex w-full flex-col items-center gap-0.5 rounded-lg px-0.5 py-1 transition-colors',
                    isActive ? 'bg-neon-blue/15 text-white' : 'text-muted-foreground',
                  )}
                >
                  <Icon className={cn('size-3 sm:size-3.5', isActive && 'text-neon-blue')} aria-hidden="true" />
                  <span className="truncate font-display text-[5.5px] tracking-tight sm:text-[6.5px]">
                    {lang === 'AR' ? item.labelAr : item.label}
                  </span>
                </button>
              </li>
            )
          })}

          {/* Mobile Language Switch Button: EN/AR */}
          <li className="shrink-0 pl-1">
            <button
              type="button"
              onClick={toggleLang}
              aria-label="Toggle Language EN/AR"
              className="flex size-7 items-center justify-center rounded-lg bg-white/5 font-display text-[7.5px] font-bold text-muted-foreground transition-colors hover:text-white"
            >
              EN/AR
            </button>
          </li>

          {/* Mobile Theme Toggle Button */}
          <li className="shrink-0 pl-0.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="flex size-7 items-center justify-center rounded-lg bg-white/5 text-muted-foreground transition-colors hover:text-white"
            >
              {theme === 'dark' ? (
                <Sun className="size-3 text-amber-300" aria-hidden="true" />
              ) : (
                <Moon className="size-3 text-neon-purple" aria-hidden="true" />
              )}
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

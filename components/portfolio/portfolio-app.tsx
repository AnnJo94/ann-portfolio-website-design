'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { NAV_ITEMS, type NavId } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { AboutSection } from './about-section'
import { AchievementsSection } from './achievements-section'
import { ContactSection } from './contact-section'
import { CredentialsSection } from './credentials-section'
import { CustomCursor } from './custom-cursor'
import { EducationSection } from './education-section'
import { FeedbackSection } from './feedback-section'
import { GameDevLab } from './game-dev-lab'
import { HomeSection } from './home-section'
import { HudNav } from './hud-nav'
import { IntroScreen } from './intro-screen'
import { JourneySection } from './journey-section'
import { LevelTransition } from './level-transition'
import { ProjectsSection } from './projects-section'
import { ServicesSection } from './services-section'
import { SkillTree } from './skill-tree'
import { SpaceBackground } from './space-background'
import { WorkExperienceSection } from './work-experience-section'
import { WorldSection } from './world-section'

const SECTION_TO_NAV: Record<string, NavId> = {
  home: 'home',
  about: 'about',
  education: 'education',
  credentials: 'credentials',
  skills: 'skills',
  experience: 'experience',
  journey: 'experience',
  services: 'services',
  projects: 'projects',
  lab: 'projects',
  world: 'projects',
  achievements: 'achievements',
  feedback: 'feedback',
  contact: 'contact',
}

type Stage = 'intro' | 'warping' | 'world'

export function PortfolioApp() {
  const [stage, setStage] = useState<Stage>('intro')
  const [active, setActive] = useState<NavId>('home')
  const [transition, setTransition] = useState<{ visible: boolean; id: NavId }>({ visible: false, id: 'home' })
  const navigating = useRef(false)

  useEffect(() => {
    document.body.style.overflow = stage === 'world' ? '' : 'hidden'
  }, [stage])

  const enter = useCallback(() => {
    setStage('warping')
    setTimeout(() => setStage('world'), 1300)
  }, [])

  useEffect(() => {
    if (stage !== 'world') return
    const sections = Object.keys(SECTION_TO_NAV)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver(
      (entries) => {
        if (navigating.current) return
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(SECTION_TO_NAV[visible.target.id])
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.1] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [stage])

  const navigate = useCallback((id: NavId) => {
    const el = document.getElementById(id)
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setActive(id)
    if (reduced) {
      el.scrollIntoView({ behavior: 'auto' })
      return
    }
    navigating.current = true
    setTransition({ visible: true, id })
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'auto', block: 'start' })
      setTimeout(() => {
        setTransition((t) => ({ ...t, visible: false }))
        navigating.current = false
      }, 380)
    }, 520)
  }, [])

  const transitionIndex = NAV_ITEMS.findIndex((n) => n.id === transition.id)

  return (
    <>
      <SpaceBackground warp={stage === 'warping'} />
      <CustomCursor />

      {stage !== 'world' && <IntroScreen leaving={stage === 'warping'} onEnter={enter} />}

      {stage === 'world' && <HudNav active={active} onNavigate={navigate} />}

      {stage !== 'intro' && (
        <>
          <main className={cn(stage === 'warping' ? 'opacity-0' : 'animate-world-in')} aria-hidden={stage === 'warping' || undefined}>
            <HomeSection onNavigate={navigate} />
            <AboutSection />
            <EducationSection />
            <CredentialsSection />
            <SkillTree />
            <WorkExperienceSection />
            <JourneySection />
            <ServicesSection />
            <ProjectsSection />
            <GameDevLab />
            <WorldSection />
            <AchievementsSection />
            <FeedbackSection />
            <ContactSection />
          </main>
          <LevelTransition visible={transition.visible} index={transitionIndex} label={NAV_ITEMS[transitionIndex].label} />
        </>
      )}
    </>
  )
}

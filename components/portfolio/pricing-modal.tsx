'use client'

import {
  ArrowRight,
  Bug,
  Camera,
  Check,
  Code2,
  Cpu,
  DollarSign,
  FileCode,
  Flame,
  Gamepad2,
  Globe,
  Layers,
  MousePointer,
  Package,
  Rocket,
  ShieldCheck,
  Sliders,
  Sparkles,
  Terminal,
  Volume2,
  Wrench,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { OrderModal, type OrderItemDetails } from './order-modal'

export type ServicePlan = {
  id: string
  name: string
  tagline: string
  minPrice: number
  maxPrice: number
  priceSuffix: string
  popular?: boolean
  description: string
  idealFor: string
  delivery: string
  revisions: string
  deliverables: string[]
  accent: 'blue' | 'purple'
}

export type SingleServiceItem = {
  name: string
  category: 'GAMEDEV' | 'SOFTWARE'
  minPrice: number
  maxPrice: number
  unit: string
  desc: string
  easyTask?: boolean
  icon: typeof Wrench
}

/* ================== GAME DEV PACKAGES ================== */
export const GAME_DEV_PACKAGES: ServicePlan[] = [
  {
    id: 'game-starter',
    name: 'PROTOTYPE / SINGLE MECHANIC',
    tagline: 'Core Loop & Movement Feel',
    minPrice: 35,
    maxPrice: 65,
    priceSuffix: 'per mechanic',
    description: 'A focused, playable game mechanic or 2D/3D controller built in Unity with responsive game feel.',
    idealFor: 'Game jams, pitch demos, concept testing',
    delivery: '2 — 3 Days',
    revisions: '2 Revisions included',
    deliverables: [
      'Playable 2D / 3D player movement or mechanic',
      'Clean, structured C# scripts with comments',
      'Unity test sandbox scene with debug UI',
      'Input tuning (keyboard, mouse, gamepad)',
      'Complete Unity package source files (.unitypackage)',
    ],
    accent: 'blue',
  },
  {
    id: 'game-system',
    name: 'GAMEPLAY SYSTEM SUITE',
    tagline: 'Multi-Component Architecture',
    minPrice: 85,
    maxPrice: 150,
    priceSuffix: 'per system',
    popular: true,
    description: 'A complete gameplay architecture suite such as inventory, creature AI, combat loop, or day/night stats.',
    idealFor: 'Indie titles, vertical slices, milestone goals',
    delivery: '4 — 7 Days',
    revisions: 'Unlimited during active sprint',
    deliverables: [
      'ScriptableObjects modular architecture',
      'Enemy NavMesh AI / Finite State Machines',
      'Inventory, crafting, or combat combo systems',
      'In-game HUD integration & audio hooks',
      'Performance profiling for locked 60 FPS',
      'Video walkthrough & documentation guide',
    ],
    accent: 'purple',
  },
  {
    id: 'game-full',
    name: 'FULL VERTICAL SLICE / MINI-GAME',
    tagline: 'End-to-End Game Build',
    minPrice: 180,
    maxPrice: 320,
    priceSuffix: 'per project sprint',
    description: 'An entire playable level or complete mini-game with start/gameplay/game-over loops, sound, and build exports.',
    idealFor: 'Publishers, portfolios, complete game releases',
    delivery: '8 — 15 Days',
    revisions: 'Continuous milestone feedback',
    deliverables: [
      'Complete playable game vertical slice',
      'Main menu, pause, HUD, and settings UI',
      'Save/Load system & sound mixer integration',
      'Multi-wave enemies or multi-room level flow',
      'Standalone builds: PC (.exe) & WebGL browser build',
      'Complete GitHub repository handover',
    ],
    accent: 'blue',
  },
]

/* ================== SOFTWARE PACKAGES ================== */
export const SOFTWARE_PACKAGES: ServicePlan[] = [
  {
    id: 'soft-starter',
    name: 'UTILITY SCRIPT & TOOLING',
    tagline: 'Automation & Editor Tools',
    minPrice: 30,
    maxPrice: 55,
    priceSuffix: 'per tool',
    description: 'Custom desktop script, Unity custom editor tool, data parser, or workflow automation in C# / C++.',
    idealFor: 'Developers needing internal productivity tools',
    delivery: '1 — 3 Days',
    revisions: '2 Revisions included',
    deliverables: [
      'Custom Unity Editor inspector / window or C# tool',
      'Data import/export (JSON, XML, CSV, binary)',
      'Automated batch processors or asset generators',
      'Clean console logging & exception handling',
      'Source code & installation readme',
    ],
    accent: 'blue',
  },
  {
    id: 'soft-system',
    name: 'DESKTOP APP / ALGORITHM MODULE',
    tagline: 'Core Logic & Interactive App',
    minPrice: 70,
    maxPrice: 130,
    priceSuffix: 'per module',
    popular: true,
    description: 'Interactive desktop application, algorithmic simulator (pathfinding, sorting), or simulation tool.',
    idealFor: 'Projects needing high-performance logic or UI apps',
    delivery: '3 — 6 Days',
    revisions: '3 Revisions included',
    deliverables: [
      'Modern UI desktop interface (.NET / C# / C++)',
      'Optimized data structures & algorithm implementations',
      'Visual interactive state graphs / diagrams',
      'Asynchronous task processing (zero UI freezing)',
      'Tested build installer / executable + full source',
    ],
    accent: 'purple',
  },
  {
    id: 'soft-full',
    name: 'FULL SOFTWARE SOLUTION',
    tagline: 'End-to-End System & Integration',
    minPrice: 150,
    maxPrice: 280,
    priceSuffix: 'per solution',
    description: 'End-to-end software application with database/local storage, settings, complex user workflows, and support.',
    idealFor: 'Complete custom software, internal client tools',
    delivery: '7 — 12 Days',
    revisions: 'Continuous feedback during sprint',
    deliverables: [
      'Full architectural software engineering lifecycle',
      'Local database (SQLite) or cloud API integration',
      'Security, validation, and automated error recovery',
      'Clean modular codebase adhering to SOLID principles',
      'Deployment package & technical handoff session',
    ],
    accent: 'blue',
  },
]

/* ================== SINGLE SERVICES (INCLUDING $5 — $20 EASY TASKS) ================== */
export const SINGLE_SERVICES: SingleServiceItem[] = [
  // --- EASY QUICK GAME DEV TASKS ($5 — $20) ---
  {
    name: 'Script Bug Fix & Error Debugging',
    category: 'GAMEDEV',
    minPrice: 5,
    maxPrice: 15,
    unit: 'per error / script fix',
    desc: 'Quick fix for NullReferenceExceptions, broken triggers, syntax issues, or compile errors in Unity C#.',
    easyTask: true,
    icon: Bug,
  },
  {
    name: 'Audio Effects & SFX Integration',
    category: 'GAMEDEV',
    minPrice: 5,
    maxPrice: 12,
    unit: 'per audio integration',
    desc: 'Hook up footsteps, jumping, weapon audio, background music loops, and AudioMixer volume controls.',
    easyTask: true,
    icon: Volume2,
  },
  {
    name: 'Quick Camera Setup / Cinemachine Feel',
    category: 'GAMEDEV',
    minPrice: 8,
    maxPrice: 18,
    unit: 'per camera setup',
    desc: 'Setup Cinemachine virtual camera, smooth target follow, screen shake triggers, or deadzone tuning.',
    easyTask: true,
    icon: Camera,
  },
  {
    name: 'Simple UI Screen / Menu Connection',
    category: 'GAMEDEV',
    minPrice: 10,
    maxPrice: 20,
    unit: 'per menu / screen',
    desc: 'Connect start menu buttons, pause popup, game over screen, volume slider, or health bar fill slider.',
    easyTask: true,
    icon: MousePointer,
  },
  {
    name: 'WebGL or Windows Build Export',
    category: 'GAMEDEV',
    minPrice: 10,
    maxPrice: 20,
    unit: 'per tested build export',
    desc: 'Configure player settings, test build output, and prepare upload-ready files for Itch.io or WebGL.',
    easyTask: true,
    icon: Rocket,
  },
  {
    name: 'Inspector Parameters & Balance Setup',
    category: 'GAMEDEV',
    minPrice: 8,
    maxPrice: 15,
    unit: 'per character / asset',
    desc: 'Expose clean serialized fields, ScriptableObject data templates, and balance movement numbers.',
    easyTask: true,
    icon: Sliders,
  },

  // --- ADVANCED GAMEPLAY & SOFTWARE TASKS ---
  {
    name: 'Full 2D/3D Character Controller Tuning',
    category: 'GAMEDEV',
    minPrice: 25,
    maxPrice: 45,
    unit: 'per character / vehicle',
    desc: 'Tight 2D platformer movement, 3D first/third person controllers, sprint, jump, and coyote time feel.',
    icon: Gamepad2,
  },
  {
    name: 'Custom Enemy AI Behavior Tree / State',
    category: 'GAMEDEV',
    minPrice: 30,
    maxPrice: 55,
    unit: 'per enemy archetype',
    desc: 'NavMesh pathfinding, state machines (patrol route, sight line detection, chase, melee/ranged attack).',
    icon: Cpu,
  },
  {
    name: 'Custom Inventory or Crafting System',
    category: 'GAMEDEV',
    minPrice: 35,
    maxPrice: 65,
    unit: 'per system',
    desc: 'Grid inventory, hotbar selection, item pickup physics, and ScriptableObject item data templates.',
    icon: Layers,
  },
  {
    name: 'Algorithm Implementation (C++ / C#)',
    category: 'SOFTWARE',
    minPrice: 25,
    maxPrice: 50,
    unit: 'per algorithm',
    desc: 'Procedural maze generation, BFS/DFS pathfinding, graph solvers, or custom sorting pipelines.',
    icon: FileCode,
  },
  {
    name: 'Unity Editor Automation Tool / Window',
    category: 'SOFTWARE',
    minPrice: 30,
    maxPrice: 55,
    unit: 'per custom tool',
    desc: 'Custom inspector buttons, level spawner tools, or automated batch asset renamers.',
    icon: Wrench,
  },
]

export function PricingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'GAMEDEV' | 'SOFTWARE'>('GAMEDEV')
  const [serviceType, setServiceType] = useState<'PACKAGES' | 'SINGLE'>('PACKAGES')
  const [orderItem, setOrderItem] = useState<OrderItemDetails | null>(null)

  if (!isOpen) return null

  const currentPackages = activeTab === 'GAMEDEV' ? GAME_DEV_PACKAGES : SOFTWARE_PACKAGES
  const currentSingleServices = SINGLE_SERVICES.filter(
    (s) => (activeTab === 'GAMEDEV' ? s.category === 'GAMEDEV' : s.category === 'SOFTWARE')
  )

  const handleOrderPackage = (pkg: ServicePlan) => {
    setOrderItem({
      title: pkg.name,
      category: activeTab,
      priceRange: `$${pkg.minPrice} — $${pkg.maxPrice} ${pkg.priceSuffix}`,
      delivery: pkg.delivery,
      unitOrPeriod: pkg.priceSuffix,
    })
  }

  const handleOrderSingle = (srv: SingleServiceItem) => {
    setOrderItem({
      title: srv.name,
      category: activeTab,
      priceRange: `$${srv.minPrice} — $${srv.maxPrice}`,
      unitOrPeriod: srv.unit,
    })
  }

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-rise-in overflow-y-auto"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="glass hud-corners relative my-8 max-h-[92vh] w-full max-w-5xl overflow-y-auto p-5 sm:p-8"
        >
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2 font-display text-[9px] tracking-[0.3em] text-neon-blue">
                <Zap className="size-3.5 text-neon-purple" aria-hidden="true" />
                <span>COMMISSION RATES // TRANSPARENT LOADOUTS</span>
              </div>
              <h3 className="mt-1 font-display text-2xl font-black tracking-wide text-white sm:text-3xl">
                PRICING PLANS & COMMISSIONS
              </h3>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Affordable, milestone-based rates for indie game projects, quick tasks, and software tooling.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-background/80 text-white transition-colors hover:border-neon-blue hover:text-neon-blue"
              aria-label="Close Pricing Modal"
            >
              ✕
            </button>
          </div>

          {/* Dual Control Toggles: 1) Domain (Game Dev vs Software), 2) Offering (Packages vs Single Services) */}
          <div className="my-6 flex flex-wrap items-center justify-between gap-4">
            {/* Domain Tabs: Game Dev | Software */}
            <div className="flex items-center rounded-full border border-white/15 bg-background/80 p-1">
              <button
                type="button"
                onClick={() => setActiveTab('GAMEDEV')}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 font-display text-[10px] font-bold tracking-[0.2em] transition-all sm:text-xs',
                  activeTab === 'GAMEDEV'
                    ? 'bg-neon-blue/20 text-white shadow-[0_0_15px_rgb(59_164_255/0.4)] border border-neon-blue/60'
                    : 'text-muted-foreground hover:text-white',
                )}
              >
                <Gamepad2 className="size-3.5" aria-hidden="true" />
                <span>GAME DEV</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('SOFTWARE')}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 font-display text-[10px] font-bold tracking-[0.2em] transition-all sm:text-xs',
                  activeTab === 'SOFTWARE'
                    ? 'bg-neon-purple/20 text-white shadow-[0_0_15px_rgb(164_92_255/0.4)] border border-neon-purple/60'
                    : 'text-muted-foreground hover:text-white',
                )}
              >
                <Code2 className="size-3.5" aria-hidden="true" />
                <span>SOFTWARE</span>
              </button>
            </div>

            {/* Scope Toggle: Full Packages | Single Services */}
            <div className="flex items-center rounded-lg border border-white/10 bg-white/5 p-1 text-[11px]">
              <button
                type="button"
                onClick={() => setServiceType('PACKAGES')}
                className={cn(
                  'flex items-center gap-1.5 rounded px-3 py-1.5 font-display text-[9px] tracking-[0.15em] transition-all',
                  serviceType === 'PACKAGES'
                    ? 'bg-neon-blue/15 text-white border border-neon-blue/40 shadow-sm'
                    : 'text-muted-foreground hover:text-white',
                )}
              >
                <Package className="size-3 text-neon-blue" aria-hidden="true" />
                <span>FULL PACKAGES</span>
              </button>

              <button
                type="button"
                onClick={() => setServiceType('SINGLE')}
                className={cn(
                  'flex items-center gap-1.5 rounded px-3 py-1.5 font-display text-[9px] tracking-[0.15em] transition-all',
                  serviceType === 'SINGLE'
                    ? 'bg-neon-purple/15 text-white border border-neon-purple/40 shadow-sm'
                    : 'text-muted-foreground hover:text-white',
                )}
              >
                <Wrench className="size-3 text-neon-purple" aria-hidden="true" />
                <span>SINGLE & EASY TASKS ($5 — $20)</span>
              </button>
            </div>
          </div>

          {/* View 1: Complete Packages (3 Cards with Min — Max Range) */}
          {serviceType === 'PACKAGES' && (
            <div className="grid gap-6 md:grid-cols-3">
              {currentPackages.map((tier) => {
                const isPopular = tier.popular

                return (
                  <div
                    key={tier.id}
                    className={cn(
                      'glass hud-corners relative flex flex-col justify-between p-6 transition-all duration-300',
                      isPopular
                        ? 'border-neon-purple/70 bg-neon-purple/10 shadow-[0_0_35px_rgb(164_92_255/0.25)]'
                        : 'border-white/10 hover:border-neon-blue/50',
                    )}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="flex items-center gap-1 rounded-full border border-neon-purple bg-background px-3 py-0.5 font-display text-[8px] font-bold tracking-[0.2em] text-neon-purple shadow-lg">
                          <Sparkles className="size-2.5" aria-hidden="true" />
                          POPULAR CHOICE
                        </span>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-[8px] tracking-[0.2em] text-neon-blue">
                          {tier.tagline.toUpperCase()}
                        </span>
                        <span className="font-display text-[8px] text-muted-foreground">
                          {tier.delivery}
                        </span>
                      </div>

                      <h4 className="mt-2.5 font-display text-base font-bold text-white sm:text-lg">
                        {tier.name}
                      </h4>

                      {/* Price with Min — Max range */}
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="font-display text-2xl font-black text-white sm:text-3xl">
                          ${tier.minPrice} — ${tier.maxPrice}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground block mt-0.5">
                        {tier.priceSuffix}
                      </span>

                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        {tier.description}
                      </p>

                      <div className="mt-3.5 rounded border border-white/5 bg-white/5 p-2 text-[10px]">
                        <span className="block font-display text-[8px] tracking-[0.15em] text-neon-purple">
                          IDEAL FOR:
                        </span>
                        <span className="text-foreground/90">{tier.idealFor}</span>
                      </div>

                      {/* Deliverables list */}
                      <div className="mt-4 border-t border-white/5 pt-3.5">
                        <span className="font-display text-[8px] tracking-[0.2em] text-muted-foreground">
                          DELIVERABLES:
                        </span>
                        <ul className="mt-2 space-y-1.5 text-xs text-foreground/85">
                          {tier.deliverables.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="mt-0.5 size-3 shrink-0 text-emerald-400" aria-hidden="true" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-3">
                      <button
                        type="button"
                        onClick={() => handleOrderPackage(tier)}
                        className={cn(
                          'flex w-full items-center justify-center gap-2 border py-2.5 font-display text-[10px] font-bold tracking-[0.2em] transition-all clip-hud',
                          isPopular
                            ? 'border-neon-purple bg-neon-purple/20 text-white hover:bg-neon-purple/35 hover:shadow-[0_0_20px_rgb(164_92_255/0.4)]'
                            : 'border-neon-blue/60 bg-neon-blue/15 text-white hover:bg-neon-blue/25 hover:shadow-[0_0_20px_rgb(59_164_255/0.3)]',
                        )}
                      >
                        <span>ORDER THIS PACKAGE</span>
                        <ArrowRight className="size-3" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* View 2: Single A-La-Carte Services (Featuring $5 - $20 Easy Tasks) */}
          {serviceType === 'SINGLE' && (
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-display text-[9px] tracking-[0.2em] text-emerald-400">
                  ⚡ QUICK & BUDGET-FRIENDLY TASKS ($5 — $20)
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Order single tasks with fast turnaround
                </span>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                {currentSingleServices.map((srv, i) => {
                  const Icon = srv.icon
                  const isEasy = srv.easyTask

                  return (
                    <div
                      key={i}
                      className={cn(
                        'glass hud-corners group relative flex flex-col justify-between p-4 transition-all duration-300 hover:border-neon-blue/60 hover:shadow-[0_0_20px_rgb(59_164_255/0.2)]',
                        isEasy && 'border-emerald-400/30 bg-emerald-400/[0.04]',
                      )}
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <div className={cn(
                            'flex size-9 items-center justify-center border',
                            isEasy ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300' : 'border-neon-blue/40 bg-neon-blue/10 text-neon-blue'
                          )}>
                            <Icon className="size-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                          </div>

                          <div className="text-right">
                            {isEasy && (
                              <span className="mb-0.5 inline-block rounded bg-emerald-400/20 px-1.5 py-0.2 font-display text-[7px] font-bold tracking-wider text-emerald-300">
                                QUICK TASK
                              </span>
                            )}
                            <span className="block font-display text-sm font-bold text-white">
                              ${srv.minPrice} — ${srv.maxPrice}
                            </span>
                          </div>
                        </div>

                        <h5 className="mt-3 font-display text-sm font-bold text-white group-hover:text-glow-blue">
                          {srv.name}
                        </h5>
                        <span className="text-[10px] text-neon-purple font-medium block mt-0.5">
                          {srv.unit}
                        </span>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {srv.desc}
                        </p>
                      </div>

                      <div className="mt-4 border-t border-white/5 pt-3">
                        <button
                          type="button"
                          onClick={() => handleOrderSingle(srv)}
                          className={cn(
                            'inline-flex w-full items-center justify-center gap-1.5 border py-1.5 font-display text-[9px] tracking-[0.15em] text-white transition-all',
                            isEasy
                              ? 'border-emerald-400/50 bg-emerald-400/15 hover:bg-emerald-400/30'
                              : 'border-white/15 bg-white/5 hover:border-neon-blue/70 hover:bg-neon-blue/15'
                          )}
                        >
                          <span>ORDER THIS TASK</span>
                          <ArrowRight className="size-3 text-neon-blue" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Footer info note */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-400" aria-hidden="true" />
              <span>Escrow contracts supported on Upwork, Khamsat & Nafezly. Budget-friendly pricing.</span>
            </div>
            <span className="font-display text-[9px] tracking-[0.2em] text-neon-blue">
              CUSTOM MILESTONES ACCEPTED
            </span>
          </div>
        </div>
      </div>

      {/* Order Initiation Window */}
      <OrderModal
        isOpen={!!orderItem}
        onClose={() => setOrderItem(null)}
        item={orderItem}
      />
    </>
  )
}

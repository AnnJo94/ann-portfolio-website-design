'use client'

import {
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Globe,
  Mail,
  MessageSquare,
  Radio,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { CONTACT_LINKS } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

export type OrderItemDetails = {
  title: string
  category: 'GAME DEV' | 'SOFTWARE'
  priceRange: string
  delivery?: string
  unitOrPeriod?: string
}

export function OrderModal({
  isOpen,
  onClose,
  item,
}: {
  isOpen: boolean
  onClose: () => void
  item: OrderItemDetails | null
}) {
  const [platform, setPlatform] = useState<'EMAIL' | 'UPWORK' | 'BRAINTRUST' | 'FREELANCEYARD' | 'KHAMSAT' | 'NAFEZLY' | 'KAFIIL'>('EMAIL')
  const [clientName, setClientName] = useState('')
  const [projectBrief, setProjectBrief] = useState('')
  const [budgetEstimate, setBudgetEstimate] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sentSuccess, setSentSuccess] = useState(false)

  if (!isOpen || !item) return null

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const subject = encodeURIComponent(`Project Order Request: ${item.title} (${item.category})`)
    const body = encodeURIComponent(
      `Hello Ann,\n\nI want to order the following service package:\n\n• Service / Package: ${item.title}\n• Category: ${item.category}\n• Estimated Rate: ${item.priceRange}\n• Client Name: ${clientName || 'Not specified'}\n• Client Target Budget: ${budgetEstimate || item.priceRange}\n\nProject Brief & Requirements:\n${projectBrief}\n\nPreferred platform: ${platform}\n\nLooking forward to hearing from you!`
    )

    setTimeout(() => {
      setIsSubmitting(false)
      setSentSuccess(true)
      window.location.href = `mailto:${CONTACT_LINKS.email}?subject=${subject}&body=${body}`
    }, 700)
  }

  const getPlatformHref = () => {
    switch (platform) {
      case 'UPWORK':
        return CONTACT_LINKS.upwork
      case 'BRAINTRUST':
        return CONTACT_LINKS.braintrust
      case 'FREELANCEYARD':
        return CONTACT_LINKS.freelanceyard
      case 'KHAMSAT':
        return CONTACT_LINKS.khamsat
      case 'NAFEZLY':
        return CONTACT_LINKS.nafezly
      case 'KAFIIL':
        return CONTACT_LINKS.kafiil
      default:
        return `mailto:${CONTACT_LINKS.email}`
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-rise-in overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass hud-corners relative my-8 max-h-[92vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 font-display text-[9px] tracking-[0.3em] text-neon-blue">
              <Sparkles className="size-3.5 text-neon-purple" aria-hidden="true" />
              <span>COMMISSION INITIATION // STEP 2</span>
            </div>
            <h3 className="mt-1 font-display text-xl font-bold tracking-wide text-white sm:text-2xl">
              ORDER SERVICE PACKAGE
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full border border-white/20 bg-background/80 text-white transition-colors hover:border-neon-blue hover:text-neon-blue"
            aria-label="Close Order Form"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* Selected Package Summary Pill */}
        <div className="my-5 rounded-lg border border-neon-blue/40 bg-neon-blue/10 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-display text-[8px] tracking-[0.2em] text-neon-purple">
                SELECTED LOADOUT:
              </span>
              <h4 className="font-display text-base font-bold text-white">
                {item.title}
              </h4>
            </div>
            <div className="text-right">
              <span className="font-display text-lg font-black text-neon-blue">
                {item.priceRange}
              </span>
              {item.delivery && (
                <span className="block text-[9px] text-muted-foreground">
                  Est. Delivery: {item.delivery}
                </span>
              )}
            </div>
          </div>
        </div>

        {sentSuccess ? (
          <div className="py-8 text-center animate-rise-in">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-emerald-400 bg-emerald-400/15 text-emerald-300">
              <Check className="size-7" aria-hidden="true" />
            </div>
            <h4 className="mt-4 font-display text-lg font-bold text-white">
              TRANSMISSION READY!
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Your default email client has been launched with your pre-filled project brief.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="border border-white/20 bg-white/5 px-6 py-2.5 font-display text-xs font-bold tracking-[0.2em] text-white clip-hud hover:border-neon-blue hover:text-neon-blue"
              >
                DONE
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {/* Choose Platform */}
            <div>
              <label className="mb-1.5 block font-display text-[9px] tracking-[0.25em] text-muted-foreground">
                PREFERRED CONTACT / ESCROW PLATFORM:
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7">
                {(
                  [
                    { id: 'EMAIL', label: 'Direct Email', icon: Mail },
                    { id: 'UPWORK', label: 'Upwork', icon: Globe },
                    { id: 'BRAINTRUST', label: 'Braintrust', icon: Sparkles },
                    { id: 'FREELANCEYARD', label: 'FreelanceYard', icon: Briefcase },
                    { id: 'KHAMSAT', label: 'Khamsat', icon: Briefcase },
                    { id: 'NAFEZLY', label: 'Nafezly', icon: ShieldCheck },
                    { id: 'KAFIIL', label: 'Kafiil', icon: Check },
                  ] as const
                ).map((plt) => {
                  const Icon = plt.icon
                  const active = platform === plt.id
                  return (
                    <button
                      key={plt.id}
                      type="button"
                      onClick={() => setPlatform(plt.id)}
                      className={cn(
                        'flex flex-col items-center gap-1 rounded border p-2.5 text-center transition-all',
                        active
                          ? 'border-neon-blue bg-neon-blue/20 text-white shadow-[0_0_12px_rgb(59_164_255/0.3)]'
                          : 'border-white/10 bg-white/5 text-muted-foreground hover:border-white/25 hover:text-white',
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      <span className="font-display text-[9px] font-bold tracking-wider">{plt.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* If a freelance platform is selected, offer direct navigation */}
            {platform !== 'EMAIL' ? (
              <div className="rounded-lg border border-neon-purple/40 bg-neon-purple/10 p-4 text-center">
                <p className="text-xs text-foreground/90">
                  You selected <strong>{platform}</strong> for verified escrow protection. You can proceed directly to Ann&apos;s verified profile to open a custom contract:
                </p>
                <div className="mt-3.5 flex justify-center">
                  <a
                    href={getPlatformHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-neon-purple bg-neon-purple/20 px-6 py-2.5 font-display text-xs font-bold tracking-[0.2em] text-white clip-hud transition-all hover:bg-neon-purple/35"
                  >
                    <span>OPEN {platform} PROFILE</span>
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ) : null}

            {/* Name / Handle */}
            <div>
              <label className="mb-1 block font-display text-[9px] tracking-[0.2em] text-muted-foreground">
                YOUR NAME / STUDIO NAME:
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Alex (Indie Game Creator)"
                className="w-full border border-white/15 bg-background/70 px-3.5 py-2 font-sans text-sm text-white placeholder:text-muted-foreground/50 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue"
              />
            </div>

            {/* Target Budget */}
            <div>
              <label className="mb-1 block font-display text-[9px] tracking-[0.2em] text-muted-foreground">
                ESTIMATED BUDGET / TARGET (USD):
              </label>
              <input
                type="text"
                value={budgetEstimate}
                onChange={(e) => setBudgetEstimate(e.target.value)}
                placeholder={`Suggested: ${item.priceRange}`}
                className="w-full border border-white/15 bg-background/70 px-3.5 py-2 font-sans text-sm text-white placeholder:text-muted-foreground/50 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue"
              />
            </div>

            {/* Project Details Brief */}
            <div>
              <label className="mb-1 block font-display text-[9px] tracking-[0.2em] text-muted-foreground">
                PROJECT BRIEF & SPECIFICATIONS:
              </label>
              <textarea
                required
                rows={3}
                value={projectBrief}
                onChange={(e) => setProjectBrief(e.target.value)}
                placeholder="Tell me about your game mechanics, target engine version (e.g. Unity 6/2022), deadline, or any reference games..."
                className="w-full resize-none border border-white/15 bg-background/70 p-3 font-sans text-sm text-white placeholder:text-muted-foreground/50 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue"
              />
            </div>

            {/* Action buttons */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden border border-neon-blue/70 bg-neon-blue/20 py-3 font-display text-xs font-bold tracking-[0.25em] text-white clip-hud transition-all hover:bg-neon-blue/30 hover:shadow-[0_0_25px_rgb(59_164_255/0.4)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING INVOICE BRIEF...</span>
                ) : (
                  <>
                    <span>TRANSMIT ORDER REQUEST</span>
                    <Send className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

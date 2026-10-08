'use client'

import {
  Award,
  Check,
  Gamepad2,
  MessageSquare,
  Radio,
  Send,
  Sparkles,
  Star,
  ThumbsUp,
  User,
} from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

export type FeedbackEntry = {
  id: string
  name: string
  role: string
  rating: number
  comment: string
  tags: string[]
  timestamp: string
  likes: number
  verified?: boolean
}

const PRESET_TAGS = [
  '🎮 Gameplay Feel',
  '✨ 3D Visuals',
  '⚡ High Performance',
  '🎨 Cyberpunk Aesthetic',
  '💡 Creative Mechanics',
  '🤝 Ready to Collab',
]

const ROLE_OPTIONS = [
  'Game Developer',
  'Technical Recruiter',
  'Level Designer',
  'Player / Gamer',
  'Visitor',
]

const SEED_FEEDBACK: FeedbackEntry[] = [
  {
    id: 'seed-1',
    name: 'Marcus Vance',
    role: 'Lead Gameplay Engineer @ PixelCore Studio',
    rating: 5,
    comment:
      'The 3D space backdrop and interactive skill tree feel like an authentic game engine dashboard. Maze Explorer demo runs with zero stutter — solid engineering mastery!',
    tags: ['🎮 Gameplay Feel', '⚡ High Performance', '✨ 3D Visuals'],
    timestamp: '2 DAYS AGO',
    likes: 18,
    verified: true,
  },
  {
    id: 'seed-2',
    name: 'Elena Rostova',
    role: 'Senior Tech Talent Partner @ Apex Interactive',
    rating: 5,
    comment:
      'One of the most creative and memorable game dev portfolios I have reviewed this quarter. Clear technical skill progression and impressive attention to UI juice.',
    tags: ['🤝 Ready to Collab', '💡 Creative Mechanics'],
    timestamp: '5 DAYS AGO',
    likes: 12,
    verified: true,
  },
]

const RATING_DESCRIPTIONS: Record<number, string> = {
  1: 'NEEDS BALANCE PATCH',
  2: 'PLAYABLE BUILD',
  3: 'GOOD MECHANICS',
  4: 'EXCELLENT GAME FEEL',
  5: 'LEGENDARY S-RANK',
}

const BURST_PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * Math.PI * 2
  const dist = 70 + (i % 3) * 25
  return {
    tx: Math.cos(angle) * dist,
    ty: Math.sin(angle) * dist,
    color: i % 2 ? 'var(--neon-blue)' : 'var(--neon-purple)',
    delay: (i % 3) * 40,
  }
})

function playChime() {
  if (typeof window === 'undefined') return
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(587.33, now) // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12) // A5
    osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.28) // D6

    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.36)
  } catch {
    // Audio context may be restricted before interaction; safe to ignore
  }
}

export function FeedbackSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })
  const formId = useId()

  const [reviews, setReviews] = useState<FeedbackEntry[]>(SEED_FEEDBACK)
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())
  const [activeFilter, setActiveFilter] = useState<'ALL' | '5-STAR' | 'DEVS' | 'RECRUITERS'>('ALL')

  // Form State
  const [rating, setRating] = useState<number>(5)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [name, setName] = useState('')
  const [role, setRole] = useState('Game Developer')
  const [selectedTags, setSelectedTags] = useState<string[]>(['🎮 Gameplay Feel'])
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [burstKey, setBurstKey] = useState(0)

  // Load from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ann_feedback_entries_v1')
      if (stored) {
        const parsed = JSON.parse(stored) as FeedbackEntry[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews([...parsed, ...SEED_FEEDBACK])
        }
      }
      const storedLikes = localStorage.getItem('ann_feedback_likes_v1')
      if (storedLikes) {
        const parsedLikes = JSON.parse(storedLikes) as string[]
        if (Array.isArray(parsedLikes)) {
          setLikedIds(new Set(parsedLikes))
        }
      }
    } catch {
      // LocalStorage disabled or unavailable
    }
  }, [])

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )
  }

  const handleLike = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r
        const alreadyLiked = likedIds.has(id)
        return { ...r, likes: alreadyLiked ? r.likes - 1 : r.likes + 1 }
      }),
    )

    setLikedIds((prev) => {
      const updated = new Set(prev)
      if (updated.has(id)) {
        updated.delete(id)
      } else {
        updated.add(id)
      }
      try {
        localStorage.setItem('ann_feedback_likes_v1', JSON.stringify(Array.from(updated)))
      } catch {
        // Ignore storage error
      }
      return updated
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim() && !name.trim()) return

    setIsSubmitting(true)
    playChime()

    setTimeout(() => {
      const newEntry: FeedbackEntry = {
        id: `user-${Date.now()}`,
        name: name.trim() || 'Player 1',
        role: role.trim() || 'Player / Gamer',
        rating,
        comment: comment.trim() || 'Transmitted transmission telemetry.',
        tags: selectedTags.length > 0 ? selectedTags : ['🎮 Gameplay Feel'],
        timestamp: 'JUST NOW',
        likes: 1,
        verified: false,
      }

      setReviews((prev) => [newEntry, ...prev])
      setIsSubmitting(false)
      setIsSuccess(true)
      setBurstKey((k) => k + 1)

      try {
        const existing = localStorage.getItem('ann_feedback_entries_v1')
        const currentCustom: FeedbackEntry[] = existing ? JSON.parse(existing) : []
        localStorage.setItem('ann_feedback_entries_v1', JSON.stringify([newEntry, ...currentCustom]))
      } catch {
        // Storage full or unavailable
      }
    }, 600)
  }

  const handleResetForm = () => {
    setName('')
    setComment('')
    setRating(5)
    setSelectedTags(['🎮 Gameplay Feel'])
    setIsSuccess(false)
  }

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === '5-STAR') return r.rating === 5
    if (activeFilter === 'DEVS') return r.role.toLowerCase().includes('dev') || r.role.toLowerCase().includes('engineer') || r.role.toLowerCase().includes('designer')
    if (activeFilter === 'RECRUITERS') return r.role.toLowerCase().includes('recruiter') || r.role.toLowerCase().includes('talent') || r.role.toLowerCase().includes('producer')
    return true
  })

  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)
  ).toFixed(1)

  return (
    <section id="feedback" className="relative px-6 pb-20 pt-20 md:px-10 md:pb-24 md:pt-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="11"
          kicker="MISSION DEBRIEF"
          title="PLAYER FEEDBACK"
          description="Transmitted logs and debrief evaluations from players, colleagues, and collaborators."
          align="center"
        />

        {/* Global HUD Stats Strip */}
        <div
          ref={ref}
          data-visible={inView}
          className="reveal mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          <div className="glass hud-corners p-4 text-center">
            <span className="flex items-center justify-center gap-1.5 font-display text-2xl font-bold text-white sm:text-3xl">
              <Star className="size-5 fill-amber-400 text-amber-400" aria-hidden="true" />
              {averageRating}
            </span>
            <span className="mt-1 block font-display text-[9px] tracking-[0.25em] text-muted-foreground">
              AVG SCORE / 5.0
            </span>
          </div>
          <div className="glass hud-corners p-4 text-center">
            <span className="font-display text-2xl font-bold text-neon-blue text-glow-blue sm:text-3xl">
              {reviews.length}+
            </span>
            <span className="mt-1 block font-display text-[9px] tracking-[0.25em] text-muted-foreground">
              TOTAL DEBRIEFS
            </span>
          </div>
          <div className="glass hud-corners p-4 text-center">
            <span className="font-display text-2xl font-bold text-emerald-400 sm:text-3xl">99%</span>
            <span className="mt-1 block font-display text-[9px] tracking-[0.25em] text-muted-foreground">
              APPROVAL RATE
            </span>
          </div>
          <div className="glass hud-corners p-4 text-center">
            <span className="flex items-center justify-center gap-2 font-display text-xs font-semibold text-neon-purple sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-purple opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-purple" />
              </span>
              TRANSMITTING
            </span>
            <span className="mt-1 block font-display text-[9px] tracking-[0.25em] text-muted-foreground">
              CHANNEL STATUS
            </span>
          </div>
        </div>

        {/* Main 2-column layout: Left = Form / Right = Reviews Feed */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Form Column */}
          <div className="lg:col-span-5">
            <div className="glass hud-corners relative p-6 sm:p-7">
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Radio className="size-4 text-neon-blue" aria-hidden="true" />
                  <h3 className="font-display text-xs font-bold tracking-[0.25em] text-white">
                    TRANSMIT DEBRIEF
                  </h3>
                </div>
                <span className="rounded bg-neon-blue/15 px-2 py-0.5 font-display text-[8px] tracking-[0.2em] text-neon-blue">
                  SYS.FORM_09
                </span>
              </div>

              {isSuccess ? (
                <div className="relative py-8 text-center animate-rise-in">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-400/15 shadow-[0_0_30px_rgb(52_211_153/0.4)]">
                    <Check className="size-7 text-emerald-300" aria-hidden="true" />
                  </div>
                  <h4 className="mt-5 font-display text-lg font-bold tracking-[0.15em] text-white">
                    TRANSMISSION RECEIVED!
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your debrief has been encrypted and added to the official mission logs.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded border border-neon-purple/40 bg-neon-purple/10 px-3 py-1 font-display text-[10px] tracking-[0.25em] text-neon-purple">
                    <Sparkles className="size-3.5" aria-hidden="true" />
                    REWARD: +250 XP
                  </div>

                  {burstKey > 0 && (
                    <div
                      key={burstKey}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-14"
                    >
                      <span
                        className="absolute left-0 top-0 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400"
                        style={{ animation: 'pulse-ring 0.9s ease-out forwards' }}
                      />
                      {BURST_PARTICLES.map((p, i) => (
                        <span
                          key={i}
                          className="absolute left-0 top-0 size-1 rounded-full"
                          style={
                            {
                              background: p.color,
                              boxShadow: `0 0 8px ${p.color}`,
                              '--tx': `${p.tx}px`,
                              '--ty': `${p.ty}px`,
                              animation: `burst 0.85s cubic-bezier(0.2,0.8,0.2,1) ${p.delay}ms forwards`,
                            } as React.CSSProperties
                          }
                        />
                      ))}
                    </div>
                  )}

                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="border border-neon-blue/60 bg-neon-blue/15 px-6 py-2.5 font-display text-xs font-bold tracking-[0.2em] text-white clip-hud transition-all hover:bg-neon-blue/25"
                    >
                      TRANSMIT ANOTHER LOG
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Rating Selector */}
                  <div>
                    <label className="mb-2 block font-display text-[10px] tracking-[0.25em] text-muted-foreground">
                      EXPERIENCE RATING
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Rating">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const active = (hoverRating || rating) >= star
                          return (
                            <button
                              key={star}
                              type="button"
                              onClick={() => {
                                setRating(star)
                                playChime()
                              }}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              aria-label={`${star} Stars`}
                              className="group p-1 transition-transform hover:scale-125 focus:outline-none"
                            >
                              <Star
                                className={cn(
                                  'size-6 transition-colors duration-200',
                                  active
                                    ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgb(251_191_36/0.7)]'
                                    : 'text-white/20 hover:text-white/40',
                                )}
                                aria-hidden="true"
                              />
                            </button>
                          )
                        })}
                      </div>
                      <span className="ml-2 font-display text-[9px] tracking-[0.2em] text-neon-blue">
                        [{RATING_DESCRIPTIONS[hoverRating || rating]}]
                      </span>
                    </div>
                  </div>

                  {/* Player Name */}
                  <div>
                    <label
                      htmlFor={`${formId}-name`}
                      className="mb-1.5 flex items-center justify-between font-display text-[10px] tracking-[0.25em] text-muted-foreground"
                    >
                      <span>PLAYER CALL-SIGN</span>
                      <span className="text-[9px] text-muted-foreground/70">NAME OR HANDLE</span>
                    </label>
                    <div className="relative">
                      <input
                        id={`${formId}-name`}
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. CyberKnight, Alex Dev"
                        className="w-full border border-white/15 bg-background/60 px-3.5 py-2.5 font-sans text-sm text-white placeholder:text-muted-foreground/50 focus:border-neon-blue/80 focus:outline-none focus:ring-1 focus:ring-neon-blue"
                      />
                    </div>
                  </div>

                  {/* Player Role */}
                  <div>
                    <label className="mb-1.5 block font-display text-[10px] tracking-[0.25em] text-muted-foreground">
                      CLASS / ROLE
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {ROLE_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setRole(opt)}
                          className={cn(
                            'border px-2.5 py-1 text-xs transition-colors',
                            role === opt
                              ? 'border-neon-purple/70 bg-neon-purple/20 text-white shadow-[0_0_12px_rgb(164_92_255/0.3)]'
                              : 'border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-white',
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags Selector */}
                  <div>
                    <label className="mb-1.5 block font-display text-[10px] tracking-[0.25em] text-muted-foreground">
                      HIGHLIGHT TAGS
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_TAGS.map((tag) => {
                        const isSelected = selectedTags.includes(tag)
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleToggleTag(tag)}
                            className={cn(
                              'border px-2.5 py-1 text-[11px] transition-all',
                              isSelected
                                ? 'border-neon-blue/70 bg-neon-blue/20 text-white shadow-[0_0_10px_rgb(59_164_255/0.3)]'
                                : 'border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-white',
                            )}
                          >
                            {tag}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label
                      htmlFor={`${formId}-comment`}
                      className="mb-1.5 flex items-center justify-between font-display text-[10px] tracking-[0.25em] text-muted-foreground"
                    >
                      <span>DEBRIEF LOG</span>
                      <span className="text-[9px]">{comment.length}/400</span>
                    </label>
                    <textarea
                      id={`${formId}-comment`}
                      required
                      rows={3}
                      maxLength={400}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts on the games, animations, UI, or leave a note..."
                      className="w-full resize-none border border-white/15 bg-background/60 p-3 font-sans text-sm text-white placeholder:text-muted-foreground/50 focus:border-neon-blue/80 focus:outline-none focus:ring-1 focus:ring-neon-blue"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden border border-neon-blue/60 bg-neon-blue/20 py-3.5 font-display text-xs font-bold tracking-[0.3em] text-white clip-hud transition-all hover:bg-neon-blue/30 hover:shadow-[0_0_30px_rgb(59_164_255/0.45)] disabled:opacity-50"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    />
                    {isSubmitting ? (
                      <>
                        <span>TRANSMITTING TELEMETRY...</span>
                        <Radio className="size-4 animate-spin text-neon-blue" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT DEBRIEF</span>
                        <Send className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Feedback Feed Column */}
          <div className="flex flex-col gap-5 lg:col-span-7">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {(
                  [
                    { id: 'ALL', label: 'ALL LOGS' },
                    { id: '5-STAR', label: '5-STAR S-RANK' },
                    { id: 'DEVS', label: 'DEVELOPERS' },
                    { id: 'RECRUITERS', label: 'RECRUITERS' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    className={cn(
                      'rounded px-3 py-1.5 font-display text-[10px] tracking-[0.2em] transition-all',
                      activeFilter === tab.id
                        ? 'border border-neon-blue/60 bg-neon-blue/20 text-white shadow-[0_0_12px_rgb(59_164_255/0.3)]'
                        : 'text-muted-foreground hover:bg-white/5 hover:text-white',
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <span className="font-display text-[9px] tracking-[0.2em] text-muted-foreground">
                COUNT: {filteredReviews.length}
              </span>
            </div>

            {/* List of review cards */}
            <div className="space-y-4">
              {filteredReviews.map((entry) => {
                const isLiked = likedIds.has(entry.id)
                return (
                  <article
                    key={entry.id}
                    className="glass hud-corners group p-5 transition-all duration-300 hover:border-neon-blue/40 hover:shadow-[0_0_24px_rgb(59_164_255/0.15)]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center border border-neon-blue/30 bg-neon-blue/10">
                          {entry.role.toLowerCase().includes('dev') ? (
                            <Gamepad2 className="size-5 text-neon-blue" aria-hidden="true" />
                          ) : entry.role.toLowerCase().includes('recruiter') ? (
                            <Award className="size-5 text-neon-purple" aria-hidden="true" />
                          ) : (
                            <User className="size-5 text-neon-blue" aria-hidden="true" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-display text-sm font-bold text-white">
                              {entry.name}
                            </h4>
                            {entry.verified && (
                              <span className="flex items-center gap-1 rounded bg-neon-blue/15 px-1.5 py-0.2 font-display text-[8px] tracking-[0.1em] text-neon-blue">
                                <Check className="size-2.5" aria-hidden="true" /> VERIFIED
                              </span>
                            )}
                          </div>
                          <p className="font-display text-[10px] tracking-[0.15em] text-muted-foreground">
                            {entry.role}
                          </p>
                        </div>
                      </div>

                      {/* Stars & Timestamp */}
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'size-3.5',
                                i < entry.rating
                                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgb(251_191_36/0.5)]'
                                  : 'text-white/20',
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <span className="font-display text-[8px] tracking-[0.2em] text-muted-foreground/70">
                          {entry.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Comment Body */}
                    <p className="mt-3.5 text-sm leading-relaxed text-foreground/90">
                      &ldquo;{entry.comment}&rdquo;
                    </p>

                    {/* Tags & GG Cheering Button */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-3">
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleLike(entry.id)}
                        className={cn(
                          'flex items-center gap-1.5 rounded px-2.5 py-1 font-display text-[10px] tracking-[0.15em] transition-all',
                          isLiked
                            ? 'border border-neon-blue/60 bg-neon-blue/20 text-white shadow-[0_0_10px_rgb(59_164_255/0.4)]'
                            : 'border border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-white',
                        )}
                        aria-label={`Like review. Current count: ${entry.likes}`}
                      >
                        <ThumbsUp className={cn('size-3.5', isLiked && 'text-neon-blue fill-neon-blue')} aria-hidden="true" />
                        <span>GG ({entry.likes})</span>
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        {/* Optional divider before footer */}
        <div className="mt-16 h-px w-full bg-white/10" aria-hidden="true" />
      </div>
    </section>
  )
}

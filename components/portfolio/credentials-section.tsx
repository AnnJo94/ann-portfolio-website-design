'use client'

import Image from 'next/image'
import {
  Award,
  ExternalLink,
  Eye,
  FileText,
  ShieldCheck,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

export type CertificateCategory =
  | 'ALL'
  | 'Game Dev'
  | 'Cyber'
  | 'AI & Data'
  | 'Programming'
  | 'Soft Skills'
  | 'Events'

export type CertificateItem = {
  title: string
  issuer: string
  category: 'Game Dev' | 'Cyber' | 'AI & Data' | 'Programming' | 'Soft Skills' | 'Events'
  subCategory?: string
  pdfFile: string
  previewImage?: string
  badge: string
}

export const CREDENTIALS_DATA: CertificateItem[] = [
  {
    title: "Mobile 5G Network Technology",
    issuer: "Telecom & Cyber Systems Training",
    category: "Cyber",
    subCategory: "Mobile 5G Architecture, Infrastructure & Security",
    pdfFile: "/certificates/Certificate.pdf",
    previewImage: "/images/certificates/cert_game_dev.png",
    badge: "5G & CYBER",
  },
  {
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy / RST",
    category: "AI & Data",
    subCategory: "Artificial Intelligence Foundations",
    pdfFile: "/certificates/Introduction_to_Modern_AI_certificate_2401136-rst-edu-eg_dbf7ad69-6f51-4e2f-a0f6-f9c591d07365.pdf",
    previewImage: "/images/certificates/cert_modern_ai.png",
    badge: "AI & DATA",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy / RST",
    category: "Cyber",
    subCategory: "Network Defense & Threat Analysis",
    pdfFile: "/certificates/Introduction_to_Cybersecurity_certificate_2401136-rst-edu-eg_68c485cc-095e-4dc7-99d7-6c934ab8e7ee.pdf",
    previewImage: "/images/certificates/cert_cybersecurity.png",
    badge: "CYBER",
  },
  {
    title: "Digital Safety & Security Awareness",
    issuer: "Cisco Networking Academy / RST",
    category: "Cyber",
    subCategory: "Information Protection & Defense",
    pdfFile: "/certificates/Digital_Safety_and_Security_Awareness_certificate_2401136-rst-edu-eg_6471bbfb-e138-4b71-90f0-ccdf6a230261.pdf",
    previewImage: "/images/certificates/cert_digital_safety.png",
    badge: "CYBER",
  },
  {
    title: "Networking Basics",
    issuer: "Cisco Networking Academy / RST",
    category: "Programming",
    subCategory: "Network Protocols & OSI Architecture",
    pdfFile: "/certificates/Networking_Basics_certificate_2401136-rst-edu-eg_a84084dd-bef7-4324-956d-0e9825c1cede.pdf",
    previewImage: "/images/certificates/cert_networking_basics.png",
    badge: "PROGRAMMING",
  },
  {
    title: "Network Technician Career Path",
    issuer: "Cisco Networking Academy / RST",
    category: "Programming",
    subCategory: "Hardware Config & Systems Architecture",
    pdfFile: "/certificates/Network_Technician_Career_Path_certificate_2401136-rst-edu-eg_9cf55ff4-d667-4ea1-b8d4-fd746013f1be.pdf",
    previewImage: "/images/certificates/cert_network_technician.png",
    badge: "PROGRAMMING",
  },
  {
    title: "Industrial Networking Essentials",
    issuer: "Cisco Networking Academy / RST",
    category: "Programming",
    subCategory: "Industrial Systems & Hardware Routing",
    pdfFile: "/certificates/Industrial_Networking_Essentials_certificate_2401136-rst-edu-eg_9e064df7-f205-47b1-bbb9-1f137d7b6ddc.pdf",
    previewImage: "/images/certificates/cert_industrial_networking.png",
    badge: "PROGRAMMING",
  },
  {
    title: "Introduction to IoT & Digital Transformation",
    issuer: "Cisco Networking Academy / RST",
    category: "AI & Data",
    subCategory: "Smart Connected Devices & Telemetry",
    pdfFile: "/certificates/Introduction_to_IoT_and_Digital_Transformation_certificate_2401136-rst-edu-eg_94287825-7228-4cdf-b94d-f83a097c856c.pdf",
    previewImage: "/images/certificates/cert_iot.png",
    badge: "AI & DATA",
  },
]

export function CredentialsSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [activeModalImg, setActiveModalImg] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<CertificateCategory>('ALL')

  const filteredCerts = CREDENTIALS_DATA.filter((cert) => {
    if (activeCategory === 'ALL') return true
    return cert.category === activeCategory
  })

  return (
    <section id="credentials" className="relative px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          kicker="OFFICIAL ACCREDITATIONS"
          title="CREDENTIALS"
          description="Verified certifications, technical achievements, and industry course completions."
        />

        {/* Category Filter Tabs */}
        <div ref={ref} data-visible={inView} className="reveal mb-8 flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
          {(
            [
              'ALL',
              'Game Dev',
              'Cyber',
              'AI & Data',
              'Programming',
              'Soft Skills',
              'Events',
            ] as CertificateCategory[]
          ).map((cat) => {
            const isSelected = activeCategory === cat
            const count =
              cat === 'ALL'
                ? CREDENTIALS_DATA.length
                : CREDENTIALS_DATA.filter((c) => c.category === cat).length

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[9.5px] font-bold tracking-wider transition-all',
                  isSelected
                    ? 'border border-neon-blue/80 bg-neon-blue/20 text-white shadow-[0_0_15px_rgb(59_164_255/0.35)]'
                    : 'border border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-white',
                )}
              >
                <span>{cat.toUpperCase()}</span>
                <span className={cn('text-[8.5px]', isSelected ? 'text-neon-blue' : 'text-muted-foreground/70')}>
                  ({count})
                </span>
              </button>
            )
          })}
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredCerts.map((cert, i) => (
            <div
              key={cert.title}
              data-visible={inView}
              className="reveal glass hud-corners group relative flex flex-col justify-between overflow-hidden p-4 transition-all duration-300 hover:-translate-y-1 hover:border-neon-blue/60 hover:shadow-[0_0_25px_rgb(59_164_255/0.25)]"
              style={{ transitionDelay: `${0.08 + (i % 4) * 0.08}s` }}
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="rounded border border-white/15 bg-white/5 px-2 py-0.5 font-display text-[8px] tracking-[0.15em] text-neon-purple">
                    {cert.badge}
                  </span>
                  <FileText className="size-3.5 text-muted-foreground group-hover:text-neon-blue" aria-hidden="true" />
                </div>

                <h4 className="mt-3 font-display text-sm font-bold text-white group-hover:text-glow-blue leading-snug">
                  {cert.title}
                </h4>
                <p className="mt-1 text-xs text-muted-foreground">{cert.issuer}</p>
                {cert.subCategory && (
                  <span className="mt-1.5 inline-block text-[10px] text-neon-blue/80">
                    • {cert.subCategory}
                  </span>
                )}

                {/* Direct image preview under its title */}
                {cert.previewImage && (
                  <div
                    onClick={() => setActiveModalImg(cert.previewImage!)}
                    className="group/img relative mt-3.5 aspect-[16/11] w-full cursor-pointer overflow-hidden rounded-md border border-white/15 bg-background/50 transition-all duration-300 hover:border-neon-purple/70 hover:shadow-[0_0_20px_rgb(164_92_255/0.3)]"
                  >
                    <Image
                      src={cert.previewImage}
                      alt={`${cert.title} Preview`}
                      fill
                      sizes="(min-width: 1024px) 250px, 50vw"
                      className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-60 transition-opacity group-hover/img:opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/img:opacity-100">
                      <span className="rounded border border-neon-blue/80 bg-background/90 px-2.5 py-1 font-display text-[8px] tracking-[0.15em] text-white shadow-md backdrop-blur-sm">
                        INSPECT
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons footer */}
              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                {cert.previewImage ? (
                  <button
                    type="button"
                    onClick={() => setActiveModalImg(cert.previewImage!)}
                    className="inline-flex items-center gap-1 font-display text-[9px] tracking-[0.15em] text-neon-blue hover:text-white"
                  >
                    <Eye className="size-3" aria-hidden="true" />
                    <span>PREVIEW</span>
                  </button>
                ) : (
                  <span className="font-display text-[8px] tracking-[0.15em] text-muted-foreground/60">
                    OFFICIAL PDF
                  </span>
                )}

                <a
                  href={cert.pdfFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-display text-[9px] tracking-[0.15em] text-white/90 hover:text-neon-purple"
                >
                  <span>OPEN PDF</span>
                  <ExternalLink className="size-2.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Certificate Inspection Modal */}
      {activeModalImg && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveModalImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-rise-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass hud-corners relative max-h-[90vh] max-w-4xl overflow-hidden p-3"
          >
            <button
              type="button"
              onClick={() => setActiveModalImg(null)}
              aria-label="Close Preview"
              className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full border border-white/20 bg-background/80 text-white transition-colors hover:border-neon-blue hover:text-neon-blue"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
            <div className="relative aspect-[16/10] h-[75vh] w-auto max-w-full">
              <Image
                src={activeModalImg}
                alt="Certificate Enlarged View"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

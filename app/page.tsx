'use client'

import { useEffect, useRef } from 'react'

const projects = [
  {
    domain: 'deadr.live',
    desc: 'A daily dead-or-alive celebrity trivia game. Themed categories, funny titles, shareable results. New puzzle every day.',
    url: 'https://deadr.live',
    status: 'live' as const,
    shotPos: 'top center',
    localShot: null as string | null,
  },
  {
    domain: 'full.link',
    desc: 'Professional services site for a Workday Financials CPA consulting firm. Custom visual identity, built to convert.',
    url: 'https://full.link',
    status: 'live' as const,
    shotPos: 'left top',
    localShot: null as string | null,
  },
  {
    domain: 'meganbannon.com',
    desc: 'Personal website with a distinctive visual identity and clean typographic system for lasting professional presence.',
    url: 'https://meganbannon.com',
    status: 'live' as const,
    shotPos: 'right top',
    localShot: null as string | null,
  },
  {
    domain: 'Kinbank',
    desc: "Family app for tracking kids' chores, allowances, points and savings goals. Multi-household, with parent and kid logins.",
    url: null,
    status: 'wip' as const,
    shotPos: 'top center',
    localShot: '/kinbank-flow.svg' as string | null,
  },
  {
    domain: 'FriscoPTSA',
    desc: 'Real-time silent auction platform for school fundraisers. Live bidding, item tracking, and instant totals — all in the browser.',
    url: null,
    status: 'wip' as const,
    shotPos: 'top center',
    localShot: '/friscoptsa-flow.svg' as string | null,
  },
]

// Spotlight: middle ~36% of viewport fully bright, fades out above/below.
const MASK = [
  'linear-gradient(to bottom,',
  '  transparent              calc(var(--sc) - 56vh),',
  '  rgba(0,0,0,.04)          calc(var(--sc) - 46vh),',
  '  rgba(0,0,0,.22)          calc(var(--sc) - 32vh),',
  '  rgba(0,0,0,.68)          calc(var(--sc) - 22vh),',
  '  black                    calc(var(--sc) - 18vh),',
  '  black                    calc(var(--sc) + 18vh),',
  '  rgba(0,0,0,.68)          calc(var(--sc) + 22vh),',
  '  rgba(0,0,0,.22)          calc(var(--sc) + 32vh),',
  '  rgba(0,0,0,.04)          calc(var(--sc) + 46vh),',
  '  transparent              calc(var(--sc) + 56vh)',
  ')',
].join('\n')

export default function Home() {
  const stackRef = useRef<HTMLDivElement>(null)

  // Spotlight: track scroll center as a CSS var
  useEffect(() => {
    let ticking = false
    const update = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty(
            '--sc',
            `${window.scrollY + window.innerHeight * 0.5}px`
          )
          ticking = false
        })
        ticking = true
      }
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Reveal side screenshots as each card enters / leaves the viewport
  useEffect(() => {
    const items = stackRef.current?.querySelectorAll('.project-item')
    if (!items) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
          } else {
            e.target.classList.remove('revealed')
          }
        })
      },
      { threshold: 0.2 }
    )
    items.forEach((c) => obs.observe(c))
    return () => obs.disconnect()
  }, [])

  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        paddingLeft:  'max(16px, env(safe-area-inset-left,  0px))',
        paddingRight: 'max(16px, env(safe-area-inset-right, 0px))',
        paddingBottom: '55vh',
        position: 'relative',
        maskImage: MASK,
        WebkitMaskImage: MASK,
      }}
    >
      <div className="spine" />

      {/* ── Hero ───────────────────────────────────────── */}
      <section
        className="s"
        style={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 100,
          paddingBottom: 80,
        }}
      >
        <p style={{ fontFamily: 'var(--f-display)', fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--lit)', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
          <span style={{ display: 'block', width: 28, height: 1, background: 'var(--lit)', boxShadow: '0 0 6px var(--glow)' }} />
          michaeldavid.ai
        </p>

        <h1
          style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(52px, 8.5vw, 94px)', fontWeight: 800, lineHeight: 0.96, letterSpacing: '-0.02em', marginBottom: 26, textWrap: 'balance' as never }}
        >
          Michael<br />
          <span style={{ color: 'rgba(226,226,240,.22)' }}>David</span>
        </h1>

        <p style={{ maxWidth: 500, fontSize: 17, color: 'var(--muted)', marginBottom: 44, lineHeight: 1.7 }}>
          I build digital products with AI — and the understanding that people actually have to want to use them.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--f-display)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.2)' }}>
          Scroll
          <span style={{ display: 'block', width: 1, height: 36, background: 'linear-gradient(to bottom, var(--lit), transparent)' }} />
        </div>
      </section>

      {/* ── How I Build ────────────────────────────────── */}
      <section className="s">
        <p className="s-label">Process</p>
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 18, textWrap: 'balance' as never }}>
          AI as collaborator,<br />not replacement
        </h2>
        <p style={{ maxWidth: 540, color: 'var(--muted)', fontSize: 15, lineHeight: 1.78 }}>
          No coding background. What I have is an understanding of what makes people actually engage with something — what&apos;s fun, what&apos;s useful, what brings them back. I pair that with Claude AI as my technical partner. The result is products that work, and that people want to use.
        </p>

        <div style={{ marginTop: 36 }}>
          {[
            { n: '01', title: 'Human first',        body: "Every project starts with one question: what would make a person actually enjoy this? Not what's technically possible — what's genuinely worth building." },
            { n: '02', title: 'AI as the engine',    body: 'Claude handles the code. I direct the architecture, the logic, the experience. We iterate in days, not months.' },
            { n: '03', title: 'Real products, shipped', body: 'Everything here is live, functional, and used by real people. Not prototypes — working software.' },
          ].map((step) => (
            <div key={step.n} className="step">
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--lit)', paddingTop: 3 }}>{step.n}</div>
              <div>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 14, fontWeight: 600, marginBottom: 6, letterSpacing: '0.03em' }}>{step.title}</div>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Work ───────────────────────────────────────── */}
      <section className="s">
        <p className="s-label">Work</p>
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 700, lineHeight: 1.1, textWrap: 'balance' as never }}>
          Five projects.<br />Zero lines of code<br />written by hand.
        </h2>

        <div className="project-stack" ref={stackRef}>
          {projects.map((p, i) => {
            const Tag = p.url ? 'a' : 'div'
            const linkProps = p.url
              ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' }
              : {}
            return (
              <div key={p.domain} className="project-item">
                <Tag
                  className={`card project-step${i % 2 === 1 ? ' project-step-right' : ''}`}
                  {...linkProps}
                >
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: 21, fontWeight: 600, marginBottom: 10 }}>{p.domain}</div>
                  <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 22 }}>{p.desc}</p>
                  {p.status === 'live' ? (
                    <span className="badge badge-live">Live</span>
                  ) : (
                    <span className="badge badge-wip">In Development</span>
                  )}
                </Tag>
                {(p.url || p.localShot) && (
                  <div className={`side-shot side-shot-${i % 2 === 1 ? 'left' : 'right'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.localShot ?? `https://image.thum.io/get/width/700/crop/440/${p.url}`}
                      alt={`${p.domain} preview`}
                      loading="lazy"
                      style={{ objectPosition: p.shotPos }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────── */}
      <section className="s">
        <p className="s-label">Contact</p>
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 18, textWrap: 'balance' as never }}>
          Got an idea?
        </h2>
        <p style={{ maxWidth: 540, color: 'var(--muted)', fontSize: 15, lineHeight: 1.78, marginBottom: 28 }}>
          If you have something you want to build, I&apos;m always up for a conversation.
        </p>
        <a
          href="mailto:hello@michaeldavid.ai"
          style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(18px, 2.6vw, 28px)', fontWeight: 600, color: 'var(--fg)', textDecoration: 'none', borderBottom: '1px solid var(--dim)', paddingBottom: 6, transition: 'color .25s, border-color .25s' }}
          onMouseEnter={(e) => { const a = e.target as HTMLAnchorElement; a.style.color = 'var(--lit)'; a.style.borderBottomColor = 'var(--lit)' }}
          onMouseLeave={(e) => { const a = e.target as HTMLAnchorElement; a.style.color = 'var(--fg)'; a.style.borderBottomColor = 'var(--dim)' }}
        >
          hello@michaeldavid.ai
        </a>
      </section>
    </div>
  )
}

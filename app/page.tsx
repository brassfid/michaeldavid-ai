'use client'

import { useEffect, useRef } from 'react'

const projects = [
  {
    domain: 'deadr.live',
    desc: 'A daily dead-or-alive celebrity trivia game. Themed categories, funny titles, shareable results. New puzzle every day.',
    url: 'https://deadr.live',
    status: 'live' as const,
  },
  {
    domain: 'full.link',
    desc: 'Professional services site for a Workday Financials CPA consulting firm. Custom visual identity, built to convert.',
    url: 'https://full.link',
    status: 'live' as const,
  },
  {
    domain: 'meganbannon.com',
    desc: 'Personal website with a distinctive visual identity and clean typographic system for lasting professional presence.',
    url: 'https://meganbannon.com',
    status: 'live' as const,
  },
  {
    domain: 'Kinbank',
    desc: "Family app for tracking kids' chores, allowances, points and savings goals. Multi-household, with parent and kid logins.",
    url: null,
    status: 'wip' as const,
  },
]

export default function Home() {
  const scrollRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle('lit', e.isIntersecting))
      },
      { rootMargin: '-28% 0px -28% 0px', threshold: 0 }
    )
    scrollRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  function addRef(el: HTMLElement | null) {
    if (el && !scrollRefs.current.includes(el)) scrollRefs.current.push(el)
  }

  return (
    <div
      style={{
        maxWidth: 880,
        margin: '0 auto',
        paddingLeft: 'max(16px, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(16px, env(safe-area-inset-right, 0px))',
        paddingBottom: 100,
        position: 'relative',
      }}
    >
      <div className="spine" />

      {/* ── Hero ─────────────────────────────────────── */}
      <section
        className="s hero-s lit"
        style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 100, paddingBottom: 80 }}
      >
        <p style={{ fontFamily: 'var(--f-display)', fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--lit)', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
          <span style={{ display: 'block', width: 28, height: 1, background: 'var(--lit)', boxShadow: '0 0 6px var(--glow)' }} />
          michaeldavid.ai
        </p>

        <h1
          style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(52px, 8.5vw, 94px)', fontWeight: 800, lineHeight: 0.96, letterSpacing: '-0.02em', marginBottom: 26, textWrap: 'balance' as never }}
        >
          Michael<br />
          <span style={{ color: 'var(--muted)' }}>David</span><br />
          Brassfield
        </h1>

        <p style={{ maxWidth: 500, fontSize: 17, color: 'var(--muted)', marginBottom: 44, lineHeight: 1.7 }}>
          I build digital products with AI — and the understanding that people actually have to want to use them.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--f-display)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--dim)' }}>
          Scroll
          <span style={{ display: 'block', width: 1, height: 36, background: 'linear-gradient(to bottom, var(--lit), transparent)' }} />
        </div>
      </section>

      {/* ── How I Build ──────────────────────────────── */}
      <section className="s" ref={addRef}>
        <p className="s-label" style={{ fontFamily: 'var(--f-display)', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: 12, transition: 'color .5s' }}>Process</p>
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 18, textWrap: 'balance' as never }}>
          AI as collaborator,<br />not replacement
        </h2>
        <p style={{ maxWidth: 540, color: 'var(--muted)', fontSize: 15, lineHeight: 1.78, marginBottom: 0 }}>
          No coding background. What I have is an understanding of what makes people actually engage with something — what&apos;s fun, what&apos;s useful, what brings them back. I pair that with Claude AI as my technical partner. The result is products that work, and that people want to use.
        </p>

        <div style={{ marginTop: 36 }}>
          {[
            { n: '01', title: 'Human first', body: "Every project starts with one question: what would make a person actually enjoy this? Not what's technically possible — what's genuinely worth building." },
            { n: '02', title: 'AI as the engine', body: 'Claude handles the code. I direct the architecture, the logic, the experience. We iterate in days, not months.' },
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

      {/* ── Work ─────────────────────────────────────── */}
      <section className="s" ref={addRef}>
        <p className="s-label" style={{ fontFamily: 'var(--f-display)', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: 12, transition: 'color .5s' }}>Work</p>
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 700, lineHeight: 1.1, textWrap: 'balance' as never }}>
          Four products.<br />Zero lines of code<br />written by hand.
        </h2>

        <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {projects.map((p) => (
            <div key={p.domain} className="card">
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{p.domain}</div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 18 }}>{p.desc}</p>
              {p.status === 'live' ? (
                <span className="badge badge-live">Live</span>
              ) : (
                <span className="badge badge-wip">In Development</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────── */}
      <section className="s" ref={addRef}>
        <p className="s-label" style={{ fontFamily: 'var(--f-display)', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: 12, transition: 'color .5s' }}>Contact</p>
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 18, textWrap: 'balance' as never }}>
          Got an idea?
        </h2>
        <p style={{ maxWidth: 540, color: 'var(--muted)', fontSize: 15, lineHeight: 1.78, marginBottom: 28 }}>
          If you have something you want to build, I&apos;m always up for a conversation.
        </p>
        <a
          href="mailto:hello@michaeldavid.ai"
          style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(18px, 2.6vw, 28px)', fontWeight: 600, color: 'var(--fg)', textDecoration: 'none', borderBottom: '1px solid var(--trace)', paddingBottom: 6, letterSpacing: '0.02em', transition: 'border-color .3s, color .3s' }}
          onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = 'var(--lit)'; (e.target as HTMLAnchorElement).style.borderBottomColor = 'var(--lit)' }}
          onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = 'var(--fg)'; (e.target as HTMLAnchorElement).style.borderBottomColor = 'var(--trace)' }}
        >
          hello@michaeldavid.ai
        </a>
      </section>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

const EMAIL = 'hello@michaeldavid.ai'
// Photo in /public for the About section; set to null to show the MD monogram.
const PHOTO: string | null = '/michael.png'

const projects = [
  {
    domain: 'deadr.live',
    desc: 'A daily dead-or-alive celebrity trivia game. Themed categories, funny titles, shareable results. New puzzle every day.',
    result: 'Concept to launch in 5 days',
    url: 'https://deadr.live',
    status: 'live' as const,
    shot: '/shots/deadr-live.png',
    shotPos: 'top center',
  },
  {
    domain: 'full.link',
    desc: 'Professional services site for a Workday Financials CPA consulting firm. Custom visual identity, built to convert.',
    result: 'Wireframed during the fourth quarter of a Broncos game · finished the next day',
    url: 'https://full.link',
    status: 'live' as const,
    shot: '/shots/full-link.png',
    shotPos: 'left top',
  },
  {
    domain: 'meganbannon.com',
    desc: 'Personal website with a distinctive visual identity and clean typographic system for lasting professional presence.',
    result: 'Live within 2 days',
    url: 'https://meganbannon.com',
    status: 'live' as const,
    shot: '/shots/meganbannon.png',
    shotPos: 'right top',
  },
  {
    domain: 'Kinbank',
    desc: "Family app for tracking kids' chores, allowances, points and savings goals. Multi-household, with parent and kid logins.",
    result: '5 families testing it as features take shape',
    url: null,
    status: 'wip' as const,
    shot: '/kinbank-flow.svg',
    shotPos: 'top center',
  },
  {
    domain: 'FriscoPTSA',
    desc: 'Real-time silent auction platform for school fundraisers. Live bidding, item tracking, and instant totals — all in the browser.',
    result: 'Built in 2 days · $10,000+ in donations ahead of the Dec 2 auction',
    url: null,
    status: 'wip' as const,
    shot: '/friscoptsa-flow.svg',
    shotPos: 'top center',
  },
]

const offers = [
  { title: 'Websites',          body: 'A fast, custom site for your business or practice that explains what you do and turns visitors into inquiries.', eg: 'full.link, meganbannon.com' },
  { title: 'Web apps & tools',  body: 'Booking, tracking, member portals, internal tools — the app you’ve been running on spreadsheets.', eg: 'Kinbank, FriscoPTSA' },
  { title: 'Games & interactive', body: 'Daily games, quizzes and experiences built around the thing that brings people back.', eg: 'deadr.live' },
]

// Spotlight: middle of viewport fully bright, dims (never disappears) above/below.
const MASK = [
  'linear-gradient(to bottom,',
  '  rgba(0,0,0,.4)           calc(var(--sc) - 56vh),',
  '  rgba(0,0,0,.55)          calc(var(--sc) - 38vh),',
  '  black                    calc(var(--sc) - 24vh),',
  '  black                    calc(var(--sc) + 24vh),',
  '  rgba(0,0,0,.55)          calc(var(--sc) + 38vh),',
  '  rgba(0,0,0,.4)           calc(var(--sc) + 56vh)',
  ')',
].join('\n')

const h2Style = { fontFamily: 'var(--f-display)', fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 700, lineHeight: 1.1, textWrap: 'balance' as never }
const leadStyle = { maxWidth: 540, color: 'var(--muted)', fontSize: 15, lineHeight: 1.78 }

function Steps({ items }: { items: { n: string; title: string; body: string }[] }) {
  return (
    <div style={{ marginTop: 36 }}>
      {items.map((step) => (
        <div key={step.n} className="step">
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 11, letterSpacing: '0.15em', color: 'var(--lit)', paddingTop: 3 }}>{step.n}</div>
          <div>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 14, fontWeight: 600, marginBottom: 6, letterSpacing: '0.03em' }}>{step.title}</div>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')
    const data = Object.fromEntries(new FormData(e.currentTarget))
    // Sent by our own /api/contact route (Resend). The timeout stops the button
    // hanging if the request never answers; the error state shows EMAIL instead.
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(15000),
      })
      setState(res.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent') {
    return <p className="form-note" style={{ color: 'var(--fg)' }}>Thanks — got it. I&apos;ll be in touch soon.</p>
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          Name
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label>
        What do you want to build?
        <textarea name="message" required rows={5} placeholder="A sentence or two is plenty — who it's for and what it should do." />
      </label>
      {/* honeypot */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send'}
        </button>
        {state === 'error' && (
          <span className="form-note" style={{ color: 'var(--warm)' }}>
            That didn&apos;t go through. Email me at {EMAIL} instead.
          </span>
        )}
      </div>
    </form>
  )
}

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

  // Slide cards and screenshots into place the first time each card enters the viewport
  useEffect(() => {
    const items = stackRef.current?.querySelectorAll('.project-item')
    if (!items) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    items.forEach((c) => obs.observe(c))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <nav className="topnav">
        <a href="#top" className="topnav-mark" aria-label="Michael David — home">MD</a>
        <div className="topnav-links">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
        </div>
        <a href="#contact" className="btn btn-primary btn-sm">Start a project</a>
      </nav>

      <div
        id="top"
        style={{
          maxWidth: 900,
          margin: '0 auto',
          paddingLeft:  'max(16px, env(safe-area-inset-left,  0px))',
          paddingRight: 'max(16px, env(safe-area-inset-right, 0px))',
          paddingBottom: '30vh',
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
          <p style={{ fontFamily: 'var(--f-display)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--lit)', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
            <span style={{ display: 'block', width: 28, height: 1, background: 'var(--lit)', boxShadow: '0 0 6px var(--glow)' }} />
            michaeldavid.ai
          </p>

          <h1
            style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(52px, 8.5vw, 94px)', fontWeight: 800, lineHeight: 0.96, letterSpacing: '-0.02em', marginBottom: 26 }}
          >
            Mich<span style={{ color: '#5ab8d4' }}>a</span>el<br />
            <span style={{ color: 'rgba(226,226,240,.55)', display: 'inline-block', marginLeft: '0.62em' }}>Dav<span style={{ color: '#5ab8d4' }}>i</span>d</span>
          </h1>

          <p style={{ maxWidth: 520, fontSize: 17, color: 'var(--fg-soft)', marginBottom: 36, lineHeight: 1.7 }}>
            I build web apps, sites and games with AI — and the understanding that people actually have to want to use them.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#contact" className="btn btn-primary">Start a project</a>
            <a href="#work" className="btn btn-ghost">See the work</a>
          </div>
        </section>

        {/* ── Services ───────────────────────────────────── */}
        <section className="s" id="services">
          <p className="s-label">What I build</p>
          <h2 style={{ ...h2Style, marginBottom: 18 }}>
            For small businesses, founders<br />and teams with an idea
          </h2>
          <p style={leadStyle}>
            You bring the problem or the idea. I turn it into something real, live, and easy to use — without a months-long agency project.
          </p>

          <div className="offer-grid">
            {offers.map((o) => (
              <div key={o.title} className="card offer">
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{o.title}</div>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14 }}>{o.body}</p>
                <p style={{ fontFamily: 'var(--f-display)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--lit)' }}>e.g. {o.eg}</p>
              </div>
            ))}
          </div>

          <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontWeight: 600, marginTop: 56 }}>How it works</h3>
          <Steps
            items={[
              { n: '01', title: 'Intro call',        body: 'A free 30-minute call about what you need, who it’s for, and what success looks like.' },
              { n: '02', title: 'Plan and quote',    body: 'A short written scope with a fixed price and timeline before any work starts.' },
              { n: '03', title: 'Build',             body: 'You see a working version within days and steer it as it takes shape — no waiting for a big reveal.' },
              { n: '04', title: 'Launch and support', body: 'Tested on desktop and mobile, deployed, and handed over. I stay on for fixes and changes after launch.' },
            ]}
          />
        </section>

        {/* ── Work ───────────────────────────────────────── */}
        <section className="s" id="work">
          <p className="s-label">Work</p>
          <h2 style={h2Style}>
            Five projects.<br />Three live, two on the way.
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
                    <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14 }}>{p.desc}</p>
                    <p className="result">{p.result}</p>
                    {p.status === 'live' ? (
                      <span className="badge badge-live">Live</span>
                    ) : (
                      <span className="badge badge-wip">In Development</span>
                    )}
                  </Tag>
                  <div className={`side-shot side-shot-${i % 2 === 1 ? 'left' : 'right'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.shot}
                      alt={`${p.domain} preview`}
                      loading="lazy"
                      style={{ objectPosition: p.shotPos }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Approach ───────────────────────────────────── */}
        <section className="s">
          <p className="s-label">Approach</p>
          <h2 style={{ ...h2Style, marginBottom: 18 }}>
            AI as collaborator,<br />not replacement
          </h2>
          <p style={leadStyle}>
            I pair product instinct with Claude as the engineering engine. I decide what gets built and how it should feel, the AI writes the code, and I test it until it holds up. The result is software that works — and that people want to use.
          </p>

          <Steps
            items={[
              { n: '01', title: 'Human first',        body: "Every project starts with one question: what would make a person actually enjoy this? Not what's technically possible — what's genuinely worth building." },
              { n: '02', title: 'AI as the engine',    body: 'Claude writes the code. I direct the architecture, the logic and the experience, so ideas go from sketch to working product in days, not months.' },
              { n: '03', title: 'Tested and supported', body: 'Every build is tested on desktop and mobile, kept in version control, and deployed on modern hosting. You own the code, and I stay on to maintain it.' },
            ]}
          />
        </section>

        {/* ── About ──────────────────────────────────────── */}
        <section className="s" id="about">
          <p className="s-label">About</p>
          <div className="about">
            {PHOTO ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={PHOTO} alt="Michael David" className="about-photo" />
            ) : (
              <div className="about-photo about-monogram" aria-hidden>MD</div>
            )}
            <div>
              <h2 style={{ ...h2Style, marginBottom: 18 }}>Hi, I&apos;m Michael.</h2>
              <p style={leadStyle}>
                I&apos;ve spent two decades building and implementing financial systems across a range of companies, always with the same goal: make the front end simple enough that people actually engage with it.
              </p>
              <p style={{ ...leadStyle, marginTop: 14 }}>
                My first AI project was ordering milk for my small bodega in Nashville. It checked our inventory, events around the city, the upcoming temperatures and our sales history, then placed orders so we never ran short. Now I bring that same mix of practical problem and simple experience to websites and apps.
              </p>
            </div>
          </div>
        </section>

        {/* ── Contact ────────────────────────────────────── */}
        <section className="s" id="contact">
          <p className="s-label">Contact</p>
          <h2 style={{ ...h2Style, marginBottom: 18 }}>
            Got an idea?
          </h2>
          <p style={{ ...leadStyle, marginBottom: 28 }}>
            Tell me a little about what you want to build and I&apos;ll get back to you to set up a call.
          </p>
          <ContactForm />
          <p className="form-note" style={{ marginTop: 28 }}>
            Prefer email? <a href={`mailto:${EMAIL}`} className="text-link">{EMAIL}</a>
          </p>
        </section>
      </div>
    </>
  )
}

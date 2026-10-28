import { Resend } from 'resend'

// Sends contact-form messages straight to the inbox via Resend.
// Needs RESEND_API_KEY in the environment (Vercel → Settings → Environment Variables).
// CONTACT_FROM must be on a domain verified in Resend; until then use
// 'onboarding@resend.dev', which only delivers to the Resend account's own email.
const TO = process.env.CONTACT_TO ?? 'david@full.link'
const FROM = process.env.CONTACT_FROM ?? 'michaeldavid.ai <contact@michaeldavid.ai>'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function field(data: Record<string, unknown>, key: string, max: number) {
  const v = data[key]
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error('contact: RESEND_API_KEY is not set')
    return Response.json({ ok: false }, { status: 503 })
  }

  let data: Record<string, unknown>
  try {
    data = await request.json()
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }

  // Honeypot: bots fill the hidden field. Pretend success so they don't retry.
  if (field(data, '_honey', 200)) return Response.json({ ok: true })

  const name = field(data, 'name', 200)
  const email = field(data, 'email', 320)
  const message = field(data, 'message', 5000)
  if (!name || !EMAIL_RE.test(email) || !message) {
    return Response.json({ ok: false }, { status: 400 })
  }

  const { error } = await new Resend(key).emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `New project inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}\n\n— sent from the michaeldavid.ai contact form`,
  })

  if (error) {
    console.error('contact: Resend error', error)
    return Response.json({ ok: false }, { status: 502 })
  }
  return Response.json({ ok: true })
}

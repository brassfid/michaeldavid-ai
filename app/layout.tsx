import type { Metadata } from 'next'
import { Oxanium, DM_Sans } from 'next/font/google'
import './globals.css'

const oxanium = Oxanium({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500'],
})

const title = 'Michael David — AI-built web apps & sites'
const description = 'I build web apps, sites and games with AI — and the understanding that people actually have to want to use them.'

export const metadata: Metadata = {
  metadataBase: new URL('https://michaeldavid.ai'),
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://michaeldavid.ai',
    siteName: 'Michael David',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oxanium.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}

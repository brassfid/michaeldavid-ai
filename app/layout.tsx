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

export const metadata: Metadata = {
  title: 'Michael David',
  description: 'I build digital products with AI — and the understanding that people actually have to want to use them.',
  openGraph: {
    title: 'Michael David',
    description: 'I build digital products with AI — and the understanding that people actually have to want to use them.',
    url: 'https://michaeldavid.ai',
    siteName: 'Michael David',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael David',
    description: 'I build digital products with AI — and the understanding that people actually have to want to use them.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oxanium.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}

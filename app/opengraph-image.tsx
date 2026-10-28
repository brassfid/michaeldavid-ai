import { ImageResponse } from 'next/og'

export const alt = 'Michael David — AI-built web apps & sites'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: '#07070e',
          color: '#e2e2f0',
          borderTop: '6px solid #00d4ff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 26, letterSpacing: 8, textTransform: 'uppercase', color: '#00d4ff', marginBottom: 36 }}>
          <div style={{ width: 56, height: 2, background: '#00d4ff' }} />
          michaeldavid.ai
        </div>
        <div style={{ display: 'flex', fontSize: 120, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
          Michael <span style={{ color: 'rgba(226,226,240,.55)', marginLeft: 28 }}>David</span>
        </div>
        <div style={{ display: 'flex', fontSize: 38, color: '#c4c4dc', marginTop: 40, maxWidth: 900, lineHeight: 1.35 }}>
          AI-built web apps, sites and games — made for people to actually use.
        </div>
      </div>
    ),
    { ...size }
  )
}

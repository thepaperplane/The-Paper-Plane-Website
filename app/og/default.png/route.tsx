import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const runtime = 'edge';

// Route handlers may only export the reserved config keys and HTTP verbs, so
// the card dimensions stay local rather than being exported.
const SIZE = { width: 1200, height: 630 };

/**
 * Social sharing card, generated at the edge and cached.
 *
 * Kept to system fonts and flat vector shapes so it renders without fetching
 * a font binary on every cold start — the card must never be the slow part
 * of a link unfurl.
 */
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f7 55%, #eff8ff 100%)',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Brand wash */}
        <div
          style={{
            position: 'absolute',
            top: -220,
            right: -160,
            width: 680,
            height: 680,
            borderRadius: 680,
            background: 'radial-gradient(circle, rgba(48,154,230,0.22) 0%, rgba(48,154,230,0) 70%)',
            display: 'flex',
          }}
        />

        {/* Mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="88" height="59" viewBox="0 0 600 400">
            <g fill="none" strokeLinejoin="round" strokeLinecap="round">
              <g transform="translate(112 196) rotate(-19)">
                <path
                  d="M9 0 H119 L152 33 V103 A9 9 0 0 1 143 112 H9 A9 9 0 0 1 0 103 V9 A9 9 0 0 1 9 0 Z"
                  stroke="#3fa0d8"
                  strokeWidth="14"
                />
              </g>
              <g transform="translate(150 128) rotate(-19)">
                <path
                  d="M9 0 H119 L152 33 V103 A9 9 0 0 1 143 112 H9 A9 9 0 0 1 0 103 V9 A9 9 0 0 1 9 0 Z"
                  stroke="#2f8fd8"
                  strokeWidth="15"
                />
              </g>
            </g>
            <g stroke="#3fa0d8" strokeLinecap="round" fill="none">
              <path d="M74 232 A 186 186 0 0 0 412 206" strokeWidth="17" />
              <path d="M84 274 A 156 156 0 0 0 372 250" strokeWidth="15" />
            </g>
            <path d="M570 10 L233 95 L390 150 Z" fill="#1e3a6b" />
            <path d="M570 10 L390 150 L323 235 L233 95 Z" fill="#152a52" />
            <path d="M570 10 L390 150 L507 227 Z" fill="#0e1f3f" />
          </svg>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 600, color: '#152a52' }}>
            {SITE.name}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 74,
              fontWeight: 700,
              color: '#152a52',
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
            }}
          >
            We handle the Papers,
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 74,
              fontWeight: 700,
              color: '#2f80ed',
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
            }}
          >
            You Handle the Takeoff
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(0,0,0,0.08)',
            paddingTop: 28,
          }}
        >
          <div style={{ display: 'flex', fontSize: 24, color: '#6e6e73' }}>
            Tax · GST · Scrutiny defence · Incorporation · Audit · Software
          </div>
          <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, color: '#152a52' }}>
            thepaperplane.co.in
          </div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      },
    },
  );
}

/**
 * Process diagrams.
 *
 * Purpose-drawn for the specific stages of compliance work, not clip art.
 * Every one is inline SVG using `currentColor` and theme tokens, so they
 * invert correctly with the theme and cost no network request.
 *
 * They animate only when their step is the active one (`active`), and every
 * animation is opacity/transform on a short curve — nothing spins or bounces.
 * Under prefers-reduced-motion the CSS in globals.css collapses the durations,
 * so the final state is what renders.
 */

type DiagramProps = { active: boolean; className?: string };

const FRAME = 'h-full w-full';

/** Shared axis/ground line. */
function Base() {
  return (
    <line
      x1="8"
      y1="148"
      x2="312"
      y2="148"
      stroke="var(--hairline-strong)"
      strokeWidth="1"
    />
  );
}

function delay(i: number, active: boolean) {
  return {
    opacity: active ? 1 : 0.25,
    transform: active ? 'none' : 'translateY(6px)',
    transition: `opacity .7s var(--ease-out-editorial) ${i * 90}ms, transform .7s var(--ease-out-editorial) ${i * 90}ms`,
  } as React.CSSProperties;
}

/* ------------------------------------------------------------------ */
/* 1. Normalise — ragged input rows resolving into an aligned register */
/* ------------------------------------------------------------------ */
export function NormaliseDiagram({ active, className }: DiagramProps) {
  const ragged = [42, 96, 61, 120, 78];
  return (
    <svg viewBox="0 0 320 176" className={`${FRAME} ${className ?? ''}`} role="img"
      aria-label="Ragged input rows resolving into an aligned register">
      <Base />
      {ragged.map((w, i) => (
        <g key={i}>
          {/* incoming, ragged */}
          <rect
            x="14" y={22 + i * 22} width={w} height="6" rx="1"
            fill="var(--faint)"
            style={{
              opacity: active ? 0.35 : 0.5,
              transition: `opacity .6s var(--ease-out-editorial) ${i * 70}ms`,
            }}
          />
          {/* normalised, aligned */}
          <rect
            x="176" y={22 + i * 22} width="108" height="6" rx="1"
            fill="var(--accent)"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'none' : 'translateX(-14px)',
              transition: `opacity .6s var(--ease-out-editorial) ${180 + i * 80}ms, transform .6s var(--ease-out-editorial) ${180 + i * 80}ms`,
            }}
          />
          <path
            d={`M ${20 + w} ${25 + i * 22} H 170`}
            stroke="var(--hairline-strong)" strokeWidth="1" strokeDasharray="2 3"
            style={{ opacity: active ? 1 : 0, transition: `opacity .5s ease ${140 + i * 70}ms` }}
          />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Match — three independent sources converging on one figure      */
/* ------------------------------------------------------------------ */
export function MatchDiagram({ active, className }: DiagramProps) {
  const sources = [
    { y: 30, label: 'Your register' },
    { y: 76, label: 'Portal 2B' },
    { y: 122, label: 'Claimed' },
  ];
  return (
    <svg viewBox="0 0 320 176" className={`${FRAME} ${className ?? ''}`} role="img"
      aria-label="Three sources converging on a single matched figure">
      {sources.map((s, i) => (
        <g key={i} style={delay(i, active)}>
          <rect x="10" y={s.y - 11} width="96" height="22" rx="2"
            fill="none" stroke="var(--hairline-strong)" strokeWidth="1" />
          <text x="58" y={s.y + 4} textAnchor="middle"
            fill="var(--ink-3)" fontSize="9"
            fontFamily="var(--font-sans)">{s.label}</text>
          <path d={`M 110 ${s.y} C 152 ${s.y}, 156 88, 196 88`}
            fill="none" stroke="var(--accent)" strokeWidth="1.25"
            strokeDasharray="150" strokeDashoffset={active ? 0 : 150}
            style={{ transition: `stroke-dashoffset .9s var(--ease-out-editorial) ${200 + i * 120}ms` }} />
        </g>
      ))}
      <g style={{
        opacity: active ? 1 : 0,
        transform: active ? 'none' : 'scale(0.9)',
        transformOrigin: '244px 88px',
        transition: 'opacity .6s var(--ease-out-editorial) .75s, transform .6s var(--ease-out-editorial) .75s',
      }}>
        <circle cx="244" cy="88" r="30" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <path d="M 232 88 l 8 9 l 17 -19" fill="none" stroke="var(--accent)"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Chase — a vendor list with defaulters flagged                    */
/* ------------------------------------------------------------------ */
export function ChaseDiagram({ active, className }: DiagramProps) {
  const rows = [true, true, false, true, false];
  return (
    <svg viewBox="0 0 320 176" className={`${FRAME} ${className ?? ''}`} role="img"
      aria-label="Vendor list with non-filing suppliers flagged">
      {rows.map((ok, i) => (
        <g key={i} style={delay(i, active)}>
          <rect x="26" y={20 + i * 28} width="196" height="20" rx="2"
            fill="none" stroke="var(--hairline)" strokeWidth="1" />
          <rect x="36" y={27 + i * 28} width={ok ? 96 : 68} height="6" rx="1"
            fill="var(--faint)" />
          {ok ? (
            <path d={`M 240 ${30 + i * 28} l 5 5 l 10 -11`} fill="none"
              stroke="var(--positive)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <g>
              <circle cx="247" cy={30 + i * 28} r="8" fill="none"
                stroke="var(--caution)" strokeWidth="1.4" />
              <line x1="247" y1={26 + i * 28} x2="247" y2={31 + i * 28}
                stroke="var(--caution)" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="247" cy={34 + i * 28} r="0.9" fill="var(--caution)" />
              <rect x="264" y={22 + i * 28} width="30" height="16" rx="2"
                fill="var(--caution)" opacity="0.12" />
              <text x="279" y={33 + i * 28} textAnchor="middle" fill="var(--caution)"
                fontSize="8" fontFamily="var(--font-sans)">hold</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Offset — liability reduced by credit, leaving a cash position    */
/* ------------------------------------------------------------------ */
export function OffsetDiagram({ active, className }: DiagramProps) {
  return (
    <svg viewBox="0 0 320 176" className={`${FRAME} ${className ?? ''}`} role="img"
      aria-label="Output liability reduced by input credit, leaving the cash payable">
      <Base />
      {[
        { x: 30, h: 104, fill: 'var(--ink-3)', label: 'Liability', i: 0 },
        { x: 128, h: 74, fill: 'var(--accent)', label: 'Credit', i: 1 },
        { x: 226, h: 30, fill: 'var(--positive)', label: 'Cash', i: 2 },
      ].map((b) => (
        <g key={b.label}>
          <rect
            x={b.x} y={148 - b.h} width="64" rx="2"
            height={active ? b.h : 0}
            fill={b.fill}
            style={{
              transition: `height .8s var(--ease-out-editorial) ${b.i * 140}ms, y .8s var(--ease-out-editorial) ${b.i * 140}ms`,
            }}
          />
          <text x={b.x + 32} y="164" textAnchor="middle" fill="var(--ink-3)"
            fontSize="9" fontFamily="var(--font-sans)">{b.label}</text>
        </g>
      ))}
      <text x="106" y="86" textAnchor="middle" fill="var(--ink-3)" fontSize="14"
        fontFamily="var(--font-sans)" style={{ opacity: active ? 1 : 0, transition: 'opacity .5s ease .5s' }}>−</text>
      <text x="204" y="86" textAnchor="middle" fill="var(--ink-3)" fontSize="14"
        fontFamily="var(--font-sans)" style={{ opacity: active ? 1 : 0, transition: 'opacity .5s ease .6s' }}>=</text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Archive — the filing plus the working papers kept beside it      */
/* ------------------------------------------------------------------ */
export function ArchiveDiagram({ active, className }: DiagramProps) {
  return (
    <svg viewBox="0 0 320 176" className={`${FRAME} ${className ?? ''}`} role="img"
      aria-label="The filed return archived together with its working papers">
      {[2, 1, 0].map((k) => (
        <rect key={k}
          x={64 + k * 10} y={32 + k * 8} width="104" height="112" rx="3"
          fill="var(--surface)" stroke="var(--hairline-strong)" strokeWidth="1"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'none' : 'translateY(10px)',
            transition: `opacity .6s var(--ease-out-editorial) ${(2 - k) * 110}ms, transform .6s var(--ease-out-editorial) ${(2 - k) * 110}ms`,
          }}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="78" y={52 + i * 16} width={i === 3 ? 44 : 72} height="4" rx="1"
          fill="var(--faint)"
          style={{ opacity: active ? 1 : 0, transition: `opacity .5s ease ${340 + i * 70}ms` }} />
      ))}
      <g style={{
        opacity: active ? 1 : 0,
        transform: active ? 'none' : 'scale(0.85)',
        transformOrigin: '226px 116px',
        transition: 'opacity .6s var(--ease-out-editorial) .7s, transform .6s var(--ease-out-editorial) .7s',
      }}>
        <circle cx="226" cy="116" r="22" fill="none" stroke="var(--positive)" strokeWidth="1.5" />
        <path d="M 216 116 l 7 8 l 14 -16" fill="none" stroke="var(--positive)"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Inspect — testing a notice before answering it                   */
/* ------------------------------------------------------------------ */
export function InspectDiagram({ active, className }: DiagramProps) {
  return (
    <svg viewBox="0 0 320 176" className={`${FRAME} ${className ?? ''}`} role="img"
      aria-label="A notice examined for procedural defects before the merits">
      <rect x="54" y="24" width="124" height="132" rx="3" fill="var(--surface)"
        stroke="var(--hairline-strong)" strokeWidth="1" style={delay(0, active)} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="70" y={46 + i * 20} width={i % 2 ? 66 : 92} height="4" rx="1"
          fill="var(--faint)"
          style={{ opacity: active ? 1 : 0, transition: `opacity .5s ease ${140 + i * 60}ms` }} />
      ))}
      <g style={{
        opacity: active ? 1 : 0,
        transform: active ? 'none' : 'translate(-10px, 10px)',
        transition: 'opacity .7s var(--ease-out-editorial) .45s, transform .7s var(--ease-out-editorial) .45s',
      }}>
        <circle cx="196" cy="98" r="34" fill="var(--accent)" opacity="0.07" />
        <circle cx="196" cy="98" r="34" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <line x1="220" y1="122" x2="246" y2="148" stroke="var(--accent)"
          strokeWidth="2.5" strokeLinecap="round" />
        <text x="196" y="103" textAnchor="middle" fill="var(--accent)" fontSize="11"
          fontFamily="var(--font-mono)">s.148</text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Assemble — evidence indexed into a paper book                    */
/* ------------------------------------------------------------------ */
export function AssembleDiagram({ active, className }: DiagramProps) {
  const items = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 320 176" className={`${FRAME} ${className ?? ''}`} role="img"
      aria-label="Scattered evidence indexed into an ordered paper book">
      {items.map((i) => (
        <rect key={`s${i}`} x={16 + (i % 2) * 26} y={24 + i * 32} width="58" height="22" rx="2"
          fill="none" stroke="var(--hairline-strong)" strokeWidth="1"
          style={{
            opacity: active ? 0.4 : 0.6,
            transition: `opacity .6s ease ${i * 60}ms`,
          }} />
      ))}
      {items.map((i) => (
        <g key={`t${i}`}>
          <path d={`M 80 ${35 + i * 32} C 130 ${35 + i * 32}, 140 ${40 + i * 26}, 186 ${40 + i * 26}`}
            fill="none" stroke="var(--hairline-strong)" strokeWidth="1" strokeDasharray="2 3"
            style={{ opacity: active ? 1 : 0, transition: `opacity .5s ease ${180 + i * 70}ms` }} />
          <rect x="190" y={28 + i * 26} width="104" height="22" rx="2"
            fill="none" stroke="var(--accent)" strokeWidth="1.25"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'none' : 'translateX(-12px)',
              transition: `opacity .6s var(--ease-out-editorial) ${240 + i * 90}ms, transform .6s var(--ease-out-editorial) ${240 + i * 90}ms`,
            }} />
          <text x="200" y={43 + i * 26} fill="var(--accent)" fontSize="9"
            fontFamily="var(--font-mono)"
            style={{ opacity: active ? 1 : 0, transition: `opacity .5s ease ${300 + i * 90}ms` }}>
            {String(i + 1).padStart(2, '0')}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Compare — two computations set against each other                */
/* ------------------------------------------------------------------ */
export function CompareDiagram({ active, className }: DiagramProps) {
  return (
    <svg viewBox="0 0 320 176" className={`${FRAME} ${className ?? ''}`} role="img"
      aria-label="Two tax regimes computed in parallel and compared">
      {[
        { x: 26, label: 'Old regime', h: 86, fill: 'var(--ink-3)', i: 0 },
        { x: 178, label: 'New regime', h: 62, fill: 'var(--accent)', i: 1 },
      ].map((c) => (
        <g key={c.label}>
          <rect x={c.x} y="26" width="116" height="120" rx="3" fill="none"
            stroke="var(--hairline-strong)" strokeWidth="1" style={delay(c.i, active)} />
          <rect x={c.x + 24} y={134 - c.h} width="68" rx="2"
            height={active ? c.h : 0} fill={c.fill}
            style={{ transition: `height .8s var(--ease-out-editorial) ${200 + c.i * 160}ms, y .8s var(--ease-out-editorial) ${200 + c.i * 160}ms` }} />
          <text x={c.x + 58} y="164" textAnchor="middle" fill="var(--ink-3)" fontSize="9"
            fontFamily="var(--font-sans)">{c.label}</text>
        </g>
      ))}
      <text x="160" y="92" textAnchor="middle" fill="var(--ink-3)" fontSize="13"
        fontFamily="var(--font-sans)"
        style={{ opacity: active ? 1 : 0, transition: 'opacity .5s ease .55s' }}>vs</text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Structure — an entity and its registrations                      */
/* ------------------------------------------------------------------ */
export function StructureDiagram({ active, className }: DiagramProps) {
  const leaves = ['PAN', 'TAN', 'GST', 'EPFO', 'ESIC'];
  return (
    <svg viewBox="0 0 320 176" className={`${FRAME} ${className ?? ''}`} role="img"
      aria-label="A single entity linked to the registrations filed alongside it">
      <g style={delay(0, active)}>
        <rect x="112" y="18" width="96" height="30" rx="3" fill="none"
          stroke="var(--accent)" strokeWidth="1.5" />
        <text x="160" y="38" textAnchor="middle" fill="var(--accent)" fontSize="10"
          fontFamily="var(--font-sans)">Entity</text>
      </g>
      {leaves.map((l, i) => {
        const x = 18 + i * 58;
        return (
          <g key={l}>
            <path d={`M 160 48 V 74 H ${x + 24} V 104`} fill="none"
              stroke="var(--hairline-strong)" strokeWidth="1"
              strokeDasharray="120" strokeDashoffset={active ? 0 : 120}
              style={{ transition: `stroke-dashoffset .8s var(--ease-out-editorial) ${200 + i * 80}ms` }} />
            <rect x={x} y="104" width="48" height="26" rx="2" fill="none"
              stroke="var(--hairline-strong)" strokeWidth="1"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? 'none' : 'translateY(8px)',
                transition: `opacity .5s var(--ease-out-editorial) ${420 + i * 80}ms, transform .5s var(--ease-out-editorial) ${420 + i * 80}ms`,
              }} />
            <text x={x + 24} y="121" textAnchor="middle" fill="var(--ink-3)" fontSize="8"
              fontFamily="var(--font-mono)"
              style={{ opacity: active ? 1 : 0, transition: `opacity .5s ease ${480 + i * 80}ms` }}>{l}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */

export const DIAGRAMS = {
  normalise: NormaliseDiagram,
  match: MatchDiagram,
  chase: ChaseDiagram,
  offset: OffsetDiagram,
  archive: ArchiveDiagram,
  inspect: InspectDiagram,
  assemble: AssembleDiagram,
  compare: CompareDiagram,
  structure: StructureDiagram,
} as const;

export type DiagramKey = keyof typeof DIAGRAMS;

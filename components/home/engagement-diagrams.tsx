/**
 * Drawings for the engagement slideshow.
 *
 * Same rules as the knowledge diagrams: inline SVG on theme tokens so they
 * invert with the theme and cost no request, one idea per drawing, and no
 * motion beyond opacity and small translations on a short curve.
 *
 * Each takes `active` and settles into its final state when its stage is on
 * show; inactive stages sit at a low opacity so nothing pops in from nothing.
 */

type Props = { active: boolean };

const FRAME = 'h-full w-full';
const EASE = 'var(--ease-out-editorial)';

function step(i: number, active: boolean, dy = 6): React.CSSProperties {
  return {
    opacity: active ? 1 : 0,
    transform: active ? 'none' : `translateY(${dy}px)`,
    transition: `opacity .6s ${EASE} ${i * 90}ms, transform .6s ${EASE} ${i * 90}ms`,
  };
}

/* ------------------------------------------------------------------ */
/* 1. First read — the actual document, with the clause that matters   */
/*    picked out of the noise.                                         */
/* ------------------------------------------------------------------ */
export function ReadDiagram({ active }: Props) {
  const lines = [148, 132, 156, 120, 150, 138, 110];
  return (
    <svg
      viewBox="0 0 320 176"
      className={FRAME}
      role="img"
      aria-label="A notice with one clause marked out of many lines of text"
    >
      <rect
        x="78"
        y="14"
        width="188"
        height="148"
        rx="2"
        fill="var(--surface)"
        stroke="var(--hairline-strong)"
        strokeWidth="1"
      />
      {lines.map((w, i) => {
        const marked = i === 3;
        return (
          <rect
            key={i}
            x="96"
            y={34 + i * 18}
            width={w}
            height="5"
            rx="1"
            fill={marked ? 'var(--accent)' : 'var(--faint)'}
            style={{
              opacity: marked ? (active ? 1 : 0.2) : active ? 0.45 : 0.3,
              transition: `opacity .6s ${EASE} ${marked ? 420 : i * 60}ms`,
            }}
          />
        );
      })}
      {/* Bracket against the marked clause */}
      <path
        d="M 88 84 h -8 v 18 h 8"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        style={step(6, active, 0)}
      />
      <rect
        x="20"
        y="84"
        width="44"
        height="5"
        rx="1"
        fill="var(--accent)"
        style={step(7, active)}
      />
      <rect
        x="20"
        y="97"
        width="30"
        height="5"
        rx="1"
        fill="var(--faint)"
        style={{ ...step(8, active), opacity: active ? 0.5 : 0 }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Scope — a written boundary. What is inside it, and the equally   */
/*    explicit outside.                                                */
/* ------------------------------------------------------------------ */
export function ScopeDiagram({ active }: Props) {
  return (
    <svg
      viewBox="0 0 320 176"
      className={FRAME}
      role="img"
      aria-label="Work inside an agreed boundary, and named work outside it"
    >
      <rect
        x="14"
        y="26"
        width="150"
        height="124"
        rx="3"
        fill="var(--accent)"
        fillOpacity="0.07"
        stroke="var(--accent)"
        strokeWidth="1.5"
        style={step(0, active, 0)}
      />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} style={step(i + 1, active)}>
          <rect x="32" y={48 + i * 24} width="8" height="8" rx="1" fill="var(--accent)" />
          <rect
            x="48"
            y={50 + i * 24}
            width={[96, 74, 88, 62][i]}
            height="5"
            rx="1"
            fill="var(--ink-3)"
            opacity="0.55"
          />
        </g>
      ))}

      <rect
        x="182"
        y="26"
        width="124"
        height="124"
        rx="3"
        fill="none"
        stroke="var(--faint)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        style={{ ...step(2, active, 0), opacity: active ? 0.8 : 0 }}
      />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="200"
          y={54 + i * 24}
          width={[72, 58, 84][i]}
          height="5"
          rx="1"
          fill="var(--faint)"
          style={{ ...step(i + 3, active), opacity: active ? 0.55 : 0 }}
        />
      ))}
      <path d="M 173 34 V 142" stroke="var(--hairline-strong)" strokeWidth="1" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Groundwork — the small visible deliverable over the large        */
/*    invisible body of work that makes it defensible.                 */
/* ------------------------------------------------------------------ */
export function GroundworkDiagram({ active }: Props) {
  const rows = [
    [24, 52, 40, 66, 34],
    [44, 30, 58, 36, 48],
    [36, 62, 28, 44, 56],
    [52, 38, 46, 30, 40],
  ];
  return (
    <svg
      viewBox="0 0 320 176"
      className={FRAME}
      role="img"
      aria-label="A small filed output above a large body of underlying work"
    >
      <rect
        x="118"
        y="16"
        width="84"
        height="26"
        rx="2"
        fill="var(--accent)"
        style={step(0, active, -6)}
      />
      <rect
        x="132"
        y="26"
        width="56"
        height="5"
        rx="1"
        fill="var(--accent-ink)"
        opacity="0.85"
        style={step(1, active, -4)}
      />

      <line x1="10" y1="58" x2="310" y2="58" stroke="var(--hairline-strong)" strokeWidth="1" />
      <text
        x="10"
        y="52"
        fill="var(--ink-3)"
        fontSize="9"
        letterSpacing="1.4"
        style={{ textTransform: 'uppercase' }}
        opacity={active ? 0.8 : 0}
      >
        FILED
      </text>

      {rows.map((row, r) => {
        let x = 16;
        return (
          <g key={r}>
            {row.map((w, c) => {
              const rect = (
                <rect
                  key={c}
                  x={x}
                  y={74 + r * 22}
                  width={w}
                  height="10"
                  rx="1"
                  fill="var(--ink-3)"
                  style={{
                    opacity: active ? 0.22 + c * 0.03 : 0,
                    transform: active ? 'none' : 'translateY(8px)',
                    transition: `opacity .7s ${EASE} ${160 + (r * 5 + c) * 26}ms, transform .7s ${EASE} ${160 + (r * 5 + c) * 26}ms`,
                  }}
                />
              );
              x += w + 8;
              return rect;
            })}
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Execution — two review gates before anything leaves the office.  */
/* ------------------------------------------------------------------ */
export function ReviewDiagram({ active }: Props) {
  const gates = [104, 186];
  return (
    <svg
      viewBox="0 0 320 176"
      className={FRAME}
      role="img"
      aria-label="Work passing through two review checks before it is filed"
    >
      <path d="M 22 88 H 292" stroke="var(--hairline-strong)" strokeWidth="1" />
      <path
        d="M 22 88 H 292"
        stroke="var(--accent)"
        strokeWidth="1.5"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={active ? 0 : 1}
        style={{ transition: `stroke-dashoffset 1.1s ${EASE} 120ms` }}
      />

      <rect
        x="14"
        y="76"
        width="26"
        height="24"
        rx="2"
        fill="var(--faint)"
        opacity="0.5"
        style={step(0, active, 0)}
      />

      {gates.map((x, i) => (
        <g key={x} style={step(i + 2, active, 0)}>
          <circle
            cx={x}
            cy="88"
            r="15"
            fill="var(--ground)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <path
            d={`M ${x - 6} 88 l 4 4 l 8 -9`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x={x}
            y="122"
            textAnchor="middle"
            fill="var(--ink-3)"
            fontSize="9"
            letterSpacing="1.2"
          >
            {i === 0 ? 'PREPARE' : 'REVIEW'}
          </text>
        </g>
      ))}

      <g style={step(4, active, 0)}>
        <rect x="264" y="70" width="36" height="36" rx="2" fill="var(--accent)" />
        <path
          d="M 274 88 l 5 5 l 11 -12"
          fill="none"
          stroke="var(--accent-ink)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Aftercare — the file stays open long after the filing closes.    */
/* ------------------------------------------------------------------ */
export function AftercareDiagram({ active }: Props) {
  const ticks = Array.from({ length: 13 }, (_, i) => 22 + i * 22);
  return (
    <svg
      viewBox="0 0 320 176"
      className={FRAME}
      role="img"
      aria-label="A filing date and a notice arriving many months later, joined by a retained file"
    >
      <line x1="14" y1="104" x2="306" y2="104" stroke="var(--hairline-strong)" strokeWidth="1" />
      {ticks.map((x, i) => (
        <line
          key={x}
          x1={x}
          y1="100"
          x2={x}
          y2="108"
          stroke="var(--faint)"
          strokeWidth="1"
          style={{ opacity: active ? 0.6 : 0, transition: `opacity .5s ${EASE} ${i * 34}ms` }}
        />
      ))}

      {/* Filed */}
      <g style={step(0, active, 0)}>
        <line x1="22" y1="62" x2="22" y2="104" stroke="var(--accent)" strokeWidth="1.5" />
        <circle cx="22" cy="62" r="5" fill="var(--accent)" />
        <text x="14" y="50" fill="var(--ink-3)" fontSize="9" letterSpacing="1.2">
          FILED
        </text>
      </g>

      {/* The span the file is held for */}
      <path
        d="M 22 132 H 286"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeDasharray="3 4"
        pathLength={1}
        strokeDashoffset={active ? 0 : 1}
        style={{
          transition: `stroke-dashoffset 1.3s ${EASE} 260ms`,
          strokeDasharray: '1',
          opacity: 0.55,
        }}
      />
      <text
        x="22"
        y="150"
        fill="var(--ink-3)"
        fontSize="9"
        letterSpacing="1.2"
        style={{ opacity: active ? 0.85 : 0, transition: `opacity .6s ${EASE} 700ms` }}
      >
        WORKING PAPERS RETAINED
      </text>

      {/* Notice, much later */}
      <g style={step(6, active, 0)}>
        <line x1="286" y1="62" x2="286" y2="104" stroke="var(--caution)" strokeWidth="1.5" />
        <rect x="272" y="48" width="28" height="22" rx="2" fill="var(--caution)" />
        <text x="230" y="34" fill="var(--ink-3)" fontSize="9" letterSpacing="1.2">
          NOTICE, M+14
        </text>
      </g>
    </svg>
  );
}

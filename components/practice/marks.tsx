import { cn } from '@/lib/utils';

/**
 * One drawing per half of the practice.
 *
 * The site's claim is that advisory and engineering carry equal weight here,
 * so each half gets a mark of the same size, in the same ink, built from the
 * same primitives. Neither is an icon: each states that half's actual
 * argument — advisory, that a filed figure is only as good as the records
 * under it; engineering, that one team holds the whole stack rather than
 * three vendors holding a third each.
 *
 * These are server-rendered. The staged entrance rides on the existing scroll
 * reveal: `.mark-step` is styled in globals.css to settle once its enclosing
 * `.reveal` is shown, so there is no observer, no client bundle, and nothing
 * hidden from a crawler or from anyone with motion turned down.
 */

type MarkProps = { className?: string };

/** Staggers a piece of a mark without needing a client component. */
function at(ms: number): React.CSSProperties {
  return { ['--mark-delay' as string]: `${ms}ms` } as React.CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Advisory — the filed position, and the record holding it up.        */
/* ------------------------------------------------------------------ */
export function AdvisoryMark({ className }: MarkProps) {
  const records = [38, 62, 30, 74, 48, 56, 34];
  return (
    <svg
      viewBox="0 0 320 200"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label="A filed figure resting on a wide base of reconciled source records"
    >
      {/* The filed position */}
      <g className="mark-step" style={at(0)}>
        <rect x="86" y="14" width="148" height="30" rx="2" fill="var(--accent)" />
        <rect x="102" y="26" width="74" height="6" rx="1" fill="var(--accent-ink)" opacity="0.8" />
        <rect x="186" y="26" width="32" height="6" rx="1" fill="var(--accent-ink)" opacity="0.45" />
      </g>

      {/* What it rests on */}
      {[110, 160, 210].map((x, i) => (
        <path
          key={x}
          className="mark-step"
          style={at(160 + i * 70)}
          d={`M ${x} 48 V 74`}
          stroke="var(--hairline-strong)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
      ))}

      <line x1="14" y1="82" x2="306" y2="82" stroke="var(--hairline-strong)" strokeWidth="1" />

      {records.map((h, i) => (
        <rect
          key={i}
          className="mark-step"
          style={at(320 + i * 60)}
          x={18 + i * 42}
          y={176 - h}
          width="26"
          height={h}
          rx="1"
          fill="var(--ink-3)"
          opacity={0.22 + i * 0.04}
        />
      ))}

      <line x1="14" y1="176" x2="306" y2="176" stroke="var(--hairline-strong)" strokeWidth="1" />
      <text
        className="mark-step"
        style={at(760)}
        x="14"
        y="194"
        fill="var(--ink-3)"
        fontSize="9"
        letterSpacing="1.4"
      >
        RECONCILED SOURCE RECORDS
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Engineering — one stack, held end to end.                           */
/* ------------------------------------------------------------------ */
export function EngineeringMark({ className }: MarkProps) {
  const layers = [
    { y: 18, label: 'INTERFACE' },
    { y: 76, label: 'LOGIC' },
    { y: 134, label: 'DATA' },
  ];
  return (
    <svg
      viewBox="0 0 320 200"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label="Interface, logic and data layers threaded by a single path held by one team"
    >
      {layers.map((layer, i) => (
        <g key={layer.label} className="mark-step" style={at(i * 120)}>
          <rect
            x="14"
            y={layer.y}
            width="292"
            height="44"
            rx="3"
            fill="var(--surface)"
            stroke="var(--hairline-strong)"
            strokeWidth="1"
          />
          <text x="30" y={layer.y + 26} fill="var(--ink-3)" fontSize="9" letterSpacing="1.4">
            {layer.label}
          </text>
          {/* Contents of the layer, sketched. */}
          {[0, 1, 2].map((c) => (
            <rect
              key={c}
              x={132 + c * 56}
              y={layer.y + 18}
              width={[40, 44, 36][c]}
              height="8"
              rx="1"
              fill="var(--faint)"
              opacity="0.55"
            />
          ))}
        </g>
      ))}

      {/* The single path through all three — the whole point. */}
      <path
        className="mark-step"
        style={at(380)}
        d="M 108 40 V 98 H 268 V 156"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [108, 40],
        [108, 98],
        [268, 98],
        [268, 156],
      ].map(([cx, cy], i) => (
        <circle
          key={`${cx}-${cy}`}
          className="mark-step"
          style={at(440 + i * 70)}
          cx={cx}
          cy={cy}
          r="3.5"
          fill="var(--accent)"
        />
      ))}

      <text
        className="mark-step"
        style={at(760)}
        x="14"
        y="194"
        fill="var(--ink-3)"
        fontSize="9"
        letterSpacing="1.4"
      >
        ONE TEAM, END TO END
      </text>
    </svg>
  );
}

export const PRACTICE_MARKS = {
  advisory: AdvisoryMark,
  engineering: EngineeringMark,
} as const;

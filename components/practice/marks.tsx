import { Bar, Rule, Tag, Value } from '@/components/diagrams/kit';
import { cn } from '@/lib/utils';

/**
 * One drawing per half of the practice.
 *
 * The site's claim is that advisory and engineering carry equal weight here,
 * so each half gets a mark of the same size, in the same ink, built from the
 * same primitives. Neither is an icon: each states that half's actual
 * argument — advisory, that a filed figure is only as good as the records
 * under it; engineering, that one team holds the whole stack rather than three
 * vendors holding a third each.
 *
 * These play once and hold, rather than looping like the slideshow drawings.
 * A looping animation beside a paragraph someone is trying to read is a
 * distraction; the same vocabulary run once is an illustration. The staging
 * rides on the existing scroll reveal via `.dg-once`, so they are server
 * rendered with no client bundle and settle immediately under reduced motion.
 */

type MarkProps = { className?: string };

/** Sequences a piece of a mark without needing a client component. */
function at(ms: number, fy = 8): React.CSSProperties {
  return { ['--d' as string]: `${ms}ms`, ['--fy' as string]: `${fy}px` } as React.CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Advisory — the filed position, and the record holding it up.        */
/* ------------------------------------------------------------------ */
export function AdvisoryMark({ className }: MarkProps) {
  const records = [34, 58, 26, 70, 44, 52, 30];

  return (
    <svg
      viewBox="0 0 320 200"
      className={cn('dg-mark h-auto w-full', className)}
      role="img"
      aria-label="A filed figure resting on a wide base of reconciled source records"
    >
      {/* The number that goes on the return. The label sits above the plate
          rather than inside it — at small sizes the two ran into each other. */}
      <g className="dg-once" style={at(0, -10)}>
        <Tag x={160} y={14} anchor="middle">
          AS FILED
        </Tag>
        <rect x={92} y={22} width={136} height={34} rx="2" fill="var(--accent)" />
        <Value x={160} y={45} size={15} anchor="middle" style={{ fill: 'var(--accent-ink)' }}>
          4,18,600
        </Value>
      </g>

      {/* What it rests on. */}
      {[122, 160, 198].map((x, i) => (
        <path
          key={x}
          className="dg-once-trace"
          style={at(220 + i * 90)}
          d={`M ${x} 56 V 72`}
          stroke="var(--hairline-strong)"
          strokeWidth="1"
          strokeDasharray="1"
          pathLength={1}
        />
      ))}

      <Rule x1={14} y1={78} x2={306} y2={78} />
      <Tag x={14} y={94}>
        EVERY FIGURE TRACEABLE
      </Tag>

      {records.map((h, i) => (
        <rect
          key={i}
          className="dg-once"
          style={at(520 + i * 70, 14)}
          x={18 + i * 42}
          y={168 - h}
          width={26}
          height={h}
          rx="1.5"
          fill="var(--ink-3)"
          fillOpacity={0.2 + i * 0.035}
        />
      ))}

      <Rule x1={14} y1={168} x2={306} y2={168} />
      <Tag x={14} y={186}>
        LEDGERS · BANK · CONTRACTS · RETURNS
      </Tag>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Engineering — one stack, held end to end.                           */
/* ------------------------------------------------------------------ */
export function EngineeringMark({ className }: MarkProps) {
  const layers = [
    { y: 14, label: 'INTERFACE', detail: 'What the client sees' },
    { y: 70, label: 'LOGIC', detail: 'What the rules enforce' },
    { y: 126, label: 'DATA', detail: 'What the filing is built from' },
  ];

  return (
    <svg
      viewBox="0 0 320 200"
      className={cn('dg-mark h-auto w-full', className)}
      role="img"
      aria-label="Interface, logic and data layers threaded by a single path held end to end by one team"
    >
      {layers.map((layer, i) => (
        <g key={layer.label} className="dg-once" style={at(i * 130)}>
          <rect
            x={14}
            y={layer.y}
            width={292}
            height={44}
            rx="3"
            fill="var(--surface)"
            stroke="var(--hairline-strong)"
            strokeWidth="1"
          />
          <Tag x={28} y={layer.y + 17} tone="ink">
            {layer.label}
          </Tag>
          <Tag x={28} y={layer.y + 36} tone="quiet">
            {layer.detail}
          </Tag>
          {[0, 1, 2].map((c) => (
            <Bar key={c} x={196 + c * 34} y={layer.y + 19} w={[24, 28, 20][c]} h={7} />
          ))}
        </g>
      ))}

      {/* One path through all three — the whole argument. */}
      <path
        className="dg-once-trace"
        style={at(420)}
        d="M 92 58 V 92 H 256 V 126"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1"
        pathLength={1}
      />
      {[
        [92, 58],
        [92, 92],
        [256, 92],
        [256, 126],
      ].map(([cx, cy], i) => (
        <circle
          key={`${cx}-${cy}`}
          className="dg-once"
          style={at(700 + i * 80, 4)}
          cx={cx}
          cy={cy}
          r={3.5}
          fill="var(--accent)"
        />
      ))}

      <Rule x1={14} y1={186} x2={306} y2={186} />
      <Tag x={14} y={182}>
        ONE TEAM, END TO END
      </Tag>
      <Value
        x={306}
        y={182}
        size={10}
        tone="accent"
        anchor="end"
        className="dg-once"
        style={at(1020)}
      >
        0 handoffs
      </Value>
    </svg>
  );
}

export const PRACTICE_MARKS = {
  advisory: AdvisoryMark,
  engineering: EngineeringMark,
} as const;

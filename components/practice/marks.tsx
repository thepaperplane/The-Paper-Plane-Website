import { Rule, Tag, Value } from '@/components/diagrams/kit';
import { cn } from '@/lib/utils';

/**
 * One drawing per half of the practice.
 *
 * Each has to answer a client's question rather than describe a system. The
 * advisory mark answers "what do you actually do all year" — the books are
 * closed and verified every month, so nothing has to be reconstructed in
 * March. The engineering mark answers "what happens if I hire you to build
 * something" — one team from the first sketch to the live site.
 *
 * The pair these replace were drawn from the inside out: a filed figure over a
 * bar chart, and three layers labelled INTERFACE, LOGIC and DATA. Both were
 * accurate and neither was any use to the person reading them. Nobody hiring a
 * web developer is asking about the logic layer.
 *
 * They play once and hold rather than looping. A loop beside a paragraph
 * someone is reading is a distraction; the same vocabulary, run once as they
 * scroll to it, is an illustration. The staging rides on the existing scroll
 * reveal, so these are server rendered with no client JavaScript and settle
 * immediately under reduced motion.
 */

type MarkProps = { className?: string };

/** Sequences a piece of a mark without needing a client component. */
function at(ms: number, fy = 8, fx = 0): React.CSSProperties {
  return {
    ['--d' as string]: `${ms}ms`,
    ['--fy' as string]: `${fy}px`,
    ['--fx' as string]: `${fx}px`,
  } as React.CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Advisory — the month closed, twelve times a year.                   */
/* ------------------------------------------------------------------ */
export function AdvisoryMark({ className }: MarkProps) {
  const slips = [0, 1, 2, 3];
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <svg
      viewBox="0 0 320 200"
      className={cn('dg-mark h-auto w-full', className)}
      role="img"
      aria-label="Vouchers matched into a verified ledger each month, and twelve months closed across the year"
    >
      <Tag x={14} y={18}>
        EVERY MONTH
      </Tag>

      {/* What arrives: slips, bills, statements. */}
      {slips.map((i) => (
        <rect
          key={i}
          className="dg-once"
          style={at(i * 90, 0, -10)}
          x={14}
          y={34 + i * 17}
          width={52 - (i % 2) * 10}
          height={10}
          rx="1.5"
          fill="var(--ink-3)"
          fillOpacity="0.26"
        />
      ))}

      {/* Matched across, one line at a time. */}
      {slips.map((i) => (
        <path
          key={`t${i}`}
          className="dg-once-trace"
          style={at(220 + i * 100)}
          d={`M 72 ${39 + i * 17} H 114`}
          stroke="var(--hairline-strong)"
          strokeWidth="1"
          strokeDasharray="1"
          pathLength={1}
        />
      ))}

      {/* Into a ledger that balances. */}
      <rect
        x={120}
        y={28}
        width={108}
        height={78}
        rx="3"
        fill="var(--surface)"
        stroke="var(--hairline-strong)"
        strokeWidth="1"
      />
      {slips.map((i) => (
        <rect
          key={`l${i}`}
          className="dg-once"
          style={at(420 + i * 100, 6)}
          x={132}
          y={42 + i * 16}
          width={84 - (i % 2) * 18}
          height={8}
          rx="1"
          fill="var(--accent)"
        />
      ))}

      {/* Signed off before the next month starts. */}
      <g className="dg-once" style={at(880, 0)}>
        <circle
          cx={270}
          cy={67}
          r={18}
          fill="var(--ground)"
          stroke="var(--accent)"
          strokeWidth="1.4"
        />
        <path
          d="M 262 67 l 5 5 l 11 -12"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <Rule x1={14} y1={124} x2={306} y2={124} />
      <Tag x={14} y={142}>
        TWELVE CLOSES A YEAR
      </Tag>
      <Value
        x={306}
        y={143}
        size={10}
        tone="accent"
        anchor="end"
        className="dg-once"
        style={at(1660)}
      >
        12 / 12
      </Value>

      {/* The year, month by month. */}
      {months.map((m) => (
        <rect
          key={m}
          className="dg-once"
          style={at(1000 + m * 55, 5)}
          x={14 + m * 24.6}
          y={152}
          width={20}
          height={16}
          rx="2"
          fill="var(--accent)"
          fillOpacity={0.35 + (m % 3) * 0.12}
        />
      ))}

      <Tag x={14} y={192}>
        NOT RECONSTRUCTED IN MARCH
      </Tag>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Engineering — first sketch to live site, one team.                  */
/* ------------------------------------------------------------------ */
export function EngineeringMark({ className }: MarkProps) {
  const stages = [
    { x: 14, label: 'SKETCH' },
    { x: 118, label: 'DESIGN' },
    { x: 222, label: 'LIVE' },
  ];

  return (
    <svg
      viewBox="0 0 320 200"
      className={cn('dg-mark h-auto w-full', className)}
      role="img"
      aria-label="A project moving from a rough sketch to a finished design to a live site, handled by one team throughout"
    >
      <Tag x={14} y={18}>
        HOW A PROJECT RUNS
      </Tag>

      {/* 1. A rough sketch. */}
      <g className="dg-once" style={at(0)}>
        <rect
          x={14}
          y={34}
          width={84}
          height={76}
          rx="3"
          fill="none"
          stroke="var(--hairline-strong)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={26}
            y={48 + i * 18}
            width={[58, 44, 52][i]}
            height={7}
            rx="1"
            fill="var(--ink-3)"
            fillOpacity="0.24"
          />
        ))}
      </g>

      {/* 2. The finished design. */}
      <g className="dg-once" style={at(320)}>
        <rect
          x={118}
          y={34}
          width={84}
          height={76}
          rx="3"
          fill="var(--surface)"
          stroke="var(--accent)"
          strokeWidth="1.2"
        />
        <rect x={118} y={34} width={84} height={14} rx="3" fill="var(--accent)" />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={130}
            y={60 + i * 16}
            width={[60, 46, 54][i]}
            height={7}
            rx="1"
            fill="var(--accent)"
            fillOpacity={0.55 - i * 0.12}
          />
        ))}
      </g>

      {/* 3. Live, on the things people actually use. */}
      <g className="dg-once" style={at(640)}>
        <rect
          x={222}
          y={38}
          width={62}
          height={44}
          rx="2"
          fill="var(--surface)"
          stroke="var(--ink-3)"
          strokeWidth="1.2"
        />
        <rect x={222} y={38} width={62} height={8} rx="2" fill="var(--accent)" />
        <rect x={214} y={84} width={78} height={4} rx="2" fill="var(--ink-3)" fillOpacity="0.45" />
        <rect
          x={290}
          y={56}
          width={18}
          height={32}
          rx="3"
          fill="var(--surface)"
          stroke="var(--ink-3)"
          strokeWidth="1.2"
        />
        <rect x={290} y={56} width={18} height={5} rx="2" fill="var(--accent)" />
      </g>

      {/* The single line running the whole way — the actual claim. */}
      <path
        className="dg-once-trace"
        style={at(180)}
        d="M 56 118 H 264"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="1"
        pathLength={1}
      />
      {[56, 160, 264].map((cx, i) => (
        <circle
          key={cx}
          className="dg-once"
          style={at(420 + i * 150, 4)}
          cx={cx}
          cy={118}
          r={4}
          fill="var(--accent)"
        />
      ))}

      {stages.map((s) => (
        <Tag key={s.label} x={s.x + 42} y={140} anchor="middle">
          {s.label}
        </Tag>
      ))}

      <Rule x1={14} y1={162} x2={306} y2={162} />
      <Tag x={14} y={182} tone="ink">
        ONE TEAM, START TO FINISH
      </Tag>
      <Value
        x={306}
        y={183}
        size={10}
        tone="accent"
        anchor="end"
        className="dg-once"
        style={at(1050)}
      >
        no handoffs
      </Value>
    </svg>
  );
}

export const PRACTICE_MARKS = {
  advisory: AdvisoryMark,
  engineering: EngineeringMark,
} as const;

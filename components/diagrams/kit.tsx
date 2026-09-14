import { cn } from '@/lib/utils';

/**
 * Drawing kit.
 *
 * Shared primitives for every diagram on the site. The point is consistency:
 * one ink hierarchy, one label size, one corner radius, one set of motions, so
 * sixteen drawings read as one hand rather than sixteen separate doodles.
 *
 * Ink hierarchy — this is the whole grammar, and it is what makes a drawing
 * legible before the caption is read:
 *
 *   --ink-3, low opacity   context. Data that is present but not the point.
 *   --accent               the subject. What this drawing is actually about.
 *   --caution              the exception. The thing that went wrong.
 *   --hairline-strong      structure. Rules, axes, containers.
 *
 * Every drawing is authored in its finished state and the motion is layered on
 * by the .dg-* classes in globals.css, so anyone with reduced motion — or any
 * renderer that ignores CSS animation — sees the completed diagram.
 */

export const DG_W = 320;
export const DG_H = 176;

/** Per-element sequencing. `d` is the element's place in the cycle. */
export function seq(d: number, vars?: Record<string, string | number>): React.CSSProperties {
  return { ['--d' as string]: `${d}ms`, ...vars } as React.CSSProperties;
}

/** Travel vector, in user units. */
export function from(fx: number, fy: number): React.CSSProperties {
  return { ['--fx' as string]: `${fx}px`, ['--fy' as string]: `${fy}px` } as React.CSSProperties;
}

export function travel(d: number, fx: number, fy: number, tx = 0, ty = 0): React.CSSProperties {
  return {
    ['--d' as string]: `${d}ms`,
    ['--fx' as string]: `${fx}px`,
    ['--fy' as string]: `${fy}px`,
    ['--tx' as string]: `${tx}px`,
    ['--ty' as string]: `${ty}px`,
  } as React.CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Frame                                                               */
/* ------------------------------------------------------------------ */

export function Frame({
  label,
  active = true,
  cycle = 5200,
  height = DG_H,
  children,
  className,
}: {
  /** What the drawing says, for anyone who cannot see it. */
  label: string;
  /** Pauses the whole scene when this stage is not the one on show. */
  active?: boolean;
  cycle?: number;
  height?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${DG_W} ${height}`}
      className={cn('h-full w-full', className)}
      role="img"
      aria-label={label}
      style={
        {
          ['--cycle' as string]: `${cycle}ms`,
          ['--dg-play' as string]: active ? 'running' : 'paused',
        } as React.CSSProperties
      }
    >
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Type                                                                */
/* ------------------------------------------------------------------ */

/** Small caps label. The only type size used for naming things. */
export function Tag({
  x,
  y,
  children,
  anchor = 'start',
  tone = 'quiet',
  className,
  style,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  tone?: 'quiet' | 'accent' | 'caution' | 'ink';
  className?: string;
  style?: React.CSSProperties;
}) {
  const fill = {
    // --ink-2, not --ink-3. A label is the only text inside a drawing, so
    // nothing competes with it and there is no reason to whisper; --ink-3 at
    // this size left only 4.6:1 on the sunken panel these sit on.
    quiet: 'var(--ink-2)',
    accent: 'var(--accent)',
    caution: 'var(--caution)',
    ink: 'var(--ink)',
  }[tone];
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      letterSpacing="1.1"
      textAnchor={anchor}
      className={className}
      data-dg-fs=""
      style={{ fontFamily: 'var(--font-sans)', ['--dg-fs' as string]: 9, ...style }}
    >
      {children}
    </text>
  );
}

/** A figure. Set in the mono so numbers line up and read as data. */
export function Value({
  x,
  y,
  children,
  anchor = 'start',
  tone = 'ink',
  size = 12,
  className,
  style,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  tone?: 'quiet' | 'accent' | 'caution' | 'ink';
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const fill = {
    // --ink-2, not --ink-3. A label is the only text inside a drawing, so
    // nothing competes with it and there is no reason to whisper; --ink-3 at
    // this size left only 4.6:1 on the sunken panel these sit on.
    quiet: 'var(--ink-2)',
    accent: 'var(--accent)',
    caution: 'var(--caution)',
    ink: 'var(--ink)',
  }[tone];
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      textAnchor={anchor}
      className={className}
      data-dg-fs=""
      style={{ fontFamily: 'var(--font-mono)', ['--dg-fs' as string]: size, ...style }}
    >
      {children}
    </text>
  );
}

/* ------------------------------------------------------------------ */
/* Structure                                                           */
/* ------------------------------------------------------------------ */

/** A container: a record, a column, a document. Structure, so never animated. */
export function Panel({
  x,
  y,
  w,
  h,
  tone = 'plain',
  className,
  style,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: 'plain' | 'accent' | 'dashed' | 'solid';
  className?: string;
  style?: React.CSSProperties;
}) {
  const props =
    tone === 'accent'
      ? { fill: 'var(--accent)', fillOpacity: 0.07, stroke: 'var(--accent)', strokeWidth: 1.2 }
      : tone === 'dashed'
        ? {
            fill: 'none',
            stroke: 'var(--hairline-strong)',
            strokeWidth: 1.2,
            strokeDasharray: '3 3',
          }
        : tone === 'solid'
          ? { fill: 'var(--accent)', stroke: 'none' }
          : { fill: 'none', stroke: 'var(--hairline-strong)', strokeWidth: 1 };
  return (
    <rect x={x} y={y} width={w} height={h} rx="3" className={className} style={style} {...props} />
  );
}

/** A rule. The workhorse: baselines, separators, axes. */
export function Rule({
  x1,
  y1,
  x2,
  y2,
  tone = 'structure',
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tone?: 'structure' | 'faint';
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={tone === 'faint' ? 'var(--hairline)' : 'var(--hairline-strong)'}
      strokeWidth="1"
    />
  );
}

/** A row of data. Context by default; the subject when `tone` says so. */
export function Bar({
  x,
  y,
  w,
  h = 6,
  tone = 'context',
  className,
  style,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  tone?: 'context' | 'accent' | 'caution' | 'ink';
  className?: string;
  style?: React.CSSProperties;
}) {
  const fill = {
    context: 'var(--ink-3)',
    accent: 'var(--accent)',
    caution: 'var(--caution)',
    ink: 'var(--ink)',
  }[tone];
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="1"
      fill={fill}
      fillOpacity={tone === 'context' ? 0.3 : 1}
      className={className}
      style={style}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Action                                                              */
/* ------------------------------------------------------------------ */

/** A connector that draws itself on. */
export function Trace({
  d,
  delay,
  tone = 'accent',
  dashed = false,
  cls = 'dg-trace',
}: {
  d: string;
  delay: number;
  tone?: 'accent' | 'caution' | 'structure';
  dashed?: boolean;
  cls?: string;
}) {
  const stroke =
    tone === 'accent'
      ? 'var(--accent)'
      : tone === 'caution'
        ? 'var(--caution)'
        : 'var(--hairline-strong)';
  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={dashed ? '0.02 0.03' : '1'}
      className={cls}
      style={seq(delay)}
    />
  );
}

/** A tick in a ring — a check that passed. */
export function Pass({
  cx,
  cy,
  delay,
  r = 13,
}: {
  cx: number;
  cy: number;
  delay: number;
  r?: number;
}) {
  return (
    <g className="dg-appear dg-c" style={seq(delay)}>
      <circle cx={cx} cy={cy} r={r} fill="var(--ground)" stroke="var(--accent)" strokeWidth="1.3" />
      <path
        d={`M ${cx - r * 0.42} ${cy} l ${r * 0.28} ${r * 0.3} l ${r * 0.56} -${r * 0.62}`}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** The exception, flagged. */
export function Flag({
  cx,
  cy,
  delay,
  r = 8,
}: {
  cx: number;
  cy: number;
  delay: number;
  r?: number;
}) {
  return (
    <g className="dg-flag dg-c" style={seq(delay)}>
      <circle cx={cx} cy={cy} r={r} fill="var(--caution)" />
      <path
        d={`M ${cx} ${cy - r * 0.45} v ${r * 0.5}`}
        stroke="var(--ground)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy + r * 0.42} r="0.9" fill="var(--ground)" />
    </g>
  );
}

/** A travelling token — a document, a payment, a request in flight. */
export function Chip({
  x,
  y,
  w = 22,
  h = 14,
  delay,
  dx,
  dy = 0,
  tone = 'accent',
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  delay: number;
  /** How far it travels, in user units. */
  dx: number;
  dy?: number;
  tone?: 'accent' | 'caution' | 'context';
}) {
  const fill =
    tone === 'accent' ? 'var(--accent)' : tone === 'caution' ? 'var(--caution)' : 'var(--ink-3)';
  return (
    <g className="dg-travel" style={travel(delay, 0, 0, dx, dy)}>
      <rect x={x} y={y} width={w} height={h} rx="2" fill={fill} />
      <rect
        x={x + 4}
        y={y + h / 2 - 1}
        width={w - 8}
        height="2"
        rx="1"
        fill="var(--accent-ink)"
        opacity="0.75"
      />
    </g>
  );
}

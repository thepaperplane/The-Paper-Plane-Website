import { cn } from '@/lib/utils';

/**
 * The Paper Plane brand mark.
 *
 * Redrawn as vector from the supplied brand artwork: a sharp navy dart above
 * an outlined stack of documents trailing a blue motion swoosh.
 *
 * Kept as inline SVG rather than an image file so it scales without
 * artefacts, costs no extra request, can be tinted for dark grounds, and can
 * be animated group-by-group (see `animated`, used by the preloader).
 */

export const BRAND = {
  navy: '#152a52',
  navyDeep: '#0e1f3f',
  navyLight: '#1e3a6b',
  blue: '#3fa0d8',
  blueBright: '#2f8fd8',
  accent: '#2f80ed',
} as const;

type LogoMarkProps = {
  className?: string;
  /** Stagger the groups in on mount. Drives the preloader animation. */
  animated?: boolean;
  /** Lighten the navy so the mark holds up on a dark ground. */
  onDark?: boolean;
  title?: string;
};

export function LogoMark({
  className,
  animated = false,
  onDark = false,
  title = 'The Paper Plane',
}: LogoMarkProps) {
  const plane = onDark
    ? { main: '#2b4d84', fold: '#1d3663', keel: '#16294b' }
    : { main: '#152a52', fold: '#0e1f3f', keel: '#1e3a6b' };

  const paper = onDark ? '#6fc0ec' : '#3fa0d8';
  const paperDeep = onDark ? '#4aa9de' : '#2f8fd8';

  const anim = (delay: number, name = 'pp-glide') =>
    animated ? { animation: `${name} 0.6s var(--ease-out-ios) ${delay}s both` } : undefined;

  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={cn('block', className)}
    >
      {/* ---------------------------------------------------------------
          Document stack — outlined sheets with a clipped top-right corner,
          rotated into the flight line.
         --------------------------------------------------------------- */}
      <g fill="none" strokeLinejoin="round" strokeLinecap="round">
        {/* Back sheet */}
        <g transform="translate(112 196) rotate(-19)" style={anim(0.1)}>
          <path
            d="M9 0 H119 L152 33 V103 A9 9 0 0 1 143 112 H9 A9 9 0 0 1 0 103 V9 A9 9 0 0 1 9 0 Z"
            stroke={paper}
            strokeWidth="14"
          />
          <path d="M119 0 V24 A9 9 0 0 0 128 33 H152" stroke={paper} strokeWidth="12" />
        </g>

        {/* Front sheet */}
        <g transform="translate(150 128) rotate(-19)" style={anim(0)}>
          <path
            d="M9 0 H119 L152 33 V103 A9 9 0 0 1 143 112 H9 A9 9 0 0 1 0 103 V9 A9 9 0 0 1 9 0 Z"
            stroke={paperDeep}
            strokeWidth="15"
          />
          <path d="M119 0 V24 A9 9 0 0 0 128 33 H152" stroke={paperDeep} strokeWidth="13" />
          {/* Ruled lines — dropped at small sizes by the viewer, but they
              give the mark its "document" read at display size. */}
          <path d="M30 48 H96 M30 74 H118" stroke={paperDeep} strokeWidth="11" />
        </g>
      </g>

      {/* ---------------------------------------------------------------
          Motion trail — concentric arcs sweeping beneath and around the
          stack. Drawn last so they cross in front of the lower sheet.
         --------------------------------------------------------------- */}
      <g
        stroke={paper}
        strokeLinecap="round"
        fill="none"
        style={anim(0.26, 'pp-fade-up')}
      >
        <path d="M74 232 A 186 186 0 0 0 412 206" strokeWidth="17" />
        <path d="M84 274 A 156 156 0 0 0 372 250" strokeWidth="15" />
        <path d="M104 312 A 124 124 0 0 0 330 292" strokeWidth="13" />
      </g>

      {/* ---------------------------------------------------------------
          The dart.
         --------------------------------------------------------------- */}
      <g style={anim(0.2)}>
        {/* Upper wing face */}
        <path d="M570 10 L233 95 L390 150 Z" fill={plane.keel} />
        {/* Main body */}
        <path d="M570 10 L390 150 L323 235 L233 95 Z" fill={plane.main} />
        {/* Right wing, separated by the keel notch */}
        <path d="M570 10 L390 150 L507 227 Z" fill={plane.fold} />
      </g>
    </svg>
  );
}

/** Mark plus wordmark, as used in the header, footer and console. */
export function Logo({
  className,
  onDark = false,
  showTagline = false,
}: {
  className?: string;
  onDark?: boolean;
  showTagline?: boolean;
}) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark className="h-9 w-9 shrink-0" onDark={onDark} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[0.9375rem] font-bold tracking-[-0.015em]',
            onDark ? 'text-white' : 'text-[#152a52]',
          )}
        >
          The Paper Plane
        </span>
        {showTagline ? (
          <span className="mt-1 text-[0.6875rem] font-semibold">
            <span className={onDark ? 'text-brand-100' : 'text-[#152a52]'}>
              We handle the Papers,{' '}
            </span>
            <span className={onDark ? 'text-brand-300' : 'text-[#2f80ed]'}>
              You Handle the Takeoff
            </span>
          </span>
        ) : null}
      </span>
    </span>
  );
}

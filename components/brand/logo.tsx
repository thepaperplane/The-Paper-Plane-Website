import { cn } from '@/lib/utils';

/**
 * The Paper Plane brand mark.
 *
 * Served from `/brand/logo-mark.svg`, extracted directly from the supplied
 * Illustrator vector so it is pixel-exact rather than a reconstruction. It is
 * referenced as an <img> rather than inlined because the artwork is 326 paths
 * — inlining would add ~16 KB (gzipped) to the HTML of every single page,
 * where a file is fetched once and then cached for the whole site.
 *
 * Intrinsic ratio is 214.53 x 150.28 (≈ 1.43:1). `object-contain` guarantees
 * it can never be distorted by a caller passing a square box.
 */

/** Authentic brand colours, sampled from the vector source. */
export const BRAND = {
  /** Documents and motion swoosh. */
  blue: '#35a5d5',
  blueLight: '#4da8d0',
  /** Tagline accent — "You Handle the Takeoff". */
  accent: '#578ac8',
  /** The plane. */
  navy: '#11284a',
  navyMid: '#152b4d',
  navyWordmark: '#1c3252',
  navySoft: '#253857',
} as const;

/** Intrinsic dimensions of `/brand/logo-mark.svg`. */
export const MARK_RATIO = { width: 215, height: 150 } as const;

type LogoMarkProps = {
  className?: string;
  /** Glide the mark in on mount. Used by the preloader. */
  animated?: boolean;
  title?: string;
  /** Load eagerly — set for the header so the mark is present on first paint. */
  priority?: boolean;
};

export function LogoMark({
  className,
  animated = false,
  title = 'The Paper Plane',
  priority = false,
}: LogoMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- a static SVG; next/image does not optimise SVG and would only add overhead
    <img
      src="/brand/logo-mark.svg"
      alt={title}
      width={MARK_RATIO.width}
      height={MARK_RATIO.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={cn('block object-contain', className)}
      style={animated ? { animation: 'pp-glide 0.7s var(--ease-out-ios) both' } : undefined}
    />
  );
}

/**
 * Mark plus wordmark.
 *
 * The wordmark is live HTML text rather than part of the image: it stays
 * selectable, searchable and screen-reader friendly, scales with the user's
 * font settings, and keeps the header legible if the asset ever fails to load.
 */
export function Logo({
  className,
  showTagline = false,
  priority = false,
}: {
  className?: string;
  showTagline?: boolean;
  priority?: boolean;
}) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark
        className="h-9 w-[3.2rem] shrink-0"
        title=""
        priority={priority}
      />
      <span className="flex flex-col leading-none">
        <span className="text-[0.9375rem] font-bold tracking-[-0.015em] text-[#1c3252]">
          The Paper Plane
        </span>
        {showTagline ? (
          <span className="mt-1 text-[0.6875rem] font-semibold">
            <span className="text-[#1c3252]">We handle the Papers, </span>
            <span className="text-[#35a5d5]">You Handle the Takeoff</span>
          </span>
        ) : null}
      </span>
    </span>
  );
}

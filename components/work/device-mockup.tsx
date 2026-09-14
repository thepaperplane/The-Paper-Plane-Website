import { Globe, ImageOff, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Laptop + phone preview pair.
 *
 * Deliberately NOT an iframe. All three client sites send frame-blocking
 * headers (`X-Frame-Options` / `frame-ancestors 'none'`), so a live embed
 * would render three empty boxes. These frames take a captured screenshot
 * instead — visually identical, far faster, and immune to the client's
 * header policy.
 *
 * Everything inside the bezels is fixed, never themed. This is a picture of a
 * physical laptop showing a real browser: its screen does not turn black
 * because the visitor prefers dark mode, any more than the aluminium does.
 * Theme tokens in here put a near-black address pill inside a light browser
 * bar and dropped the URL to 2.6:1 in dark mode. Use literal colours below.
 */

type PreviewState = 'ready' | 'pending' | 'unreachable';

type Props = {
  desktopSrc?: string | null;
  mobileSrc?: string | null;
  displayUrl: string;
  name: string;
  state?: PreviewState;
  note?: string | null;
  className?: string;
};

export function DeviceMockup({
  desktopSrc,
  mobileSrc,
  displayUrl,
  name,
  state = 'ready',
  note,
  className,
}: Props) {
  const hasDesktop = state === 'ready' && Boolean(desktopSrc);
  const hasMobile = state === 'ready' && Boolean(mobileSrc);

  return (
    <div className={cn('relative', className)}>
      <div className="flex items-end gap-4 sm:gap-6">
        {/* ---------------- Laptop ---------------- */}
        <figure className="relative min-w-0 flex-1">
          {/* Lid */}
          <div className="rounded-t-[var(--radius-md)] bg-gradient-to-b from-[#3a3a3e] to-[#232326] p-[0.5rem] shadow-[var(--shadow-lift)] sm:p-[0.625rem]">
            {/* Camera */}
            <div className="mb-[0.375rem] flex justify-center">
              <span className="h-[3px] w-[3px] rounded-full bg-[#4a4a4f]" />
            </div>

            {/* Screen */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-white">
              {/* Browser chrome */}
              <div className="absolute inset-x-0 top-0 z-10 flex h-6 items-center gap-2 border-b border-black/5 bg-[#f6f6f8] px-2.5 sm:h-7">
                <span className="flex gap-1">
                  <span className="h-[5px] w-[5px] rounded-full bg-[#ff5f57]" />
                  <span className="h-[5px] w-[5px] rounded-full bg-[#febc2e]" />
                  <span className="h-[5px] w-[5px] rounded-full bg-[#28c840]" />
                </span>
                <span className="flex min-w-0 flex-1 items-center gap-1 rounded-full bg-white px-2 py-[2px] ring-1 ring-black/5">
                  <Lock className="h-2 w-2 shrink-0 text-[#28c840]" strokeWidth={3} />
                  <span className="truncate text-[7px] text-[#55575e] sm:text-[8px]">
                    {displayUrl}
                  </span>
                </span>
              </div>

              {/* Content */}
              <div className="absolute inset-0 top-6 sm:top-7">
                {hasDesktop ? (
                  // eslint-disable-next-line @next/next/no-img-element -- remote capture, sized by the frame
                  <img
                    src={desktopSrc!}
                    alt={`${name} — desktop view`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <PlaceholderScreen state={state} note={note} />
                )}
              </div>
            </div>
          </div>

          {/* Base + hinge */}
          <div className="relative">
            <div className="h-[0.5rem] rounded-b-[2px] bg-gradient-to-b from-[#232326] to-[#3a3a3e] sm:h-[0.625rem]" />
            <div className="mx-auto h-[0.3125rem] w-[94%] rounded-b-[var(--radius-sm)] bg-gradient-to-b from-[#c8c8cc] to-[#9a9aa0] shadow-[var(--shadow-soft)]">
              <div className="mx-auto h-[0.3125rem] w-[12%] rounded-b-[3px] bg-[#8a8a90]" />
            </div>
          </div>
          <figcaption className="sr-only">{name} shown on a laptop</figcaption>
        </figure>

        {/* ---------------- Phone ---------------- */}
        <figure className="relative w-[22%] min-w-[68px] shrink-0 sm:w-[20%]">
          <div className="rounded-[1.25rem] bg-gradient-to-b from-[#3a3a3e] to-[#232326] p-[3px] shadow-[var(--shadow-lift)] sm:rounded-[1.5rem] sm:p-[4px]">
            <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.0625rem] bg-white sm:rounded-[1.25rem]">
              {/* Dynamic island */}
              <div className="absolute top-[3px] left-1/2 z-10 h-[7px] w-[30%] -translate-x-1/2 rounded-full bg-[#1d1d1f] sm:top-[4px] sm:h-[9px]" />

              {hasMobile ? (
                // eslint-disable-next-line @next/next/no-img-element -- remote capture, sized by the frame
                <img
                  src={mobileSrc!}
                  alt={`${name} — mobile view`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <PlaceholderScreen state={state} compact />
              )}

              {/* Home indicator */}
              <div className="absolute bottom-[4px] left-1/2 h-[2px] w-[26%] -translate-x-1/2 rounded-full bg-[#1d1d1f]/25" />
            </div>
          </div>
          <figcaption className="sr-only">{name} shown on a phone</figcaption>
        </figure>
      </div>
    </div>
  );
}

function PlaceholderScreen({
  state,
  note,
  compact = false,
}: {
  state: PreviewState;
  note?: string | null;
  compact?: boolean;
}) {
  const unreachable = state === 'unreachable';
  const Icon = unreachable ? Globe : ImageOff;

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center gap-2 p-3 text-center',
        'bg-[linear-gradient(135deg,#f5f5f7_0%,#ffffff_50%,#eff8ff_100%)]',
      )}
    >
      <Icon
        className={cn('shrink-0 text-[#55575e]', compact ? 'h-3 w-3' : 'h-5 w-5')}
        strokeWidth={1.8}
      />
      {!compact ? (
        <>
          <p className="text-[0.6875rem] font-medium text-[#55575e]">
            {unreachable ? 'Site not currently reachable' : 'Preview pending capture'}
          </p>
          {note ? (
            <p className="max-w-[22ch] text-[0.5625rem] leading-snug text-[#55575e]">{note}</p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

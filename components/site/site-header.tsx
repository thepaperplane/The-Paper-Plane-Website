'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/brand/logo';
import { ThemeToggle } from '@/components/site/theme';
import { PRIMARY_NAV, SITE, whatsappLink } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * Masthead.
 *
 * A rule rather than a shadow, a rectangle rather than a pill, and no
 * backdrop-blur glass panel — those were the three things that made the old
 * header read as a component-library default.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50',
          // The bar only becomes glass once there is content under it to
          // refract; at the top of the page it stays out of the way entirely.
          // Only the fill and shadow are transitioned — animating the blur
          // radius itself forces a full backdrop re-sample every frame.
          'transition-[background-color,box-shadow,border-color] duration-[var(--dur-control)] ease-[var(--ease-standard)]',
          scrolled
            ? 'glass glass-thin rounded-none border-b border-transparent'
            : 'border-b border-transparent bg-transparent shadow-none backdrop-blur-none',
        )}
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-[84rem] items-center gap-8 px-6 sm:px-10">
          <Link href="/" aria-label={`${SITE.name} — home`} className="shrink-0">
            <Logo priority />
          </Link>

          <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Primary">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'tap text-[length:var(--text-small)] whitespace-nowrap transition-colors duration-300',
                  isActive(item.href) ? 'text-ink' : 'text-ink-3 hover:text-ink',
                )}
              >
                {item.short ?? item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-0 lg:gap-2">
            <ThemeToggle />

            <Link
              href="/contact"
              className="bg-accent text-accent-ink hover:bg-accent-hover hidden h-9 items-center rounded-[var(--radius-sm)] px-4 text-[length:var(--text-small)] font-medium whitespace-nowrap transition-colors duration-300 sm:inline-flex"
            >
              Start a conversation
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="text-ink relative inline-flex h-9 w-9 items-center justify-center lg:hidden"
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span
                  className="bg-ink absolute left-0 block h-px w-full transition-all duration-400 ease-[var(--ease-out-editorial)]"
                  style={{
                    top: open ? '50%' : 0,
                    transform: open ? 'rotate(45deg)' : 'none',
                  }}
                />
                <span
                  className="bg-ink absolute left-0 block h-px w-full transition-all duration-400 ease-[var(--ease-out-editorial)]"
                  style={{
                    bottom: open ? '50%' : 0,
                    transform: open ? 'rotate(-45deg) translateY(-0.5px)' : 'none',
                  }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — a full-height editorial index, not a dropdown card. */}
      <div
        id="site-menu"
        aria-hidden={!open}
        className={cn(
          'fixed inset-0 z-40 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div
          className={cn(
            'glass glass-thick absolute inset-0 rounded-none transition-opacity',
            'duration-[var(--dur-control)] ease-[var(--ease-standard)]',
            open ? 'opacity-100' : 'opacity-0',
          )}
        />
        <nav
          aria-label="Mobile"
          className={cn(
            'relative flex h-full flex-col px-6 pt-[6rem] pb-10 sm:px-10',
            'transition-[transform,opacity] duration-[var(--dur-section)] ease-[var(--spring-gentle)]',
            open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <ul className="flex-1">
            {PRIMARY_NAV.map((item, i) => (
              <li key={item.href} className="border-b last:border-b-0">
                <Link
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  className="flex items-baseline gap-5 py-5"
                >
                  <span className="numeral w-5 shrink-0 text-[length:var(--text-caption)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        'block text-[length:var(--text-title-2)] leading-tight',
                        'font-[family-name:var(--font-display)]',
                        isActive(item.href) ? 'text-accent' : 'text-ink',
                      )}
                    >
                      {item.label}
                    </span>
                    {item.description ? (
                      <span className="text-ink-3 mt-1 block text-[length:var(--text-caption)]">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3">
            <Link
              href="/contact"
              tabIndex={open ? 0 : -1}
              className="bg-accent text-accent-ink flex h-12 items-center justify-center rounded-[var(--radius-sm)] text-[length:var(--text-small)] font-medium"
            >
              Start a conversation
            </Link>
            <div className="text-ink-3 flex items-center justify-between text-[length:var(--text-caption)]">
              <a href={`tel:${SITE.phoneIntl}`} className="tap" tabIndex={open ? 0 : -1}>
                {SITE.phone}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="tap"
                tabIndex={open ? 0 : -1}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

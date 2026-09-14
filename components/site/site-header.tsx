'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { PRIMARY_NAV, SITE, whatsappLink } from '@/lib/site';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the sheet on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock the body and allow Escape to dismiss while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-ios)]',
          scrolled
            ? 'border-b border-[var(--color-hairline)] bg-white/80 backdrop-blur-xl backdrop-saturate-[180%]'
            : 'border-b border-transparent bg-white/0',
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[80rem] items-center justify-between gap-4 px-6 sm:h-[4.5rem] sm:px-8">
          <Link
            href="/"
            className="shrink-0 rounded-lg transition-opacity hover:opacity-80"
            aria-label={`${SITE.name} — home`}
          >
            <Logo priority />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'relative rounded-[var(--radius-sm)] px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-200',
                  isActive(item.href)
                    ? 'text-brand-700'
                    : 'text-ink-secondary hover:text-ink hover:bg-sunken',
                )}
              >
                {item.label}
                {isActive(item.href) ? (
                  <span className="bg-brand-600 absolute inset-x-3.5 -bottom-px h-0.5 rounded-full" />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${SITE.phoneIntl}`}
              className="text-ink-secondary hover:text-ink hover:bg-sunken hidden h-10 items-center gap-2 rounded-[var(--radius-md)] px-3.5 text-[0.9375rem] font-medium transition-colors md:inline-flex"
            >
              <Phone className="h-4 w-4" strokeWidth={2} />
              <span className="hidden xl:inline">{SITE.phone}</span>
            </a>

            <Link
              href="/contact"
              className="bg-brand-600 hover:bg-brand-700 hidden h-10 items-center gap-1.5 rounded-[var(--radius-md)] px-4 text-[0.9375rem] font-semibold text-white shadow-[var(--shadow-brand)] transition-all duration-300 hover:shadow-[0_18px_36px_-12px_rgba(36,121,163,0.45)] active:scale-[0.97] sm:inline-flex"
            >
              Book a consultation
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="text-ink hover:bg-sunken inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] transition-colors lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={cn(
          'fixed inset-0 z-40 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={cn(
            'absolute inset-0 bg-[rgba(16,24,40,0.24)] backdrop-blur-sm transition-opacity duration-400',
            open ? 'opacity-100' : 'opacity-0',
          )}
        />

        <div
          className={cn(
            'absolute inset-x-0 top-0 origin-top bg-white pt-[4.5rem] pb-8 shadow-[var(--shadow-2xl)] transition-all duration-500 ease-[var(--ease-out-ios)]',
            open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
          )}
        >
          <nav className="px-6 sm:px-8" aria-label="Mobile">
            <ul className="divide-y divide-[var(--color-hairline)]">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between py-3.5"
                    tabIndex={open ? 0 : -1}
                  >
                    <span>
                      <span
                        className={cn(
                          'block text-[1.0625rem] font-semibold',
                          isActive(item.href) ? 'text-brand-700' : 'text-ink',
                        )}
                      >
                        {item.label}
                      </span>
                      {item.description ? (
                        <span className="text-ink-quaternary mt-0.5 block text-[0.8125rem]">
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                    <ArrowUpRight className="text-ink-quaternary group-hover:text-brand-600 h-4 w-4 shrink-0 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-2.5">
              <Link
                href="/contact"
                tabIndex={open ? 0 : -1}
                className="bg-brand-600 flex h-12 items-center justify-center rounded-[var(--radius-md)] text-base font-semibold text-white"
              >
                Book a consultation
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                className="text-ink flex h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] ring-1 ring-[var(--color-hairline-strong)] ring-inset"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp us
              </a>
              <a
                href={`tel:${SITE.phoneIntl}`}
                tabIndex={open ? 0 : -1}
                className="text-ink-tertiary flex h-11 items-center justify-center gap-2 text-[0.9375rem]"
              >
                <Phone className="h-4 w-4" />
                {SITE.phone}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

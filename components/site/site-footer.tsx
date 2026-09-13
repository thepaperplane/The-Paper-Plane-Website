import Link from 'next/link';
import { Globe, Mail, MessageCircle, Phone } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { FOOTER_NAV, SITE, whatsappLink } from '@/lib/site';

/**
 * NOTE: There is intentionally no address block, map, or `PostalAddress`
 * schema here. The practice is remote-first; `areaServed` in the
 * organisation JSON-LD is the correct markup for that and already lives
 * in the root layout.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sunken border-t border-[var(--color-hairline)]">
      <div className="mx-auto w-full max-w-[80rem] px-6 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,2fr)]">
          {/* Brand column */}
          <div className="max-w-sm">
            <Logo />

            <p className="text-ink-tertiary mt-5 text-[0.9375rem] leading-relaxed">
              Tax architecture, scrutiny defence, incorporation, audit and the digital
              infrastructure that carries them — delivered as one practice.
            </p>

            <dl className="mt-7 space-y-3">
              <div className="flex items-center gap-3">
                <dt className="sr-only">Phone</dt>
                <Phone className="text-brand-600 h-4 w-4 shrink-0" strokeWidth={2} />
                <dd>
                  <a
                    href={`tel:${SITE.phoneIntl}`}
                    className="text-ink hover:text-brand-700 text-[0.9375rem] font-medium transition-colors"
                  >
                    {SITE.phone}
                  </a>
                </dd>
              </div>

              <div className="flex items-center gap-3">
                <dt className="sr-only">Email</dt>
                <Mail className="text-brand-600 h-4 w-4 shrink-0" strokeWidth={2} />
                <dd>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-ink hover:text-brand-700 text-[0.9375rem] font-medium transition-colors"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>

              <div className="flex items-center gap-3">
                <dt className="sr-only">Practice model</dt>
                <Globe className="text-brand-600 h-4 w-4 shrink-0" strokeWidth={2} />
                <dd className="text-ink-tertiary text-[0.9375rem]">{SITE.serviceModel}</dd>
              </div>
            </dl>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink mt-7 inline-flex h-11 items-center gap-2 rounded-[var(--radius-md)] bg-white px-5 text-[0.9375rem] font-semibold shadow-[var(--shadow-sm)] ring-1 ring-[var(--color-hairline)] ring-inset transition-all hover:shadow-[var(--shadow-md)]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_NAV.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h2 className="text-ink text-[0.8125rem] font-semibold">{group.heading}</h2>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="text-ink-tertiary hover:text-brand-700 text-[0.9375rem] transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--color-hairline)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-quaternary text-[0.8125rem]">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="text-ink-quaternary text-[0.8125rem]">
            {SITE.hours}
          </p>
        </div>

        <p className="text-ink-quaternary mt-6 max-w-3xl text-[0.75rem] leading-relaxed">
          Information published on this site — including compliance dates, penalty figures and
          explanatory articles — is provided for general guidance and reflects the standard
          statutory position at the time of writing. Due dates are periodically extended by the
          relevant authority. Nothing here constitutes professional advice on your specific
          circumstances; please engage us directly before acting on it.
        </p>
      </div>
    </footer>
  );
}

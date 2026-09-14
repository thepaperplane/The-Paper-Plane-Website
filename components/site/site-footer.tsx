import Link from 'next/link';
import { Logo } from '@/components/brand/logo';
import { Container, Label, Rule } from '@/components/ui';
import { FOOTER_NAV, SITE, whatsappLink } from '@/lib/site';

/**
 * Colophon.
 *
 * Set as a masthead-and-index rather than four equal columns of links under a
 * logo. No address block and no PostalAddress schema — the practice is
 * remote-first, and `areaServed` in the organisation JSON-LD is the correct
 * markup for that.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <Container className="py-[var(--space-section-sm)]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)] lg:gap-24">
          {/* Masthead */}
          <div>
            <Logo showTagline />

            <p className="text-ink-2 mt-8 max-w-[34ch] text-[length:var(--text-small)] leading-relaxed">
              One practice for the filings and the software they depend on —
              advisory and engineering held to the same standard.
            </p>

            <dl className="mt-10 space-y-4">
              <div>
                <dt className="label mb-1.5">Direct</dt>
                <dd className="flex flex-col gap-1">
                  <a
                    href={`tel:${SITE.phoneIntl}`}
                    className="link-underline text-ink w-fit text-[length:var(--text-small)]"
                  >
                    {SITE.phone}
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="link-underline text-ink w-fit text-[length:var(--text-small)]"
                  >
                    {SITE.email}
                  </a>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-ink w-fit text-[length:var(--text-small)]"
                  >
                    WhatsApp
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label mb-1.5">Hours</dt>
                <dd className="text-ink-2 text-[length:var(--text-small)]">{SITE.hours}</dd>
              </div>
            </dl>
          </div>

          {/* Index */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
            {FOOTER_NAV.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <Label>{group.heading}</Label>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="text-ink-2 hover:text-ink text-[length:var(--text-small)] transition-colors duration-300"
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

        <Rule className="mt-16" />

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-ink-3 text-[length:var(--text-micro)]">
            © {year} {SITE.name}
          </p>
          <p className="text-ink-3 max-w-[68ch] text-[length:var(--text-micro)] leading-relaxed">
            Compliance dates, penalty figures and explanatory material on this site are general
            guidance reflecting the standard statutory position at the time of writing. Due dates
            are periodically extended by the relevant authority. Nothing here is advice on your
            specific circumstances — engage us before acting on it.
          </p>
        </div>
      </Container>
    </footer>
  );
}

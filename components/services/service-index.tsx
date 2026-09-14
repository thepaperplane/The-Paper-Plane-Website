import Link from 'next/link';
import { Container, Label, Numeral, Section } from '@/components/ui';
import { PILLARS, ALL_SERVICES } from '@/content/services';

/**
 * The whole offer, on one screen.
 *
 * The page previously opened with a headline, a paragraph and two column
 * headings — you had to scroll a screen and a half before a single service
 * was named, which is why the complaint about this page was that it does not
 * say what is on offer. A services page owes the reader the list first and
 * the argument second.
 *
 * Every entry is an anchor into the detailed section further down, so this
 * doubles as the page's table of contents rather than repeating it.
 */
export function ServiceIndex() {
  return (
    <Section tone="sunken" className="border-y">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <div className="flex items-center gap-3">
            <span className="bg-accent h-px w-6 shrink-0" />
            <Label>Everything, on one page</Label>
          </div>
          <p className="text-ink-3 text-[length:var(--text-caption)]">
            <span className="text-ink font-medium">{ALL_SERVICES.length}</span> services across{' '}
            <span className="text-ink font-medium">{PILLARS.length}</span> disciplines
          </p>
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.id}
              className="reveal border-t pt-5"
              data-reveal-delay={String(i * 60)}
            >
              <div className="flex items-baseline gap-3">
                <Numeral value={i + 1} className="shrink-0 text-[length:var(--text-micro)]" />
                <div className="min-w-0">
                  <h2 className="text-ink font-[family-name:var(--font-sans)] text-[length:var(--text-body)] leading-snug font-medium tracking-[-0.01em]">
                    {pillar.title}
                  </h2>
                  <p className="text-ink-3 mt-1 text-[length:var(--text-caption)] leading-snug">
                    {pillar.tagline}
                  </p>
                </div>
              </div>

              <ul className="mt-4">
                {pillar.services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`#${service.id}`}
                      className="group text-ink-2 hover:text-accent flex items-baseline gap-3 py-2 text-[length:var(--text-small)] transition-colors duration-300"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-faint group-hover:bg-accent mt-[0.6em] h-px w-3 shrink-0 transition-colors duration-300"
                      />
                      <span>{service.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

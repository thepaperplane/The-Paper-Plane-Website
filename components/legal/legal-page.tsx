import Link from 'next/link';
import { Container, Heading, Label, Numeral, Section, TextLink } from '@/components/ui';
import type { LegalSection } from '@/content/legal';

/**
 * Shared layout for the privacy and terms pages.
 *
 * Legal pages are where most sites stop designing. This one keeps the
 * editorial system — numbered sections, a standing rule, a sticky index —
 * because a policy nobody can navigate is a policy nobody reads, and because
 * a practice that sells web design should not have two pages that look like
 * they were pasted in from a generator.
 */
export function LegalPage({
  eyebrow,
  title,
  lede,
  updated,
  sections,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Section rhythm="lg" className="pt-[calc(4.5rem+var(--space-section))]">
        <Container>
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-9">
              <Heading as="h1" size="large" eyebrow={eyebrow} title={title} lede={lede} />
              <p className="text-ink-3 mt-10 text-[length:var(--text-caption)]">
                Last updated {updated}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section rhythm="lg" className="border-t">
        <Container>
          <div className="grid gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,8fr)] md:gap-12 lg:gap-20">
            {/* Index */}
            <nav aria-label="On this page" className="md:sticky md:top-28 md:self-start">
              <Label className="block">On this page</Label>
              <ol className="mt-6 space-y-0">
                {sections.map((s, i) => (
                  <li key={s.id} className="border-t">
                    <Link
                      href={`#${s.id}`}
                      className="group hover:text-ink flex items-baseline gap-3 py-3 transition-colors"
                    >
                      <Numeral value={i + 1} className="shrink-0 text-[length:var(--text-micro)]" />
                      <span className="text-ink-2 group-hover:text-accent text-[length:var(--text-caption)] leading-snug transition-colors">
                        {s.heading}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Body */}
            <div>
              {sections.map((section, i) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="reveal scroll-mt-28 border-t pt-8 pb-14 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <div className="flex items-baseline gap-4">
                    <Numeral value={i + 1} className="shrink-0 text-[length:var(--text-caption)]" />
                    <h2 className="text-[length:var(--text-title-2)]">{section.heading}</h2>
                  </div>

                  {section.body.map((p) => (
                    <p
                      key={p.slice(0, 32)}
                      className="text-ink-2 mt-5 max-w-[62ch] text-[length:var(--text-body)] leading-[1.75]"
                    >
                      {p}
                    </p>
                  ))}

                  {section.rows ? (
                    <dl className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                      {section.rows.map((row) => (
                        <div key={row.term} className="contents">
                          <dt className="text-ink border-t pt-4 font-[family-name:var(--font-sans)] text-[length:var(--text-small)] font-medium">
                            {row.term}
                          </dt>
                          <dd className="text-ink-2 border-t pt-4 text-[length:var(--text-small)] leading-relaxed">
                            {row.detail}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  {section.list ? (
                    <ul className="mt-6 space-y-2">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="text-ink-2 flex gap-3 text-[length:var(--text-small)]"
                        >
                          <span
                            aria-hidden="true"
                            className="bg-faint mt-[0.65em] h-px w-3 shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t">
        <Container>
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-[length:var(--text-title-1)]">
                Something here unclear, or wrong?
              </h2>
              <p className="text-ink-2 mt-5 max-w-[48ch] text-[length:var(--text-body)] leading-[1.7]">
                Say so and it gets corrected. A policy is only useful if it describes what actually
                happens.
              </p>
              <div className="mt-8">
                <TextLink href="/contact">Get in touch</TextLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

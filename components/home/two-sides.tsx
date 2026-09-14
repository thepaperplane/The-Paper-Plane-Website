import { Container, Label, Numeral, Section, TextLink } from '@/components/ui';
import { PRACTICE } from '@/content/practice';

/**
 * The two halves of the practice, given identical design weight.
 *
 * They are rendered from the same data shape by the same code path, so
 * neither can drift into looking like an afterthought. On desktop they sit
 * side by side separated by a single vertical rule — no cards, no tinted
 * panels, no icons. The only differentiator is the index numeral.
 */
export function TwoSides() {
  return (
    <Section rhythm="lg" className="border-t">
      <Container>
        <div className="grid gap-y-16 lg:grid-cols-2 lg:gap-x-0">
          {PRACTICE.map((side, i) => (
            <div
              key={side.id}
              className={
                i === 0
                  ? 'reveal lg:border-r lg:pr-16 xl:pr-24'
                  : 'reveal lg:pl-16 xl:pl-24'
              }
              data-reveal-delay={String(i * 140)}
            >
              <div className="flex items-baseline gap-5">
                <Numeral value={i + 1} className="text-[length:var(--text-title-3)]" />
                <Label>{side.name}</Label>
              </div>

              <h2 className="mt-7 text-[length:var(--text-display-2)] leading-[0.98]">
                {side.heading}
              </h2>

              <p className="text-ink mt-6 max-w-[34ch] text-[length:var(--text-lede)] leading-[1.45]">
                {side.statement}
              </p>

              <p className="text-ink-2 mt-6 max-w-[46ch] text-[length:var(--text-small)] leading-[1.75]">
                {side.body}
              </p>

              {/* Capabilities as an indexed list, not a card grid. */}
              <ul className="mt-12">
                {side.capabilities.map((cap) => (
                  <li key={cap.title} className="border-t py-5 last:border-b">
                    <h3 className="text-ink font-[family-name:var(--font-sans)] text-[length:var(--text-body)] font-medium tracking-[-0.01em]">
                      {cap.title}
                    </h3>
                    <p className="text-ink-3 mt-2 max-w-[46ch] text-[length:var(--text-caption)] leading-relaxed">
                      {cap.detail}
                    </p>
                  </li>
                ))}
              </ul>

              {/* A concrete proof point instead of a marketing claim. */}
              <div className="mt-10 flex items-start gap-5">
                <span className="text-accent shrink-0 font-[family-name:var(--font-display)] text-[length:var(--text-title-2)] leading-none">
                  {side.proof.figure}
                </span>
                <p className="text-ink-3 max-w-[34ch] text-[length:var(--text-caption)] leading-relaxed">
                  {side.proof.caption}
                </p>
              </div>

              <div className="mt-10">
                <TextLink href={side.href}>Explore {side.name.toLowerCase()}</TextLink>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LogoMark } from '@/components/brand/logo';
import { ButtonLink, Container, Section } from '@/components/ui';
import { PRIMARY_NAV } from '@/lib/site';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section className="flex min-h-[70dvh] items-center pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10" />
      <Container size="content" className="text-center">
        <LogoMark className="mx-auto h-16 w-[5.7rem]" />

        <p className="eyebrow mt-8">Error 404</p>
        <h1 className="text-ink mt-3 text-[length:var(--text-display-2)] leading-tight font-semibold tracking-[-0.03em]">
          This one did not land
        </h1>
        <p className="text-ink-3 mx-auto mt-4 max-w-md text-lg leading-relaxed">
          The page you are looking for has moved or never existed. Here is where everything else
          lives.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
          </ButtonLink>
          <ButtonLink href="/contact" tone="outline" size="lg">
            Contact us
          </ButtonLink>
        </div>

        <nav aria-label="Site sections" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-2">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink-2 hover:text-ink bg-surface inline-block rounded-full px-4 py-2 text-[0.875rem] font-medium shadow-[var(--shadow-soft)] ring-1 ring-[var(--hairline)] transition-all ring-inset hover:shadow-[var(--shadow-soft)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}

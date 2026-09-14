import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';
import { TERMS, TERMS_UPDATED } from '@/content/legal';
import { pageOg } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms',
  description:
    'Terms of use for this website, the limits of the general information published on it, and how it relates to an actual engagement letter.',
  alternates: { canonical: '/terms' },
  openGraph: pageOg({
    title: 'Terms',
    description:
      'Terms of use for this website, and why nothing published here is advice on your own position.',
    path: '/terms',
  }),
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title={
        <>
          The rules for this website, <span className="em-serif">not for an engagement.</span>
        </>
      }
      lede="A short set of terms covering the site itself. Actual work is governed by a written engagement letter, which sets out scope, fee and timeline, and which prevails over anything published here."
      updated={TERMS_UPDATED}
      sections={TERMS}
    />
  );
}

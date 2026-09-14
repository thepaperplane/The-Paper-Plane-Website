import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';
import { PRIVACY, PRIVACY_UPDATED } from '@/content/legal';
import { pageOg } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'What this site collects, why, where it is stored and how to have it removed. No analytics, no tracking cookies, no advertising pixels.',
  alternates: { canonical: '/privacy' },
  openGraph: pageOg({
    title: 'Privacy',
    description:
      'No analytics, no tracking cookies, no pixels. Two forms collect data, and this explains exactly what they take.',
    path: '/privacy',
  }),
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title={
        <>
          What this site collects, <span className="em-serif">and what it does not.</span>
        </>
      }
      lede="Most privacy policies are written to be unreadable. This one is written against the code, so every claim in it can be checked against what the site actually does."
      updated={PRIVACY_UPDATED}
      sections={PRIVACY}
    />
  );
}

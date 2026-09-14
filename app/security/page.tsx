import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';
import { SECURITY, SECURITY_UPDATED } from '@/content/legal-more';
import { pageOg } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Security',
  description:
    'Encryption in transit and at rest, who can reach what, the data deliberately never collected, and what this practice does on the day something goes wrong.',
  alternates: { canonical: '/security' },
  openGraph: pageOg({
    title: 'Security',
    description:
      'Encryption, access control, data minimisation, incident handling and how to report a vulnerability.',
    path: '/security',
  }),
};

export default function SecurityPage() {
  return (
    <LegalPage
      eyebrow="Security"
      title={
        <>
          How your information is held,{' '}
          <span className="em-serif">and what happens if that fails</span>
        </>
      }
      lede="Encryption in transit and at rest, who can reach what, the data deliberately never collected, and what this practice does on the day something goes wrong."
      updated={SECURITY_UPDATED}
      sections={SECURITY}
    />
  );
}

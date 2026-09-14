/**
 * Privacy and terms content.
 *
 * Written against what the code actually does, not from a template. Every
 * claim here is checkable in the repository:
 *
 *   - the enquiry fields are the Zod schema in app/api/contact/route.ts
 *   - the subscription fields are the schema in app/api/calendar/subscribe/route.ts
 *   - "no analytics" is verifiable by the absence of any tag manager, pixel or
 *     analytics package anywhere in the project
 *   - the only browser storage is the theme key written by components/site/theme.tsx
 *
 * If any of those change, this file changes with them. A privacy policy that
 * has drifted from the software is worse than none, because it is a written
 * statement that is no longer true.
 *
 * These are plain-English site policies, not a substitute for the practice's
 * own legal review before publication.
 */

import { SITE } from '@/lib/site';

export type LegalSection = {
  id: string;
  heading: string;
  /** Paragraphs. */
  body: string[];
  /** Optional definition rows — used for the data tables. */
  rows?: { term: string; detail: string }[];
  /** Optional plain list. */
  list?: string[];
};

export const PRIVACY_UPDATED = '14 September 2026';
export const TERMS_UPDATED = '14 September 2026';

export const PRIVACY: LegalSection[] = [
  {
    id: 'summary',
    heading: 'The short version',
    body: [
      'This website runs no analytics, sets no advertising or tracking cookies, and embeds nothing from a social network. There is no tag manager, no pixel and no session recorder anywhere in it. Nobody is profiled for visiting.',
      'Two forms collect personal data, and only because they cannot work otherwise: the enquiry form and the compliance calendar subscription. Everything below is the detail of those two.',
    ],
  },
  {
    id: 'enquiry',
    heading: 'When you send an enquiry',
    body: [
      'The contact form stores what you type so that somebody can reply to it. Nothing is inferred, enriched or bought in from anywhere else.',
    ],
    rows: [
      { term: 'Name', detail: 'Required, so a reply can be addressed to someone.' },
      { term: 'Email address', detail: 'Required. This is how we reply.' },
      { term: 'Phone number', detail: 'Optional. Given only if you would rather be called.' },
      { term: 'Company', detail: 'Optional. Helps scope the answer.' },
      { term: 'Service of interest', detail: 'Optional. Whichever service you arrived from.' },
      { term: 'Your message', detail: 'Required, and kept as written.' },
    ],
  },
  {
    id: 'calendar',
    heading: 'When you subscribe to the compliance calendar',
    body: [
      'The subscription stores your email address so the monthly reminder can be sent, and an optional name so it can be addressed properly. You also pick which set of dates applies to you, which decides what the email contains.',
      'Every email carries a one-click unsubscribe link and an unsubscribe header your mail client can act on directly. Unsubscribing removes you from the sending list immediately; you do not have to ask anyone.',
    ],
  },
  {
    id: 'storage',
    heading: 'Where it is kept, and for how long',
    body: [
      'Enquiries and subscriptions are stored in a Postgres database hosted by Supabase in the Mumbai (ap-south-1) region, so this data does not leave India in normal operation.',
      'Enquiries are retained while the matter is live and for as long afterwards as a professional engagement requires records to be kept. Subscriptions are retained until you unsubscribe. Ask and we will delete either sooner, unless a statutory retention obligation applies to an engagement that has already begun.',
    ],
  },
  {
    id: 'processors',
    heading: 'Who else touches it',
    body: [
      'Three service providers process data on our behalf, each for one narrow purpose, and none of them are permitted to use it for their own:',
    ],
    rows: [
      {
        term: 'Supabase',
        detail:
          'Database and authentication. Hosts the enquiry and subscription records, in India.',
      },
      {
        term: 'Vercel',
        detail: 'Website hosting. Serves the pages and keeps standard server request logs.',
      },
      {
        term: 'Resend',
        detail: 'Email delivery. Sends the enquiry notification and the monthly calendar email.',
      },
    ],
  },
  {
    id: 'browser',
    heading: 'What is stored in your browser',
    body: [
      'One value: whether you chose the light or dark theme, under the key `pp.theme`. It stays on your device, is never transmitted, and exists so the site does not flash the wrong colour at you on the next page.',
      'There are no cookies on the public site. The administrative console, which only the practice can reach, uses a session cookie to keep a signed-in user signed in.',
    ],
  },
  {
    id: 'rights',
    heading: 'What you can ask for',
    body: [
      'You can ask what is held about you, ask for it to be corrected, ask for it to be deleted, or withdraw consent to the calendar email at any time. Write to the address below and expect a reply from a person, not a queue.',
      'This reflects the position under the Digital Personal Data Protection Act, 2023. Where an engagement is already under way, some records must be retained for the period the relevant professional and tax legislation requires, and that obligation is explained at the time rather than used as a blanket refusal.',
    ],
  },
  {
    id: 'contact',
    heading: 'Asking',
    body: [
      `Write to ${SITE.email}, or call ${SITE.phone}. The practice operates remotely across India, so there is no counter to visit — but there is always a named person answering.`,
    ],
  },
];

export const TERMS: LegalSection[] = [
  {
    id: 'scope',
    heading: 'What these terms cover',
    body: [
      'These terms govern your use of this website. They are not the terms of a professional engagement. Any actual piece of work — a filing, a defence, an audit, a build — is governed by a separate written engagement letter that sets out scope, fee and timeline, and that letter prevails over anything on this site.',
    ],
  },
  {
    id: 'not-advice',
    heading: 'Nothing here is advice for your situation',
    body: [
      'The Knowledge Corner, the compliance calendar and everything else published here is general information about how Indian tax, GST, corporate and audit obligations work. It is written carefully and reviewed, but it is written for nobody in particular.',
      'Statute changes, due dates are extended, and the facts of your case decide the answer. Do not act on a page of this website without taking advice on your own position. If you act on general information and it goes wrong, that is not a matter this website can be held to.',
    ],
  },
  {
    id: 'dates',
    heading: 'The compliance calendar',
    body: [
      'The dates published here are the standard statutory positions. The department extends deadlines at its discretion, sometimes at very short notice, and an extension will not always be reflected here immediately.',
      'The calendar is a prompt, not a guarantee. The obligation to meet a statutory deadline remains yours, or your engaged advisor’s under the terms of that engagement.',
    ],
  },
  {
    id: 'news',
    heading: 'Aggregated news',
    body: [
      'The news page collects headlines from third-party publications and links to them. Those articles are the work and property of their publishers, are reproduced only as a headline and a link, and carry no endorsement. Follow the link to read the original.',
    ],
  },
  {
    id: 'work',
    heading: 'Client work shown on this site',
    body: [
      'Projects in the portfolio are shown with the client’s permission. The screenshots are captures of the live sites at a point in time; those sites belong to the clients and continue to change without reference to this one.',
    ],
  },
  {
    id: 'ip',
    heading: 'This site’s own material',
    body: [
      'The written content, diagrams, layout, identity and code of this website belong to The Paper Plane. Read it, quote it with attribution, send it to a colleague. Do not republish it wholesale as your own.',
    ],
  },
  {
    id: 'availability',
    heading: 'Availability',
    body: [
      'The site is offered as it is. It is maintained attentively, but no uptime is promised, and a page may be changed, corrected or withdrawn at any time — including because it became wrong.',
    ],
  },
  {
    id: 'law',
    heading: 'Governing law',
    body: [
      'These terms are governed by the laws of India, and the courts of India have jurisdiction over any dispute arising from use of this website.',
    ],
  },
];

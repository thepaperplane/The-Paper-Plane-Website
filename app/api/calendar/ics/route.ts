import { COMPLIANCE_EVENTS, MONTHS } from '@/content/calendar';
import { SITE } from '@/lib/site';

export const runtime = 'nodejs';

/** RFC 5545 requires CRLF, escaped separators, and lines folded at 75 octets. */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

function fold(line: string): string {
  if (line.length <= 75) return line;
  const parts: string[] = [];
  let remaining = line;
  parts.push(remaining.slice(0, 75));
  remaining = remaining.slice(75);
  while (remaining.length > 74) {
    parts.push(` ${remaining.slice(0, 74)}`);
    remaining = remaining.slice(74);
  }
  if (remaining) parts.push(` ${remaining}`);
  return parts.join('\r\n');
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

/**
 * Emits every statutory date for the current and next calendar year.
 * Monthly events become one RRULE; annual events become a single dated entry
 * per year. All-day events, with an alarm three days ahead.
 */
export async function GET() {
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(
    now.getUTCHours(),
  )}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;

  const year = now.getFullYear();

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${SITE.name}//Compliance Calendar//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeText(`${SITE.name} — Compliance Calendar`)}`,
    'X-WR-TIMEZONE:Asia/Kolkata',
  ];

  const pushEvent = (opts: {
    uid: string;
    date: string;
    title: string;
    description: string;
    recurring: boolean;
  }) => {
    // DTEND for an all-day event is exclusive, so it is the following day.
    const start = new Date(
      Number(opts.date.slice(0, 4)),
      Number(opts.date.slice(4, 6)) - 1,
      Number(opts.date.slice(6, 8)),
    );
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const endStr = `${end.getFullYear()}${pad(end.getMonth() + 1)}${pad(end.getDate())}`;

    lines.push(
      'BEGIN:VEVENT',
      `UID:${opts.uid}@thepaperplane.co.in`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${opts.date}`,
      `DTEND;VALUE=DATE:${endStr}`,
      fold(`SUMMARY:${escapeText(opts.title)}`),
      fold(`DESCRIPTION:${escapeText(opts.description)}`),
      'TRANSP:TRANSPARENT',
      'CATEGORIES:COMPLIANCE',
    );

    if (opts.recurring) lines.push('RRULE:FREQ=MONTHLY;COUNT=24');

    lines.push(
      'BEGIN:VALARM',
      'TRIGGER:-P3D',
      'ACTION:DISPLAY',
      fold(`DESCRIPTION:${escapeText(`Due in 3 days — ${opts.title}`)}`),
      'END:VALARM',
      'END:VEVENT',
    );
  };

  for (const event of COMPLIANCE_EVENTS) {
    const description = [
      event.description,
      `Statute: ${event.statute}`,
      event.penalty ? `If missed: ${event.penalty}` : null,
      `Applies to: ${event.appliesTo}`,
      '',
      `Source: ${SITE.url}/calendar`,
    ]
      .filter(Boolean)
      .join('\n');

    if (event.cadence === 'monthly') {
      // Start the series next month so the first occurrence is never in the past.
      const start = new Date(year, now.getMonth() + 1, event.day);
      pushEvent({
        uid: `${event.id}-monthly`,
        date: `${start.getFullYear()}${pad(start.getMonth() + 1)}${pad(start.getDate())}`,
        title: `${event.title} (${event.category})`,
        description,
        recurring: true,
      });
    } else if (event.month) {
      for (const y of [year, year + 1]) {
        pushEvent({
          uid: `${event.id}-${y}`,
          date: `${y}${pad(event.month)}${pad(event.day)}`,
          title: `${event.title} (${event.category})`,
          description: `${description}\n\nPeriod: ${MONTHS[event.month - 1]} ${y}`,
          recurring: false,
        });
      }
    }
  }

  lines.push('END:VCALENDAR');

  return new Response(lines.join('\r\n'), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="paper-plane-compliance-calendar.ics"',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}

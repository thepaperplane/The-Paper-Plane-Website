import { createHash } from 'node:crypto';
import { XMLParser } from 'fast-xml-parser';
import { stripHtml } from './utils';
import type { NewsItemRow, NewsSourceRow } from './database.types';

/**
 * RSS/Atom aggregation.
 *
 * Editorial and legal position: we store and display a headline, a short
 * summary, the source name and the publication time, and we always link out
 * to the publisher. Full article text is never copied or republished here.
 */

export type ParsedItem = {
  title: string;
  link: string;
  summary: string | null;
  author: string | null;
  publishedAt: Date;
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  trimValues: true,
  parseTagValue: false,
  processEntities: true,
  cdataPropName: '__cdata',
});

/** Feed values can be a string, a CDATA wrapper, or an attributed node. */
function text(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  if (Array.isArray(value)) return text(value[0]);
  if (typeof value === 'object') {
    const node = value as Record<string, unknown>;
    if ('__cdata' in node) return text(node.__cdata);
    if ('#text' in node) return text(node['#text']);
  }
  return '';
}

/** Atom links are attributes; RSS links are text. Handle both. */
function extractLink(entry: Record<string, unknown>): string {
  const direct = text(entry.link);
  if (direct) return direct;

  const link = entry.link;
  if (Array.isArray(link)) {
    const alternate = link.find(
      (l) => typeof l === 'object' && l && (l as Record<string, unknown>)['@_rel'] !== 'self',
    ) as Record<string, unknown> | undefined;
    if (alternate?.['@_href']) return String(alternate['@_href']);
  }
  if (link && typeof link === 'object') {
    const href = (link as Record<string, unknown>)['@_href'];
    if (href) return String(href);
  }

  return text(entry.guid) || text(entry.id);
}

function parseDate(entry: Record<string, unknown>): Date {
  const candidates = [
    text(entry.pubDate),
    text(entry.published),
    text(entry.updated),
    text(entry['dc:date']),
  ].filter(Boolean);

  for (const candidate of candidates) {
    const parsed = new Date(candidate);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date();
}

/**
 * Normalise a URL for de-duplication: drop tracking parameters and the
 * fragment, lowercase the host, strip a trailing slash. The same story
 * syndicated with different UTM tags collapses to one row.
 */
export function normalizeLink(raw: string): string {
  try {
    const url = new URL(raw.trim());
    url.hash = '';
    const strip = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'fbclid',
      'gclid',
      'igshid',
      'from',
      'ref',
    ];
    strip.forEach((param) => url.searchParams.delete(param));
    url.hostname = url.hostname.toLowerCase().replace(/^www\./, '');
    const path = url.pathname.replace(/\/+$/, '') || '/';
    return `${url.protocol}//${url.hostname}${path}${url.search}`;
  } catch {
    return raw.trim();
  }
}

export function fingerprint(link: string): string {
  return createHash('sha256').update(normalizeLink(link)).digest('hex');
}

/** Fetch and parse one feed. Never throws — returns [] and lets the caller record the error. */
export async function fetchFeed(
  feedUrl: string,
  { timeoutMs = 12_000, limit = 25 }: { timeoutMs?: number; limit?: number } = {},
): Promise<ParsedItem[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(feedUrl, {
      signal: controller.signal,
      headers: {
        // Identifiable, contactable agent — several Indian publishers block
        // anonymous clients outright.
        'User-Agent':
          'PaperPlaneBot/1.0 (+https://www.thepaperplane.co.in; compliance news aggregation)',
        Accept:
          'application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const xml = await response.text();

    // Shape of the three feed dialects we accept: RSS 2.0, Atom, RDF/RSS 1.0.
    type FeedDocument = {
      rss?: { channel?: { item?: unknown } };
      feed?: { entry?: unknown };
      'rdf:RDF'?: { item?: unknown };
    };

    const parsed = parser.parse(xml) as FeedDocument;

    const entries =
      parsed?.rss?.channel?.item ?? parsed?.feed?.entry ?? parsed?.['rdf:RDF']?.item ?? [];

    const list = (Array.isArray(entries) ? entries : [entries]) as Record<string, unknown>[];

    return list
      .slice(0, limit)
      .map((entry): ParsedItem | null => {
        const title = text(entry.title);
        const link = extractLink(entry);
        if (!title || !link) return null;

        const rawSummary =
          text(entry.description) ||
          text(entry.summary) ||
          text(entry['content:encoded']) ||
          text(entry.content);

        return {
          title: stripHtml(title, 200),
          link: link.trim(),
          summary: rawSummary ? stripHtml(rawSummary, 280) : null,
          author: text(entry['dc:creator']) || text(entry.author) || null,
          publishedAt: parseDate(entry),
        };
      })
      .filter((item): item is ParsedItem => item !== null);
  } finally {
    clearTimeout(timer);
  }
}

/** Map a parsed item onto a database row. */
export function toRow(
  item: ParsedItem,
  source: Pick<NewsSourceRow, 'id' | 'name' | 'category'>,
): Omit<NewsItemRow, 'id' | 'is_featured' | 'is_hidden' | 'fetched_at'> {
  return {
    source_id: source.id,
    source_name: source.name,
    category: source.category,
    title: item.title,
    link: item.link,
    summary: item.summary,
    author: item.author?.slice(0, 120) ?? null,
    published_at: item.publishedAt.toISOString(),
    fingerprint: fingerprint(item.link),
  };
}

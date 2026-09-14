import { displayHost, normalizeSiteUrl } from './utils';

/**
 * Pure URL → project defaults.
 *
 * Lives apart from `lib/capture.ts` because that module imports the Supabase
 * service client, which must never reach the browser bundle. The admin form
 * needs this preview logic client-side, so it imports from here.
 */
export function deriveProjectDefaults(rawUrl: string) {
  const url = normalizeSiteUrl(rawUrl);
  if (!url) return null;

  const host = displayHost(url);
  const slug = host
    .replace(/\.(co\.in|in|com|org|net|io|dev|co)$/i, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '');

  const name = slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return { url, slug, name, displayUrl: host };
}

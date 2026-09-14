'use client';

import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'pp.theme';

/**
 * Runs before first paint, inlined into <head>.
 *
 * Without this the browser paints the light default, then React hydrates and
 * flips to dark — a white flash on every load for anyone who chose dark. The
 * script is deliberately tiny and dependency-free because it blocks rendering.
 */
export const THEME_SCRIPT = `(function(){var d=document.documentElement;try{
var s=localStorage.getItem('${STORAGE_KEY}');
if(s==='light'||s==='dark'){d.setAttribute('data-theme',s);}
}catch(e){}
/* Arms the scroll reveals. Until this runs, .reveal content is visible, so a
   failed observer or a crawler never sees a blank page. */
try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('reveal-ready');}}catch(e){}
})();`;

function resolve(theme: Theme): 'light' | 'dark' {
  if (theme !== 'system') return theme;
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  // Always start at 'system' so the server and first client render agree; the
  // mount effect immediately corrects it from storage.
  const [theme, setThemeState] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage blocked — fall back to system */
    }
    if (stored === 'light' || stored === 'dark') {
      setThemeState(stored);
      // Re-assert the attribute the inline script set. Without this the
      // system-sync effect below can strip it during the same commit.
      document.documentElement.setAttribute('data-theme', stored);
    }
    setMounted(true);
  }, []);

  // Follow the OS only while the visitor has made no explicit choice, and
  // only after mount — running before `mounted` would clear the attribute the
  // inline script set from storage, silently dropping the saved preference.
  useEffect(() => {
    if (!mounted || theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => document.documentElement.removeAttribute('data-theme');
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [theme, mounted]);

  function setTheme(next: Theme) {
    setThemeState(next);
    try {
      if (next === 'system') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    if (next === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', next);
  }

  return { theme, resolved: resolve(theme), setTheme, mounted };
}

/**
 * Theme toggle.
 *
 * A two-state switch between light and dark, with the third state — following
 * the OS — reachable by long-press/right-click rather than a three-way control
 * that most people would never use. The control keeps its size before mount so
 * the header never shifts.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolved, setTheme, theme, mounted } = useTheme();

  const next = resolved === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      onContextMenu={(e) => {
        e.preventDefault();
        setTheme('system');
      }}
      aria-label={`Switch to ${next} theme`}
      title={
        theme === 'system'
          ? 'Following your system theme — right-click to reset'
          : `Switch to ${next} theme`
      }
      className={`group text-ink-3 hover:text-ink relative inline-flex h-9 w-9 items-center justify-center transition-colors ${className}`}
    >
      {/* Rendered only after mount so server and client markup match. */}
      <span className="relative block h-[18px] w-[18px]" aria-hidden="true">
        {mounted ? (
          <>
            {/* Sun */}
            <svg
              viewBox="0 0 18 18"
              fill="none"
              className="absolute inset-0 transition-all duration-500 ease-[var(--ease-out-editorial)]"
              style={{
                opacity: resolved === 'dark' ? 0 : 1,
                transform: resolved === 'dark' ? 'rotate(-90deg) scale(0.6)' : 'none',
              }}
            >
              <circle cx="9" cy="9" r="3.4" stroke="currentColor" strokeWidth="1.3" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <line
                  key={deg}
                  x1="9"
                  y1="1.4"
                  x2="9"
                  y2="3"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  transform={`rotate(${deg} 9 9)`}
                />
              ))}
            </svg>
            {/* Moon */}
            <svg
              viewBox="0 0 18 18"
              fill="none"
              className="absolute inset-0 transition-all duration-500 ease-[var(--ease-out-editorial)]"
              style={{
                opacity: resolved === 'dark' ? 1 : 0,
                transform: resolved === 'dark' ? 'none' : 'rotate(90deg) scale(0.6)',
              }}
            >
              <path
                d="M15 10.6A6.4 6.4 0 0 1 7.4 3a6.6 6.6 0 1 0 7.6 7.6Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
          </>
        ) : null}
      </span>
    </button>
  );
}

'use client';

import { useState, useTransition } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { saveContentBlock } from '@/app/admin/content/actions';
import type { ContentKey } from '@/lib/content';

export function ContentEditor({
  contentKey,
  label,
  defaultValue,
  currentValue,
  editable,
}: {
  contentKey: ContentKey;
  label: string;
  defaultValue: string;
  currentValue: string;
  editable: boolean;
}) {
  const [value, setValue] = useState(currentValue);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<string | null>(null);

  const isOverridden = value.trim().length > 0;
  const dirty = value !== currentValue;
  const effective = isOverridden ? value : defaultValue;

  function save(next: string) {
    startTransition(async () => {
      const result = await saveContentBlock(contentKey, next);
      setStatus(result.message);
      setTimeout(() => setStatus(null), 2500);
    });
  }

  const id = `content-${contentKey.replace(/\./g, '-')}`;
  const isLong = defaultValue.length > 90;

  return (
    <div className="px-6 py-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={id} className="text-ink text-[0.875rem] font-medium">
          {label}
        </label>
        <span className="text-ink-3 font-[family-name:var(--font-mono)] text-[0.6875rem]">
          {contentKey}
        </span>
      </div>

      {isLong ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          disabled={!editable || pending}
          onChange={(e) => setValue(e.target.value)}
          placeholder={defaultValue}
          className="text-ink placeholder:text-ink-3 focus:ring-accent mt-2 w-full resize-y rounded-[var(--radius-md)] bg-surface px-3.5 py-2.5 text-[0.875rem] leading-relaxed ring-1 ring-[var(--hairline)] ring-inset outline-none focus:ring-2 disabled:opacity-60"
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          disabled={!editable || pending}
          onChange={(e) => setValue(e.target.value)}
          placeholder={defaultValue}
          className="text-ink placeholder:text-ink-3 focus:ring-accent mt-2 h-11 w-full rounded-[var(--radius-md)] bg-surface px-3.5 text-[0.875rem] ring-1 ring-[var(--hairline)] ring-inset outline-none focus:ring-2 disabled:opacity-60"
        />
      )}

      <div className="mt-2 flex flex-wrap items-center gap-3">
        {editable ? (
          <>
            <button
              type="button"
              onClick={() => save(value)}
              disabled={!dirty || pending}
              className="bg-accent hover:bg-accent-hover h-8 rounded-[var(--radius-xs)] px-3 text-[0.8125rem] font-semibold text-accent-ink transition-colors disabled:opacity-40"
            >
              {pending ? 'Saving…' : 'Save'}
            </button>

            {isOverridden ? (
              <button
                type="button"
                onClick={() => {
                  setValue('');
                  save('');
                }}
                disabled={pending}
                className="text-ink-3 hover:text-ink inline-flex h-8 items-center gap-1.5 text-[0.8125rem] font-medium transition-colors disabled:opacity-40"
              >
                <RotateCcw className="h-3 w-3" strokeWidth={2.2} />
                Reset to default
              </button>
            ) : (
              <span className="text-ink-3 text-[0.75rem]">Using the default</span>
            )}
          </>
        ) : (
          <span className="text-ink-3 text-[0.75rem]">
            Read-only — editor access required
          </span>
        )}

        {status ? (
          <span className="text-positive inline-flex items-center gap-1 text-[0.75rem]">
            <Check className="h-3 w-3" strokeWidth={2.6} />
            {status}
          </span>
        ) : null}
      </div>

      {!isOverridden ? (
        <p className="text-ink-3 mt-2 text-[0.75rem] leading-relaxed">
          Live text: <span className="text-ink-3">{effective}</span>
        </p>
      ) : null}
    </div>
  );
}

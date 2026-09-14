'use client';

import { useActionState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { AlertCircle, Camera, ExternalLink, Loader2, Trash2 } from 'lucide-react';
import {
  deleteProject,
  recaptureProject,
  setProjectStatus,
  type ActionResult,
} from '@/app/admin/portfolio/actions';
import { Pill } from '@/components/admin/ui';
import type { ProjectRow as Project, ProjectStatus } from '@/lib/database.types';
import { formatRelative } from '@/lib/utils';

const CAPTURE_TONE = {
  ready: 'positive',
  pending: 'neutral',
  capturing: 'accent',
  failed: 'critical',
  unreachable: 'caution',
} as const;

const STATUS_TONE = {
  live: 'positive',
  staged: 'caution',
  draft: 'neutral',
  archived: 'neutral',
} as const;

function RecaptureButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-ink-2 hover:text-ink hover:bg-sunken inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-sm)] px-3 text-[0.8125rem] font-medium transition-colors disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Capturing…
        </>
      ) : (
        <>
          <Camera className="h-3.5 w-3.5" strokeWidth={2} />
          Re-capture
        </>
      )}
    </button>
  );
}

export function ProjectRow({ project, editable }: { project: Project; editable: boolean }) {
  const [state, recapture] = useActionState<ActionResult | null, FormData>(recaptureProject, null);
  const [pending, startTransition] = useTransition();

  const previewBase = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/previews/`;
  const thumb = project.desktop_shot_path ? `${previewBase}${project.desktop_shot_path}` : null;

  function changeStatus(status: ProjectStatus) {
    startTransition(async () => {
      await setProjectStatus(project.slug, status);
    });
  }

  function remove() {
    if (
      !confirm(
        `Remove “${project.name}” from the portfolio? This also deletes its captured previews.`,
      )
    ) {
      return;
    }
    startTransition(async () => {
      await deleteProject(project.slug);
    });
  }

  return (
    <li className="px-6 py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Thumbnail */}
        <div className="bg-sunken h-16 w-28 shrink-0 overflow-hidden rounded-[var(--radius-sm)] ring-1 ring-[var(--hairline)] ring-inset">
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote capture thumbnail
            <img
              src={thumb}
              alt=""
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          ) : (
            <div className="text-ink-3 flex h-full w-full items-center justify-center text-[0.625rem]">
              No preview
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-ink text-[0.9375rem] font-semibold">{project.name}</h3>
            <Pill tone={STATUS_TONE[project.status]}>{project.status}</Pill>
            <Pill tone={CAPTURE_TONE[project.capture_status]}>{project.capture_status}</Pill>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-ink mt-1 inline-flex items-center gap-1 text-[0.8125rem]"
          >
            {project.display_url}
            <ExternalLink className="h-3 w-3" strokeWidth={2.2} />
          </a>

          {project.summary ? (
            <p className="text-ink-3 mt-1.5 line-clamp-2 text-[0.8125rem] leading-relaxed">
              {project.summary}
            </p>
          ) : null}

          <p className="text-ink-3 mt-2 text-[0.75rem]">
            {project.captured_at
              ? `Captured ${formatRelative(project.captured_at)}`
              : 'Never captured'}
            {project.last_http_status ? ` · HTTP ${project.last_http_status}` : ''}
          </p>

          {project.capture_error ? (
            <p className="text-caution mt-2 flex items-start gap-1.5 text-[0.75rem] leading-relaxed">
              <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" strokeWidth={2.2} />
              {project.capture_error}
            </p>
          ) : null}

          {state && !state.ok ? (
            <p role="alert" className="text-critical mt-2 text-[0.75rem]">
              {state.message} {state.detail ?? ''}
            </p>
          ) : null}
        </div>

        {/* Controls */}
        {editable ? (
          <div className="flex shrink-0 flex-wrap items-center gap-1">
            <form action={recapture}>
              <input type="hidden" name="slug" value={project.slug} />
              <RecaptureButton />
            </form>

            <select
              aria-label={`Status for ${project.name}`}
              value={project.status}
              disabled={pending}
              onChange={(e) => changeStatus(e.target.value as ProjectStatus)}
              className="text-ink-2 bg-surface h-9 rounded-[var(--radius-sm)] px-2.5 text-[0.8125rem] ring-1 ring-[var(--hairline)] outline-none ring-inset disabled:opacity-60"
            >
              <option value="draft">Draft</option>
              <option value="staged">Staged</option>
              <option value="live">Live</option>
              <option value="archived">Archived</option>
            </select>

            <button
              type="button"
              onClick={remove}
              disabled={pending}
              aria-label={`Remove ${project.name}`}
              className="text-ink-3 hover:text-critical hover:bg-critical/10 flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] transition-colors disabled:opacity-60"
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        ) : null}
      </div>
    </li>
  );
}

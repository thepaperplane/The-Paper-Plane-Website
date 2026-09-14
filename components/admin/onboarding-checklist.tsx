'use client';

import { useTransition } from 'react';
import { Check, Circle, CircleDashed, MinusCircle } from 'lucide-react';
import { setTaskState } from '@/app/admin/clients/actions';
import type { OnboardingTaskRow, TaskState } from '@/lib/database.types';
import { cn } from '@/lib/utils';

/** Clicking a task cycles it forward, which is faster than a dropdown per row. */
const NEXT_STATE: Record<TaskState, TaskState> = {
  pending: 'in_progress',
  in_progress: 'done',
  done: 'pending',
  blocked: 'in_progress',
  not_applicable: 'pending',
};

const ICON: Record<TaskState, React.ElementType> = {
  pending: Circle,
  in_progress: CircleDashed,
  done: Check,
  blocked: MinusCircle,
  not_applicable: MinusCircle,
};

export function OnboardingChecklist({
  clientId,
  tasks,
  editable,
}: {
  clientId: string;
  tasks: OnboardingTaskRow[];
  editable: boolean;
}) {
  const [pending, startTransition] = useTransition();

  if (tasks.length === 0) {
    return (
      <p className="text-ink-3 px-6 py-6 text-[0.875rem]">
        No onboarding tasks recorded for this client.
      </p>
    );
  }

  const done = tasks.filter((t) => t.state === 'done').length;
  const progress = Math.round((done / tasks.length) * 100);

  function advance(task: OnboardingTaskRow) {
    if (!editable) return;
    startTransition(async () => {
      await setTaskState(clientId, task.id, NEXT_STATE[task.state]);
    });
  }

  return (
    <div>
      <div className="border-b border-[var(--hairline)] px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="text-ink-3 text-[0.8125rem]">
            {done} of {tasks.length} complete
          </span>
          <span className="text-ink text-[0.8125rem] font-semibold tabular-nums">
            {progress}%
          </span>
        </div>
        <div className="bg-sunken mt-2 h-1.5 overflow-hidden rounded-full">
          <div
            className="bg-positive h-full rounded-full transition-[width] duration-500 ease-[var(--ease-out-editorial)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ul className="divide-y divide-[var(--hairline)]">
        {tasks.map((task) => {
          const Icon = ICON[task.state];
          const isDone = task.state === 'done';

          return (
            <li key={task.id}>
              <button
                type="button"
                onClick={() => advance(task)}
                disabled={!editable || pending}
                className={cn(
                  'flex w-full items-start gap-3 px-6 py-3.5 text-left transition-colors',
                  editable ? 'hover:bg-sunken cursor-pointer' : 'cursor-default',
                  pending && 'opacity-60',
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ring-inset',
                    isDone
                      ? 'bg-positive text-white ring-transparent'
                      : task.state === 'in_progress'
                        ? 'text-accent ring-accent/30'
                        : 'text-ink-3 ring-[var(--hairline-strong)]',
                  )}
                >
                  <Icon className="h-3 w-3" strokeWidth={2.6} />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'block text-[0.875rem] font-medium',
                      isDone ? 'text-ink-3 line-through' : 'text-ink',
                    )}
                  >
                    {task.title}
                  </span>
                  {task.description ? (
                    <span className="text-ink-3 mt-0.5 block text-[0.75rem] leading-relaxed">
                      {task.description}
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {editable ? (
        <p className="text-ink-3 border-t border-[var(--hairline)] px-6 py-3 text-[0.75rem]">
          Click a task to cycle it: pending, in progress, done.
        </p>
      ) : null}
    </div>
  );
}

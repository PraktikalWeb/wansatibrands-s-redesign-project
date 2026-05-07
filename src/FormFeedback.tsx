import React from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

export type FormFeedbackTone = 'error' | 'success' | 'info';

type FormFeedbackProps = {
  tone: FormFeedbackTone;
  message: string;
};

const feedbackStyles: Record<FormFeedbackTone, string> = {
  error: 'border-red-200 bg-red-50 text-red-900',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  info: 'border-stone-300 bg-stone-50 text-stone-800',
};

const feedbackIcons = {
  error: AlertCircle,
  success: CheckCircle2,
  info: Info,
} satisfies Record<FormFeedbackTone, React.ComponentType<{ className?: string; strokeWidth?: number }>>;

export default function FormFeedback({ tone, message }: FormFeedbackProps) {
  const Icon = feedbackIcons[tone];

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      className={`flex items-start gap-3 border px-4 py-3 text-sm leading-relaxed ${feedbackStyles[tone]}`}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.8} />
      <p>{message}</p>
    </div>
  );
}

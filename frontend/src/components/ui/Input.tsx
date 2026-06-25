import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, id, ...props }, ref) => (
  <div className="space-y-1.5">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-[var(--text-secondary)]">{label}</label>
    )}
    <input
      ref={ref}
      id={id}
      className={cn(
        'block w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all duration-200',
        'bg-[var(--bg-card)] text-[var(--text-primary)] placeholder:text-[var(--text-disabled)]',
        'border-[var(--border-default)]',
        'focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20',
        error && 'border-danger focus:border-danger focus:ring-danger/20',
        className,
      )}
      {...props}
    />
    {error && <p className="flex items-center gap-1.5 text-sm text-danger">{error}</p>}
  </div>
));
Input.displayName = 'Input';

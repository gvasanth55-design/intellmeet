import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, id, ...props }, ref) => (
  <div className="space-y-1">
    {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
    <input
      ref={ref}
      id={id}
      className={cn(
        'block w-full rounded-lg border px-3 py-2 text-sm shadow-xs transition-colors',
        'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400',
        'focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500',
        'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
        className,
      )}
      {...props}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
));
Input.displayName = 'Input';

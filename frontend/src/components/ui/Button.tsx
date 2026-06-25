import { forwardRef, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.97 }}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'select-none',
        {
          'bg-brand-400 text-white shadow-sm shadow-brand-400/20 hover:bg-brand-500 focus-visible:ring-brand-400 active:bg-brand-600': variant === 'primary',
          'bg-grey-100 text-grey-800 hover:bg-grey-200 focus-visible:ring-grey-400 dark:bg-grey-800 dark:text-grey-200 dark:hover:bg-grey-700': variant === 'secondary',
          'text-grey-600 hover:bg-grey-100 focus-visible:ring-grey-400 dark:text-grey-400 dark:hover:bg-grey-800': variant === 'ghost',
          'bg-danger text-white shadow-sm shadow-danger/20 hover:bg-red-600 focus-visible:ring-danger active:bg-red-700': variant === 'danger',
          'border border-grey-200 bg-white/80 text-grey-700 hover:bg-grey-50 hover:border-grey-300 focus-visible:ring-grey-400 dark:border-grey-700 dark:bg-grey-800/60 dark:text-grey-300 dark:hover:bg-grey-800': variant === 'outline',
        },
        {
          'h-9 px-3 text-sm gap-1.5': size === 'sm',
          'h-10 px-4 text-sm gap-2': size === 'md',
          'h-12 px-6 text-base gap-2': size === 'lg',
        },
        className,
      )}
      {...(props as any)}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </motion.button>
  ),
);
Button.displayName = 'Button';

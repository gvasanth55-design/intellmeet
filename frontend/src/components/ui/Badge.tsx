import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'brand';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export const Badge = ({ variant = 'default', size = 'sm', children, className, dot }: BadgeProps) => (
  <span className={cn(
    'inline-flex items-center rounded-full font-medium transition-colors',
    size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
    {
      'bg-grey-100 text-grey-700 dark:bg-grey-800 dark:text-grey-300': variant === 'default',
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400': variant === 'success',
      'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400': variant === 'warning',
      'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400': variant === 'danger',
      'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400': variant === 'info',
      'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300': variant === 'brand',
    },
    className,
  )}>
    {dot && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />}
    {children}
  </span>
);

export const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, BadgeProps> = {
    live:      { variant: 'success', dot: true, children: 'Live' },
    scheduled: { variant: 'info',    children: 'Scheduled' },
    ended:     { variant: 'default', children: 'Ended' },
    cancelled: { variant: 'danger',  children: 'Cancelled' },
  };
  const props = map[status] || { variant: 'default' as const, children: status };
  return <Badge {...props} />;
};

import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ variant = 'default', children, className }: BadgeProps) => (
  <span className={cn(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
    {
      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200': variant === 'default',
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': variant === 'success',
      'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400': variant === 'warning',
      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': variant === 'danger',
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400': variant === 'info',
    },
    className,
  )}>
    {children}
  </span>
);

export const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { variant: BadgeProps['variant']; label: string }> = {
    live: { variant: 'success', label: 'Live' },
    scheduled: { variant: 'info', label: 'Scheduled' },
    ended: { variant: 'default', label: 'Ended' },
    cancelled: { variant: 'danger', label: 'Cancelled' },
  };
  const { variant, label } = map[status] || { variant: 'default', label: status };
  return <Badge variant={variant}>{label}</Badge>;
};

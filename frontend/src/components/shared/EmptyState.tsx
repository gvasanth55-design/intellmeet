import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({ icon: Icon, title, description, action, className }: EmptyStateProps) => (
  <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--bg-surface)]">
      <Icon className="h-8 w-8 text-[var(--text-disabled)]" />
    </div>
    <h3 className="text-base font-semibold text-[var(--text-primary)]">{title}</h3>
    {description && <p className="mt-1 max-w-sm text-sm text-[var(--text-muted)]">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

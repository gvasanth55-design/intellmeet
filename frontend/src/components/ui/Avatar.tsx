import { cn } from '@/lib/utils';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  status?: 'online' | 'offline' | 'away';
}

const initials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

const sizeClasses = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const colors = [
  'bg-brand-400', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500',
  'bg-rose-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-pink-500',
];

const colorIndex = (name: string) =>
  name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;

const statusColors = {
  online: 'bg-emerald-500',
  offline: 'bg-grey-400',
  away: 'bg-amber-500',
};

export const Avatar = ({ name, src, size = 'md', className, status }: AvatarProps) => (
  <div className="relative inline-flex shrink-0">
    {src ? (
      <img src={src} alt={name} className={cn('rounded-full object-cover', sizeClasses[size], className)} />
    ) : (
      <div className={cn(
        'flex items-center justify-center rounded-full font-semibold text-white',
        colors[colorIndex(name)],
        sizeClasses[size],
        className,
      )}>
        {initials(name)}
      </div>
    )}
    {status && (
      <span className={cn(
        'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[var(--bg-card)]',
        statusColors[status],
      )} />
    )}
  </div>
);

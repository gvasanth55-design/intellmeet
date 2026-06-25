import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: 'light' | 'strong';
  dark?: boolean;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, intensity = 'light', dark, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl transition-all duration-300',
        intensity === 'light'
          ? 'bg-white/60 backdrop-blur-md border border-white/40 shadow-lg shadow-black/5'
          : 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl shadow-black/5',
        dark &&
          (intensity === 'light'
            ? 'dark:bg-gray-950/50 dark:border-gray-700/40 dark:shadow-black/20'
            : 'dark:bg-gray-950/70 dark:border-gray-700/50 dark:shadow-black/30'),
        className,
      )}
      {...props}
    />
  ),
);
GlassPanel.displayName = 'GlassPanel';

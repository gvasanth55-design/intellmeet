'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TabsContextType {
  value: string;
  onChange: (value: string) => void;
}
const TabsCtx = createContext<TabsContextType | null>(null);

export const Tabs = ({ value: controlledValue, defaultValue, onChange, children, className }: {
  value?: string; defaultValue?: string; onChange?: (v: string) => void; children: ReactNode; className?: string;
}) => {
  const [internal, setInternal] = useState(defaultValue ?? '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internal;
  const handleChange = useCallback((v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  }, [isControlled, onChange]);
  return (
    <TabsCtx.Provider value={{ value, onChange: handleChange }}>
      <div className={cn('space-y-4', className)}>{children}</div>
    </TabsCtx.Provider>
  );
};

export const TabsList = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('inline-flex items-center rounded-xl bg-[var(--bg-surface)] p-1 gap-1', className)}>
    {children}
  </div>
);

export const TabsTrigger = ({ value, children, className }: { value: string; children: ReactNode; className?: string }) => {
  const ctx = useContext(TabsCtx)!;
  const active = ctx.value === value;
  return (
    <button
      onClick={() => ctx.onChange(value)}
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200',
        active
          ? 'bg-[var(--bg-card)] text-brand-500 shadow-sm'
          : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]',
        className,
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, className }: { value: string; children: ReactNode; className?: string }) => {
  const ctx = useContext(TabsCtx)!;
  if (ctx.value !== value) return null;
  return <div className={cn('animate-fade-up', className)}>{children}</div>;
};

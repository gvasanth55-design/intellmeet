'use client';
import { useUIStore } from '@/store/ui';
import { useAuthStore } from '@/store/auth';
import { Avatar } from '@/components/ui/Avatar';
import { Bell, Menu, Search, Command } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const user = useAuthStore((s) => s.user);

  return (
    <header className="flex h-16 items-center gap-4 border-b border-[var(--border-divider)] bg-[var(--bg-navbar)] px-4 lg:px-6 sticky top-0 z-20">
      <button
        onClick={toggleSidebar}
        className="rounded-xl p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-3.5 py-2 text-sm transition-all duration-200 focus-within:border-brand-300 focus-within:ring-2 focus-within:ring-brand-200/30 max-w-md group">
        <Search className="h-4 w-4 text-[var(--text-disabled)] transition-colors group-focus-within:text-brand-400" />
        <input
          type="text"
          placeholder="Search meetings, people..."
          className="flex-1 bg-transparent text-[var(--text-primary)] outline-none placeholder:text-[var(--text-disabled)]"
        />
        <kbd className="hidden rounded-md border border-[var(--border-default)] bg-[var(--bg-card)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted)] md:inline-flex items-center gap-0.5">
          <Command className="h-3 w-3" />K
        </kbd>
      </div>

      <div className="flex items-center gap-1">
        <button className="relative rounded-xl p-2.5 text-[var(--text-muted)] transition-all duration-200 hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)] group">
          <Bell className="h-5 w-5 transition-transform group-hover:scale-105" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger ring-2 ring-[var(--bg-navbar)]" />
        </button>
        {user && (
          <Link to="/profile" className="flex items-center gap-2.5 rounded-xl p-1.5 pr-2.5 transition-all duration-200 hover:bg-[var(--hover-bg)] group">
            <Avatar name={user.name} size="sm" />
            <span className="hidden text-sm font-medium text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)] md:block">
              {user.name}
            </span>
          </Link>
        )}
      </div>
    </header>
  );
};

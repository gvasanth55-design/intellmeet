'use client';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui';
import { useAuthStore } from '@/store/auth';
import {
  LayoutDashboard, Video, Calendar, Users, MessageSquare, Settings,
  LogOut, ChevronLeft, ChevronRight,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/meetings',  icon: Video,           label: 'Meetings' },
  { to: '/calendar',  icon: Calendar,        label: 'Calendar' },
  { to: '/team',      icon: Users,           label: 'Team' },
  { to: '/messages',  icon: MessageSquare,   label: 'Messages', badge: 3 },
  { to: '/settings',  icon: Settings,        label: 'Settings' },
];

export const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const logout = useAuthStore((s) => s.logout);
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        'fixed left-0 top-0 z-40 flex h-full flex-col transition-all duration-300 ease-out lg:static',
        sidebarOpen ? 'w-64' : 'w-0 lg:w-16',
        'bg-[var(--bg-sidebar)] border-r border-[var(--border-divider)]',
      )}>
        {/* Logo */}
        <div className={cn(
          'flex h-16 items-center border-b border-[var(--border-divider)] px-4 shrink-0',
          sidebarOpen ? 'justify-between' : 'justify-center',
        )}>
          {sidebarOpen ? (
            <>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-sm">
                  <Video className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-lg text-[var(--text-primary)]">IntellMeet</span>
              </div>
              <button onClick={toggleSidebar} className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--hover-bg)] transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-sm">
              <Video className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {navItems.map(({ to, icon: Icon, label, badge }) => {
            const active = location.pathname === to || location.pathname.startsWith(to + '/');
            return (
              <NavLink
                key={to}
                to={to}
                onClick={() => { if (window.innerWidth < 1024) toggleSidebar(); }}
                className={cn(
                  'flex items-center rounded-xl transition-all duration-200 group',
                  sidebarOpen ? 'gap-3 px-3 py-2.5' : 'justify-center p-2.5',
                  active
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-300'
                    : 'text-[var(--text-muted)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-secondary)]',
                )}
                title={label}
              >
                <Icon className={cn('shrink-0', sidebarOpen ? 'h-5 w-5' : 'h-5 w-5')} />
                {sidebarOpen && (
                  <>
                    <span className="text-sm font-medium">{label}</span>
                    {badge !== undefined && (
                      <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-400 px-1.5 text-[10px] font-bold text-white">
                        {badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse toggle (desktop) & Logout */}
        <div className="border-t border-[var(--border-divider)] p-2 space-y-0.5">
          <button
            onClick={toggleSidebar}
            className={cn(
              'hidden lg:flex items-center rounded-xl transition-all duration-200 w-full',
              sidebarOpen ? 'gap-3 px-3 py-2.5' : 'justify-center p-2.5',
              'text-[var(--text-muted)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-secondary)]',
            )}
            title={sidebarOpen ? 'Collapse' : 'Expand'}
          >
            <ChevronLeft className={cn('h-5 w-5 shrink-0 transition-transform', !sidebarOpen && 'rotate-180')} />
            {sidebarOpen && <span className="text-sm font-medium">Collapse</span>}
          </button>

          <button
            onClick={logout}
            className={cn(
              'flex items-center rounded-xl transition-all duration-200 w-full',
              sidebarOpen ? 'gap-3 px-3 py-2.5' : 'justify-center p-2.5',
              'text-[var(--text-muted)] hover:bg-[var(--hover-bg)] hover:text-danger',
            )}
            title="Sign Out"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

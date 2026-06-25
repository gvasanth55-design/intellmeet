import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const LoginPage = lazy(() => import('@/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('@/pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const DashboardPage = lazy(() => import('@/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const MeetingsPage = lazy(() => import('@/pages/MeetingsPage').then(m => ({ default: m.MeetingsPage })));
const MeetingRoomPage = lazy(() => import('@/pages/MeetingRoomPage').then(m => ({ default: m.MeetingRoomPage })));
const CalendarPage = lazy(() => import('@/pages/CalendarPage').then(m => ({ default: m.CalendarPage })));
const TeamPage = lazy(() => import('@/pages/TeamPage').then(m => ({ default: m.TeamPage })));
const MessagesPage = lazy(() => import('@/pages/MessagesPage').then(m => ({ default: m.MessagesPage })));
const ProfilePage = lazy(() => import('@/pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const LoadingFallback = () => (
  <div className="flex h-full items-center justify-center p-8">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-400 border-t-transparent" />
      <p className="text-sm text-[var(--text-muted)]">Loading...</p>
    </div>
  </div>
);

const Lazy = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

export const AppRouter = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="/login" element={Lazy(LoginPage)} />
      <Route path="/register" element={Lazy(RegisterPage)} />
    </Route>
    <Route element={<DashboardLayout />}>
      <Route path="/dashboard" element={Lazy(DashboardPage)} />
      <Route path="/meetings" element={Lazy(MeetingsPage)} />
      <Route path="/meeting/:id" element={Lazy(MeetingRoomPage)} />
      <Route path="/calendar" element={Lazy(CalendarPage)} />
      <Route path="/team" element={Lazy(TeamPage)} />
      <Route path="/messages" element={Lazy(MessagesPage)} />
      <Route path="/profile" element={Lazy(ProfilePage)} />
      <Route path="/settings" element={Lazy(SettingsPage)} />
    </Route>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="*" element={Lazy(NotFoundPage)} />
  </Routes>
);

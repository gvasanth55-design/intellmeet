import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { Video } from 'lucide-react';

export const AuthLayout = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <Video className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">IntellMeet</span>
          </div>
          <Outlet />
        </div>
      </div>
      <div className="hidden bg-gradient-to-br from-blue-600 to-blue-800 lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:p-12">
        <div className="max-w-md text-white">
          <h2 className="mb-4 text-3xl font-bold">Smarter meetings, better outcomes.</h2>
          <p className="text-lg text-blue-100">AI-powered transcription, summaries, and insights for every meeting.</p>
        </div>
      </div>
    </div>
  );
};

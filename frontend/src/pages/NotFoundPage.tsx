import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export const NotFoundPage = () => (
  <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
    <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600">404</h1>
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Page not found</h2>
    <p className="text-sm text-gray-500">The page you're looking for doesn't exist.</p>
    <Link to="/dashboard"><Button>Go to Dashboard</Button></Link>
  </div>
);

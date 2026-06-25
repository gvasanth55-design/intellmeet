import { useUIStore } from '@/store/ui';
import { useAuthStore } from '@/store/auth';
import { Avatar } from '@/components/ui/Avatar';
import { Bell, Menu, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const user = useAuthStore((s) => s.user);

  return (
    <header className="flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-950 lg:px-6">
      <button onClick={toggleSidebar} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 max-w-md">
        <Search className="h-4 w-4 text-gray-400" />
        <input type="text" placeholder="Search meetings, people..." className="flex-1 bg-transparent outline-hidden placeholder:text-gray-400" />
      </div>

      <div className="flex items-center gap-3">
        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
        {user && (
          <Link to="/profile" className="flex items-center gap-2 rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Avatar name={user.name} size="sm" />
            <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-300 md:block">{user.name}</span>
          </Link>
        )}
      </div>
    </header>
  );
};

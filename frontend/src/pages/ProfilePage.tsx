import { useAuthStore } from '@/store/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Calendar, Shield } from 'lucide-react';
import { format } from 'date-fns';

export const ProfilePage = () => {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account information.</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:items-start">
          <Avatar name={user.name} size="xl" />
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
            <p className="text-sm text-gray-500">Engineering Lead</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Badge variant="success">Active</Badge>
              <Badge variant="info">Admin</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Account Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-gray-500">Email:</span>
            <span className="text-gray-900 dark:text-white">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Shield className="h-4 w-4 text-gray-400" />
            <span className="text-gray-500">Role:</span>
            <span className="text-gray-900 dark:text-white">{user.role}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-500">Member since:</span>
            <span className="text-gray-900 dark:text-white">January 2024</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Edit Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input id="displayName" label="Display Name" defaultValue={user.name} />
          <Input id="profileEmail" label="Email" type="email" defaultValue={user.email} />
          <Input id="title" label="Job Title" defaultValue="Engineering Lead" />
          <Input id="bio" label="Bio" defaultValue="Full-stack developer passionate about real-time systems." />
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
};

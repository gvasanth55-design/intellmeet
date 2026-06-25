import { useAuthStore } from '@/store/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PageTransition, SlideUp } from '@/components/shared/PageTransition';
import { Mail, Calendar, Shield, Save } from 'lucide-react';

export const ProfilePage = () => {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <SlideUp>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Profile</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Manage your account information.</p>
        </SlideUp>

        <SlideUp delay={0.1}>
          <Card>
            <CardContent className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:items-start">
              <Avatar name={user.name} size="xl" />
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{user.name}</h2>
                <p className="text-sm text-[var(--text-muted)]">Engineering Lead</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <Badge variant="success">Active</Badge>
                  <Badge variant="brand">Admin</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideUp>

        <SlideUp delay={0.2}>
          <Card>
            <CardHeader><CardTitle>Account Details</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: Mail, label: 'Email', value: user.email },
                { icon: Shield, label: 'Role', value: user.role },
                { icon: Calendar, label: 'Member since', value: 'January 2024' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-3.5">
                  <div className="rounded-lg bg-brand-50 p-2 dark:bg-brand-900/20"><Icon className="h-4 w-4 text-brand-500" /></div>
                  <span className="text-sm text-[var(--text-muted)] min-w-20">{label}</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </SlideUp>

        <SlideUp delay={0.3}>
          <Card>
            <CardHeader><CardTitle>Edit Profile</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input id="name" label="Display Name" defaultValue={user.name} />
                <Input id="email" label="Email" type="email" defaultValue={user.email} />
                <Input id="title" label="Job Title" defaultValue="Engineering Lead" />
                <Input id="dept" label="Department" defaultValue="Engineering" />
              </div>
              <Input id="bio" label="Bio" defaultValue="Full-stack developer passionate about real-time systems." />
              <Button><Save className="h-4 w-4" />Save Changes</Button>
            </CardContent>
          </Card>
        </SlideUp>
      </div>
    </PageTransition>
  );
};

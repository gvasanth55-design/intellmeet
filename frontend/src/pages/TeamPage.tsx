import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { PageTransition, SlideUp } from '@/components/shared/PageTransition';
import { mockUsers } from '@/mock/users';
import { Search, UserPlus, Mail, Building2 } from 'lucide-react';

const departments = ['All', 'Engineering', 'Product', 'Design', 'AI'];

export const TeamPage = () => {
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('All');

  const filtered = mockUsers.filter(u => {
    const title = (u as any).title || '';
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = dept === 'All' || (u as any).department === dept;
    return matchesSearch && matchesDept;
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <SlideUp>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">Team</h1>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Manage your team members.</p>
            </div>
            <Button><UserPlus className="h-4 w-4" />Invite Member</Button>
          </div>
        </SlideUp>

        <SlideUp delay={0.1}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-disabled)]" />
              <input type="text" placeholder="Search team..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="block w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] py-2.5 pl-10 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-200/30 transition-all duration-200"
              />
            </div>
            <div className="flex gap-1 rounded-xl bg-[var(--bg-surface)] p-1">
              {departments.map(d => (
                <button key={d} onClick={() => setDept(d)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                    dept === d ? 'bg-[var(--bg-card)] text-brand-500 shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                  }`}
                >{d}</button>
              ))}
            </div>
          </div>
        </SlideUp>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((user, i) => (
            <SlideUp key={user.id} delay={0.2 + i * 0.06}>
              <Card className="group transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <Avatar name={user.name} size="lg" status={i === 0 ? 'online' : i % 2 === 0 ? 'away' : 'offline'} />
                    <Badge variant={user.role === 'admin' ? 'brand' : user.role === 'moderator' ? 'info' : 'default'}>{user.role}</Badge>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-[var(--text-primary)]">{user.name}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{(user as any).title}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-[var(--text-disabled)]">
                      <Building2 className="h-3.5 w-3.5" />{(user as any).department}
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1"><Mail className="h-3.5 w-3.5" />Message</Button>
                    <Button variant="ghost" size="sm" className="flex-1">View Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </SlideUp>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

import { useAuthStore } from '@/store/auth';
import { mockMeetings } from '@/mock/meetings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { PageTransition, SlideUp } from '@/components/shared/PageTransition';
import { Link } from 'react-router-dom';
import { Video, Clock, Users, TrendingUp, Plus, ArrowRight, FileText } from 'lucide-react';

const stats = [
  { label: 'Total Meetings', value: '12', icon: Video, change: '+2 this week', color: 'from-brand-400 to-brand-500' },
  { label: 'Hours This Week', value: '8.5', icon: Clock, change: '+1.2 hrs', color: 'from-emerald-400 to-emerald-500' },
  { label: 'Participants', value: '34', icon: Users, change: '+5 new', color: 'from-violet-400 to-violet-500' },
  { label: 'Summaries', value: '9', icon: TrendingUp, change: '75% of meetings', color: 'from-amber-400 to-amber-500' },
];

export const DashboardPage = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <PageTransition>
      <div className="space-y-6">
        <SlideUp>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                Welcome back, {user?.name?.split(' ')[0]}
              </h1>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Here&apos;s what&apos;s happening today.</p>
            </div>
            <Link to="/meetings"><Button><Plus className="h-4 w-4" />New Meeting</Button></Link>
          </div>
        </SlideUp>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, change, color }, i) => (
            <SlideUp key={label} delay={0.1 + i * 0.08}>
              <Card className="group cursor-default">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className={`shrink-0 rounded-xl bg-gradient-to-br ${color} p-3 shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-[var(--text-muted)]">{label}</p>
                    <p className="mt-0.5 text-2xl font-bold text-[var(--text-primary)]">{value}</p>
                    <p className="mt-0.5 text-xs text-[var(--text-disabled)]">{change}</p>
                  </div>
                </CardContent>
              </Card>
            </SlideUp>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <SlideUp delay={0.4}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active & Upcoming</CardTitle>
                <Link to="/meetings"><Button variant="ghost" size="sm" className="gap-1">View all <ArrowRight className="h-3.5 w-3.5" /></Button></Link>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {mockMeetings.filter(m => m.status !== 'ended').map((meeting, i) => (
                  <Link key={meeting.id} to={`/meeting/${meeting.id}`}
                    className="flex items-center gap-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-3.5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                    style={{ animationDelay: `${0.5 + i * 0.08}s` }}
                  >
                    <Avatar name={meeting.hostName} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--text-primary)] truncate">{meeting.title}</p>
                      <p className="text-sm text-[var(--text-muted)]">{meeting.hostName} &middot; {meeting.participantCount} participants</p>
                    </div>
                    <StatusBadge status={meeting.status} />
                  </Link>
                ))}
              </CardContent>
            </Card>
          </SlideUp>

          <SlideUp delay={0.5}>
            <Card>
              <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
              <CardContent className="space-y-2.5">
                {mockMeetings.filter(m => m.status === 'ended').slice(0, 3).map((meeting, i) => (
                  <div key={meeting.id}
                    className="group rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-3.5 transition-all duration-200 hover:shadow-md"
                    style={{ animationDelay: `${0.6 + i * 0.08}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 rounded-lg bg-brand-50 p-2.5 dark:bg-brand-900/20">
                        <FileText className="h-4 w-4 text-brand-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-[var(--text-primary)]">{meeting.title}</p>
                        {meeting.summary && <p className="mt-1 text-sm text-[var(--text-muted)] line-clamp-2">{meeting.summary}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </SlideUp>
        </div>
      </div>
    </PageTransition>
  );
};

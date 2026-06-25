import { useAuthStore } from '@/store/auth';
import { mockMeetings } from '@/mock/meetings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { Video, Clock, Users, FileText } from 'lucide-react';

const stats = [
  { label: 'Total Meetings', value: '12', icon: Video, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20' },
  { label: 'Hours This Week', value: '8.5', icon: Clock, color: 'text-green-600 bg-green-100 dark:bg-green-900/20' },
  { label: 'Participants', value: '34', icon: Users, color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20' },
  { label: 'Summaries', value: '9', icon: FileText, color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/20' },
];

export const DashboardPage = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.name}</h1>
        <p className="mt-1 text-sm text-gray-500">Here's what's happening with your meetings today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`rounded-lg p-3 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active & Upcoming</CardTitle>
            <Link to="/meetings"><Button variant="ghost" size="sm">View all</Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockMeetings.filter(m => m.status !== 'ended').map((meeting) => (
              <Link key={meeting.id} to={`/meeting/${meeting.id}`} className="flex items-center gap-4 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900">
                <Avatar name={meeting.hostName} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate dark:text-white">{meeting.title}</p>
                  <p className="text-sm text-gray-500">{meeting.hostName} &middot; {meeting.participantCount} participants</p>
                </div>
                <StatusBadge status={meeting.status} />
              </Link>
            ))}
            {mockMeetings.filter(m => m.status !== 'ended').length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No upcoming meetings</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockMeetings.filter(m => m.status === 'ended').slice(0, 3).map((meeting) => (
              <div key={meeting.id} className="flex items-start gap-3 rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/20">
                  <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white">{meeting.title}</p>
                  {meeting.summary && <p className="mt-1 text-sm text-gray-500 line-clamp-2">{meeting.summary}</p>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

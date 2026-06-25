import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockMeetings } from '@/mock/meetings';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';
import { Plus, Clock, Users, Search } from 'lucide-react';
import { format } from 'date-fns';

export const MeetingsPage = () => {
  const [search, setSearch] = useState('');

  const filtered = mockMeetings.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.hostName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meetings</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and join your meetings.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />New Meeting</Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search meetings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((meeting) => (
          <Link key={meeting.id} to={`/meeting/${meeting.id}`}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar name={meeting.hostName} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 truncate dark:text-white">{meeting.title}</h3>
                    <StatusBadge status={meeting.status} />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{meeting.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{format(new Date(meeting.startTime), 'MMM d, yyyy h:mm a')}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{meeting.participantCount} participants</span>
                    <span>Hosted by {meeting.hostName}</span>
                  </div>
                </div>
                {meeting.status === 'live' && (
                  <Button size="sm" className="shrink-0">Join Now</Button>
                )}
                {meeting.status === 'scheduled' && (
                  <Button variant="outline" size="sm" className="shrink-0">View Details</Button>
                )}
                {meeting.status === 'ended' && (
                  <Button variant="ghost" size="sm" className="shrink-0">View Summary</Button>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400">No meetings found.</div>
        )}
      </div>
    </div>
  );
};

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { PageTransition, SlideUp } from '@/components/shared/PageTransition';
import { mockMeetings } from '@/mock/meetings';
import { ChevronLeft, ChevronRight, Plus, Clock, Users } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const dayMeetings = mockMeetings.filter(m => isSameDay(new Date(m.startTime), selectedDate));

  return (
    <PageTransition>
      <div className="space-y-6">
        <SlideUp>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">Calendar</h1>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Schedule and manage your meetings.</p>
            </div>
            <Button><Plus className="h-4 w-4" />New Event</Button>
          </div>
        </SlideUp>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <SlideUp delay={0.1}>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    {format(currentDate, 'MMMM yyyy')}
                  </h2>
                  <div className="flex gap-1">
                    <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--hover-bg)] transition-colors"><ChevronLeft className="h-4 w-4" /></button>
                    <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1.5 text-xs font-medium text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-colors">Today</button>
                    <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--hover-bg)] transition-colors"><ChevronRight className="h-4 w-4" /></button>
                  </div>
                </div>

                <div className="grid grid-cols-7 mb-2">
                  {weekDays.map(d => <div key={d} className="py-2 text-center text-xs font-medium text-[var(--text-muted)]">{d}</div>)}
                </div>

                <div className="grid grid-cols-7">
                  {days.map((day, i) => {
                    const active = isSameDay(day, selectedDate);
                    const hasMeeting = mockMeetings.some(m => isSameDay(new Date(m.startTime), day));
                    return (
                      <button key={i} onClick={() => setSelectedDate(day)}
                        className={`relative py-2.5 text-sm transition-all duration-200 rounded-lg mx-0.5 my-0.5 ${
                          !isSameMonth(day, currentDate) ? 'text-[var(--text-disabled)]' : 'text-[var(--text-primary)]'
                        } ${active ? 'bg-brand-400 text-white font-semibold shadow-sm' : 'hover:bg-[var(--hover-bg)]'}
                        ${isToday(day) && !active ? 'ring-1 ring-brand-300' : ''}`}
                      >
                        {format(day, 'd')}
                        {hasMeeting && !active && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-brand-400" />}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 space-y-1">
                  {dayMeetings.slice(0, 3).map(m => (
                    <div key={m.id} className="flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-xs dark:bg-brand-900/20">
                      <span className="h-2 w-2 rounded-full bg-brand-400" />
                      <span className="font-medium text-brand-700 dark:text-brand-300">{format(new Date(m.startTime), 'h:mm a')}</span>
                      <span className="text-brand-600 dark:text-brand-400 truncate">{m.title}</span>
                    </div>
                  ))}
                  {dayMeetings.length === 0 && <p className="py-4 text-center text-xs text-[var(--text-muted)]">No meetings this day</p>}
                </div>
              </CardContent>
            </Card>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Upcoming meetings</h3>
              {mockMeetings.map(m => (
                <div key={m.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-3.5 transition-all duration-200 hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold text-brand-500">{format(new Date(m.startTime), 'MMM')}</span>
                      <span className="text-lg font-bold text-[var(--text-primary)]">{format(new Date(m.startTime), 'd')}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">{m.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[var(--text-muted)]">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{format(new Date(m.startTime), 'h:mm a')}</span>
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" />{m.participantCount}</span>
                      </div>
                    </div>
                    <Badge variant={m.status === 'live' ? 'success' : m.status === 'scheduled' ? 'info' : 'default'}>{m.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </SlideUp>
        </div>
      </div>
    </PageTransition>
  );
};

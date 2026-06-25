import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageTransition, SlideUp } from '@/components/shared/PageTransition';
import { Moon, Bell, Mic, Monitor, BrainCircuit, Save } from 'lucide-react';

export const SettingsPage = () => {
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'));

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
  };

  const Toggle = ({ checked }: { checked: boolean }) => (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" defaultChecked={checked} className="peer sr-only" />
      <div className="h-6 w-11 rounded-full bg-grey-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-grey-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-brand-400 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-grey-700" />
    </label>
  );

  const sections = [
    { title: 'Appearance', icon: Moon, delay: 0.1, content: (
      <div className="flex items-center justify-between rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-brand-50 p-2 dark:bg-brand-900/20"><Moon className="h-4 w-4 text-brand-500" /></div>
          <div><p className="font-medium text-[var(--text-primary)]">Dark Mode</p><p className="text-sm text-[var(--text-muted)]">Toggle between light and dark themes.</p></div>
        </div>
        <button onClick={toggleDark}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ${dark ? 'bg-brand-400' : 'bg-grey-300'}`}
        >
          <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${dark ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
    )},
    { title: 'Notifications', icon: Bell, delay: 0.2, content: (
      <div className="space-y-3">
        {['Email notifications', 'Meeting reminders', 'Summary reports', 'Product updates'].map(item => (
          <div key={item} className="flex items-center justify-between rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-3.5">
            <p className="text-sm font-medium text-[var(--text-primary)]">{item}</p>
            <Toggle checked />
          </div>
        ))}
      </div>
    )},
    { title: 'Audio & Video', icon: Mic, delay: 0.3, content: (
      <div className="grid gap-4 sm:grid-cols-2">
        {[{ label: 'Microphone', icon: Mic }, { label: 'Speaker', icon: Monitor }].map(({ label, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-3.5">
            <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] mb-2"><Icon className="h-4 w-4" />{label}</label>
            <select className="block w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-200/30">
              <option>Default - Built-in {label}</option>
            </select>
          </div>
        ))}
      </div>
    )},
    { title: 'Recording & AI', icon: BrainCircuit, delay: 0.4, content: (
      <div className="space-y-3">
        {[
          { label: 'Auto-record meetings', desc: 'Automatically start recording when a meeting begins' },
          { label: 'AI Summaries', desc: 'Generate AI-powered summaries after each meeting' },
          { label: 'Live transcription', desc: 'Enable real-time transcription during meetings' },
        ].map(({ label, desc }) => (
          <div key={label} className="flex items-center justify-between rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-3.5">
            <div><p className="text-sm font-medium text-[var(--text-primary)]">{label}</p><p className="text-xs text-[var(--text-muted)]">{desc}</p></div>
            <Toggle checked />
          </div>
        ))}
      </div>
    )},
  ];

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <SlideUp>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Settings</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Customize your experience.</p>
        </SlideUp>
        {sections.map(({ title, icon: Icon, delay, content }) => (
          <SlideUp key={title} delay={delay}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Icon className="h-5 w-5 text-brand-500" />{title}</CardTitle></CardHeader>
              <CardContent>{content}</CardContent>
            </Card>
          </SlideUp>
        ))}
        <div className="flex justify-end"><Button><Save className="h-4 w-4" />Save All Settings</Button></div>
      </div>
    </PageTransition>
  );
};

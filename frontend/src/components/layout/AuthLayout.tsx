'use client';
import { Outlet, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import { Video, Sparkles, Shield, Zap } from 'lucide-react';

const features = [
  { icon: Sparkles, text: 'AI-powered transcription & summaries' },
  { icon: Zap, text: 'Real-time collaboration' },
  { icon: Shield, text: 'Enterprise-grade security' },
];

export const AuthLayout = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="relative flex min-h-screen bg-gradient-auth overflow-hidden">
      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-brand-500/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-500/20">
              <Video className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">IntellMeet</h1>
            <p className="mt-1 text-sm text-white/50">Smarter meetings, better outcomes</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl shadow-2xl">
            <Outlet />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 hidden flex-col justify-center p-16 lg:flex lg:w-1/2">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-lg">
          <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
            Transform your
            <span className="bg-gradient-to-r from-brand-300 to-violet-300 bg-clip-text text-transparent"> meetings</span>
            <br />
            into intelligence.
          </h2>
          <p className="mb-10 text-lg text-white/50 leading-relaxed">
            IntellMeet uses cutting-edge AI to transcribe, summarize, and extract
            actionable insights from every conversation.
          </p>
          <div className="space-y-3">
            {features.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] px-5 py-3.5 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:translate-x-1"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10">
                  <Icon className="h-5 w-5 text-brand-300" />
                </div>
                <span className="text-sm text-white/70">{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

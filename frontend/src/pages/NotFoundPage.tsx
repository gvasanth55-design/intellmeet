import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { PageTransition } from '@/components/shared/PageTransition';

export const NotFoundPage = () => (
  <PageTransition>
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center p-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/30 dark:to-brand-800/20"
      >
        <span className="text-5xl font-bold bg-gradient-to-br from-brand-400 to-brand-600 bg-clip-text text-transparent">404</span>
      </motion.div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Page not found</h2>
        <p className="text-sm text-[var(--text-muted)] max-w-xs">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      </div>
      <div className="flex gap-3">
        <Link to="/dashboard"><Button><Home className="h-4 w-4" />Go to Dashboard</Button></Link>
        <Button variant="outline" onClick={() => window.history.back()}><ArrowLeft className="h-4 w-4" />Go Back</Button>
      </div>
      <div className="w-full max-w-sm mt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-disabled)]" />
          <input type="text" placeholder="Search pages..."
            className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] py-2.5 pl-10 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-200/30 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  </PageTransition>
);

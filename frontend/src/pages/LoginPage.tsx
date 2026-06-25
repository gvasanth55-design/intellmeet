import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/auth';
import { LogIn } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState('alex@intellmeet.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setAuth('mock-token', { id: 'u1', name: 'Alex Johnson', email, role: 'admin' });
    navigate('/dashboard');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="mt-1.5 text-sm text-white/40">Sign in to your account</p>
      </div>
      <Input id="email" type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input id="password" type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <div className="flex items-center justify-end">
        <button type="button" className="text-xs text-white/40 hover:text-white/60 transition-colors">Forgot password?</button>
      </div>
      <Button type="submit" className="w-full" loading={loading}>
        <LogIn className="h-4 w-4" />
        Sign In
      </Button>
      <p className="text-center text-sm text-white/30">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-medium text-brand-300 hover:text-brand-200 transition-colors">Sign up</Link>
      </p>
    </motion.form>
  );
};

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/auth';
import { UserPlus } from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setAuth('mock-token', { id: 'u-new', name, email, role: 'user' });
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
        <h1 className="text-2xl font-bold text-white">Create account</h1>
        <p className="mt-1.5 text-sm text-white/40">Get started with IntellMeet</p>
      </div>
      <Input id="name" label="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input id="email" type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input id="password" type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit" className="w-full" loading={loading}>
        <UserPlus className="h-4 w-4" />
        Create Account
      </Button>
      <p className="text-center text-sm text-white/30">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-brand-300 hover:text-brand-200 transition-colors">Sign in</Link>
      </p>
    </motion.form>
  );
};

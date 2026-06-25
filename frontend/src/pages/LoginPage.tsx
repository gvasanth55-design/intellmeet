import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/auth';

export const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState('alex@intellmeet.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const mockUser = { id: 'u1', name: 'Alex Johnson', email: 'alex@intellmeet.com', role: 'admin' as const };
    setAuth('mock-token-abc123', mockUser);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
      </div>
      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{error}</div>}
      <Input id="email" type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input id="password" type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit" className="w-full">Sign In</Button>
      <p className="text-center text-sm text-gray-500">
        Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">Sign up</Link>
      </p>
    </form>
  );
};

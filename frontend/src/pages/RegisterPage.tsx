import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/auth';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuth('mock-token-abc123', { id: 'u-new', name, email, role: 'user' as const });
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create account</h1>
        <p className="mt-1 text-sm text-gray-500">Get started with IntellMeet</p>
      </div>
      <Input id="name" label="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input id="email" type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input id="password" type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit" className="w-full">Create Account</Button>
      <p className="text-center text-sm text-gray-500">
        Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">Sign in</Link>
      </p>
    </form>
  );
};

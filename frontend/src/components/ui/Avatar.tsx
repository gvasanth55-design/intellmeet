import { cn } from '@/lib/utils';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const initials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

const sizeClasses = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-12 w-12 text-base', xl: 'h-16 w-16 text-lg' };

export const Avatar = ({ name, src, size = 'md', className }: AvatarProps) => {
  if (src) {
    return <img src={src} alt={name} className={cn('rounded-full object-cover', sizeClasses[size], className)} />;
  }
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500'];
  const colorIndex = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
  return (
    <div className={cn('flex items-center justify-center rounded-full font-medium text-white', colors[colorIndex], sizeClasses[size], className)}>
      {initials(name)}
    </div>
  );
};

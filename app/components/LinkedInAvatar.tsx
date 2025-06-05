import { Linkedin } from 'lucide-react';
import Link from 'next/link';

interface LinkedInAvatarProps {
  name: string;
  size?: string;
  src?: string;
  url?: string;
}

export const LinkedInAvatar = ({
  name,
  size = 'w-16 h-16',
  src,
  url,
}: LinkedInAvatarProps) => {
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-pink-500',
      'bg-teal-500',
    ];
    const index = name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <Link
      href={url || ''}
      target='_blank'
    >
      <div
        className={`${size} rounded-full ${
          !src && getAvatarColor(name)
        } flex items-center justify-center text-white font-bold text-lg relative`}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className='w-full h-full object-cover absolute inset-0 rounded-full'
          />
        ) : (
          initials
        )}
        {name && (
          <div className='absolute -bottom-1 -right-1 w-6 h-6 p-1.5 bg-blue-600 rounded-full flex items-center justify-center dark:bg-blue-600 dark:text-white'>
            <Linkedin className='w-4 h-4 text-white' />
          </div>
        )}
      </div>
    </Link>
  );
};

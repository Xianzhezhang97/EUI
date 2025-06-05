import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { LinkedInAvatar } from './LinkedInAvatar';
import { Person } from '../types';

interface PersonCardProps {
  person: Person;
  index: number;
  darkMode: boolean;
}

export const PersonCard = ({ person, index, darkMode }: PersonCardProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true, margin: '0px 0px -200px 0px' }}
    className={`p-6 rounded-xl  ${
      darkMode ? 'bg-sky-950 border-sky-900' : 'bg-yellow-50/20 border-zinc-200'
    } border transition-all duration-300`}
  >
    <Link
      href={person.url || '#'}
      target='_blank'
      className='flex items-start gap-4 mb-4'
    >
      <LinkedInAvatar
        name={person.name}
        src={person.src}
        url={person.url}
      />
      <div className='flex-1'>
        <h3 className='text-xl font-bold mb-1'>{person.name}</h3>
        <div className='flex items-center gap-2 mb-2'>
          <Trophy className='w-4 h-4 text-yellow-500' />
          <span
            className={`text-sm font-medium ${
              darkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`}
          >
            {person.award}
          </span>
        </div>
      </div>
    </Link>
    <p
      className={`text-sm md:text-base lg:text-lg ${
        darkMode ? 'text-zinc-300' : 'text-zinc-700'
      } leading-relaxed`}
    >
      {person.description}
    </p>
  </motion.div>
);

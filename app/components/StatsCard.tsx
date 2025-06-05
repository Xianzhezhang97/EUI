import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Number } from '@/stories/Components/Number/Number';

interface StatsCardProps {
  icon: LucideIcon;
  number: string;
  label: string;
  darkMode: boolean;
}

export const StatsCard = ({
  icon: Icon,
  number,
  label,
  darkMode,
}: StatsCardProps) => (
  <motion.div
    // layout
    whileHover={{ scale: 1.02 }}
    className={`p-6 rounded-xl  ${
      darkMode ? 'bg-zinc-800' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
    } border ${darkMode ? 'border-zinc-700' : 'border-blue-100'}`}
  >
    <div className='flex items-center gap-4'>
      <div
        className={`p-3 rounded-lg ${darkMode ? 'bg-blue-600' : 'bg-blue-100'}`}
      >
        <Icon
          className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-blue-600'}`}
        />
      </div>
      <div>
        <div>
          <Number
            value={number}
            format='none'
            animation='slide'
            duration={0.5}
            decimalPlaces={0}
            maxNumberPlaces={0}
            useShortFormat={false}
            className='text-2xl font-bold text-blue-600'
          />
        </div>
        <div
          className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
        >
          {label}
        </div>
      </div>
    </div>
  </motion.div>
);

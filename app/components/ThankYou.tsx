import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Sun, Moon, Globe } from 'lucide-react';

interface ThankYouProps {
  content: {
    zh: string;
    en: string;
  };
}

export default function ThankYou({ content }: ThankYouProps) {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className='min-h-screen w-full'>
      <div className='fixed top-4 right-4 flex items-center gap-4 z-50'>
        <button
          onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
          className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors'
          aria-label='Switch Language'
        >
          <Globe className='w-5 h-5' />
        </button>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors'
          aria-label='Toggle Dark Mode'
        >
          {theme === 'dark' ? (
            <Sun className='w-5 h-5' />
          ) : (
            <Moon className='w-5 h-5' />
          )}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='max-w-4xl mx-auto px-4 py-16 prose dark:prose-invert prose-lg'
      >
        <article className='relative'>
          <div className='absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full' />
          <div
            className='markdown-content'
            dangerouslySetInnerHTML={{ __html: content[language] }}
          />
        </article>
      </motion.div>
    </div>
  );
}

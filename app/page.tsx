'use client';
import { useState } from 'react';
import { Card } from '@/stories/Components/Card/Card';
import { Button } from '@/stories/Components/Button/Button';
import { motion } from 'framer-motion';
import { Moon, Sun, Heart, Trophy } from 'lucide-react';
import { LinkedInAvatar } from './components/LinkedInAvatar';
import { StatsCard } from './components/StatsCard';
import { PersonCard } from './components/PersonCard';
import { getStats } from './data/stats';
import messages from './data/messages.json';
import { Dock } from 'lucide-react';
import type { ContentMessages } from './types';
import Link from 'next/link';

export default function OfferAnnouncement() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  const currentMessages = messages[language] as ContentMessages;
  const stats = getStats(language);

  return (
    <div
      className={`min-h-screen pt-24 transition-all duration-500 ${
        darkMode
          ? 'bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white'
          : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-zinc-900'
      }`}
    >
      {/* 控制按钮 */}
      <div
        className='fixed top-0 left-0 h-16 p-3  flex justify-end
       w-full right-0 flex items-center gap-3 z-10'
      >
        <a
          href='https://xianzhe.site/'
          target='_blank'
        >
          <Button
            variant='icon'
            isPadding={false}
            onClick={() => setDarkMode(!darkMode)}
            className={` border  ${
              darkMode
                ? 'bg-zinc-800 hover:bg-zinc-700'
                : 'bg-zinc-100 hover:bg-zinc-700 hover:text-white'
            }`}
          >
            <Dock className='w-5 h-5' />
          </Button>
        </a>
        <Button
          variant='icon'
          isPadding={false}
          onClick={() => setDarkMode(!darkMode)}
          className={` border  ${
            darkMode
              ? 'bg-zinc-800 hover:bg-zinc-700'
              : 'bg-zinc-100 hover:bg-zinc-700 hover:text-white'
          }`}
        >
          {darkMode ? (
            <Sun className='w-5 h-5' />
          ) : (
            <Moon className='w-5 h-5' />
          )}
        </Button>

        <Button
          onClick={toggleLanguage}
          className={`  shadow-lg ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {language === 'en' ? '中文' : 'English'}
        </Button>
      </div>

      <div className='max-w-6xl mx-auto px-6 py-12'>
        {/* 头部标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-12'
        >
          <div className='flex justify-center items-end gap-4 mb-6'>
            <LinkedInAvatar
              name='Scott Zhang'
              size='w-48 h-48'
              url='https://www.linkedin.com/in/yifan-ai-0000000000/'
              src='https://img.picgo.net/2025/06/05/profile-copy46ff46bbb252fb3c.png'
            />
          </div>
          <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent'>
            {currentMessages.title}
          </h1>
          <p
            className={`text-xl ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            } mb-8`}
          >
            {currentMessages.subtitle}
          </p>
        </motion.div>

        {/* 统计数据 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='grid  [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))] gap-6 mb-12 '
        >
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              number={stat.number}
              label={stat.label}
              darkMode={darkMode}
            />
          ))}
        </motion.div>

        {/* 主要内容 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -200px 0px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='flex gap-4  items-center my-12 '
        >
          <div
            className={`p-xl rounded-xl border  ${
              darkMode
                ? 'bg-gradient-to-t from-sky-950 to-blue-900 border-sky-900'
                : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-zinc-200'
            }`}
          >
            <div className='prose dark:prose-invert max-w-none'>
              <p className='text-lg leading-relaxed whitespace-pre-line'>
                {currentMessages.intro}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 感谢部分 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='mb-12'
        >
          <div className='flex items-center gap-3 mb-8'>
            <Heart className='w-8 h-8 text-red-500' />
            <h2 className='text-3xl font-bold'>
              {currentMessages.thanksTitle}
            </h2>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-6'>
            {currentMessages.people.map((person, index) => (
              <PersonCard
                key={person.name}
                person={person}
                index={index}
                darkMode={darkMode}
              />
            ))}
          </div>
        </motion.div>

        {/* 结语 */}
        <motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -200px 0px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='flex gap-4  items-center my-12 '
          >
            <div
              className={`p-xl rounded-xl border  ${
                darkMode
                  ? 'bg-sky-950 border-sky-900'
                  : 'bg-white border-zinc-200'
              }`}
            >
              <div className='prose dark:prose-invert max-w-none'>
                <p className='text-lg leading-relaxed whitespace-pre-line'>
                  <p className='text-base md:text-md lg:text-lg leading-relaxed mb-6'>
                    {currentMessages.finalMessage}
                  </p>
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -200px 0px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={` p-xl rounded-xl border  ${
              darkMode
                ? 'bg-gradient-to-r from-blue-900 to-indigo-900 border-blue-700'
                : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
            }`}
          >
            <div className='text-left prose dark:prose-invert max-w-none'>
              <div className=' text-lg md:text-xl lg:text-2xl font-medium text-left whitespace-pre-line'>
                "{currentMessages.signature}"
              </div>
              <Link
                href='https://www.linkedin.com/in/scottcheung1110/'
                target='_blank'
                className='flex items-start gap-4 mb-4'
              >
                <LinkedInAvatar
                  name='Scott'
                  src='https://img.picgo.net/2025/06/05/profile-copy46ff46bbb252fb3c.png'
                  url='https://www.linkedin.com/in/scottcheung1110/'
                />
                <div className='flex-1'>
                  <h3 className='text-xl font-bold mb-1'>Scott Cheung</h3>
                  <div className='flex items-center gap-2 mb-2'>
                    <Trophy className='w-4 h-4 text-yellow-500' />
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? 'text-yellow-400' : 'text-yellow-600'
                      }`}
                    >
                      FullStack Developer
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

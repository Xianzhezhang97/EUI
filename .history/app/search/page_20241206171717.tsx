/** @format */
'use client';
import { motion as m, AnimatePresence as PP } from 'framer-motion';
import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

const fruit = [
  'Apple',
  'Apricot',
  'Avocado',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Cantaloupe',
  'Cherry',
  'Coconut',
  'Cranberry',
  'Custard Apple',
  'Date',
  'Dragonfruit',
  'Durian',
  'Elderberry',
  'Fig',
  'Gooseberry',
  'Grape',
  'Grapefruit',
  'Guava',
  'Honeydew',
  'Jackfruit',
  'Jujube',
  'Kiwi',
  'Kumquat',
  'Lemon',
  'Lime',
  'Longan',
  'Lychee',
  'Mango',
  'Mangosteen',
  'Mulberry',
  'Nectarine',
  'Orange',
  'Papaya',
  'Passionfruit',
  'Peach',
  'Pear',
  'Persimmon',
  'Pineapple',
  'Plum',
  'Pomegranate',
  'Pomelo',
  'Quince',
  'Raspberry',
  'Rambutan',
  'Salak (Snake Fruit)',
  'Sapodilla',
  'Sapote',
  'Soursop',
  'Starfruit',
  'Strawberry',
  'Tamarillo',
  'Tamarind',
  'Tomato',
  'Ugli Fruit',
  'Vanilla Bean',
  'Watermelon',
  'White Currant',
  'Xigua',
  'Yellow Passionfruit',
  'Yellow Watermelon',
  'Zucchini',
  'Ackee',
  'African Cucumber (Kiwano)',
  'Atemoya',
  'Bael Fruit',
  'Barbadine',
  'Bitter Melon',
  'Breadfruit',
  'Buddha’s Hand',
  'Camu Camu',
  'Cempedak',
  'Cherimoya',
  'Cloudberry',
  'Feijoa',
  'Horned Melon',
  'Ice Apple',
  'Jabuticaba',
  'Langsat',
  'Loquat',
  'Mamoncillo',
  'Medlar',
  'Miracle Fruit',
  'Noni',
  'Olive',
  'Pitanga (Surinam Cherry)',
  'Pitaya (Dragonfruit)',
  'Santol',
  'Sea Buckthorn',
  'Spanish Lime',
  'Sugar Apple',
  'Yangmei (Chinese Bayberry)',
  'Ziziphus',
];

// 模拟 API 请求函数
const fakeAPI = (query: string): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        fruit.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }, 300);
  });
};

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // 搜索关键字
  const [results, setResults] = useState<string[]>(fruit); // 搜索结果
  const [loading, setLoading] = useState<boolean>(false); // 是否加载中
  const [typping, setTypping] = useState<boolean>(false); // 是否输入中
  const [isFocused, setIsFocused] = useState<boolean>(false); // 是否输入中

  const debouncedFetch = useCallback(
    debounce((query: string) => {
      setTypping(false);
      setLoading(true);
      fakeAPI(query).then((data) => {
        setResults(data); // 更新结果
        setLoading(false); // 停止加载
      });
    }, 700),
    [],
  );

  useEffect(() => {
    // 设置输入中状态
    setTypping(true);
    // 如果没有输入内容，清空结果并停止加载
    if (query.trim() === '') {
      setResults([]);
      setLoading(false);
      setTypping(false);
      return;
    }

    debouncedFetch(query);
  }, [query, debouncedFetch]);

  const keywords = query.split(' ').filter(Boolean);
  const regex = new RegExp(
    `(${keywords.join('|').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi',
  );

  return (
    <div className='col page-padding'>
      <h1 className='aaa'>Search Fruit</h1>
      <p className=''>
        Use react hooks to build a search component. It can auto search and
        recommend relative keywords and quick fill.
      </p>
      <input
        type='text'
        className='card-rounded input border mt-6 z-10'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        // onBlur={() => setIsFocused(false)}
        placeholder='Search Fruit...'
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />
      {isFocused && (
        <div
          onClick={() => setIsFocused(false)}
          className='w-screen h-screen fixed inset-0 top-0 bg-white/10 z-0'
        ></div>
      )}

      <m.ul
        // layout
        className={'col bg-sky-50 p-6 w-full card-rounded mt-4 z-10'}
        variants={{
          show: {
            y: 0,
            opacity: 1,
            transition: { staggerChildren: 0.07, delayChildren: 0.2 },
          },
          hidden: {
            y: 30,
            opacity: 0,
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
          },
        }}
        initial='hidden'
        animate={
          (loading || typping || results.length !== 0 || query) && isFocused
            ? 'show'
            : 'hidden'
        }
      >
        {typping && <p>Typing...</p>}
        {loading && <p>Searching...</p>}
        {!loading && !typping && results.length === 0 && query && (
          <p>No result</p>
        )}
        {!typping &&
          !loading &&
          results.length > 0 &&
          (query ? (
            <p className='font-bold'>Here is results:</p>
          ) : (
            <p className='font-bold'>Guess you like</p>
          ))}
        <br />
        <PP>
          {results.slice(0, 8).map((result, index) => (
            <m.li
              key={index}
              onClick={() => {
                setQuery(result);
                setIsFocused(false);
              }}
              variants={{
                show: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    stiffness: 1000,
                    velocity: -100,
                    ease: [0.25, 1, 0.3, 1],
                  },
                },
                hidden: {
                  y: 30,
                  opacity: 0,
                  transition: {
                    stiffness: 1000,
                    ease: [0.25, 1, 0.3, 1],
                  },
                },
              }}
              whileHover={{
                scale: 1.005,
                x: -50,
                transition: { duration: 0.3, ease: [0.25, 1, 0.3, 1] },
              }}
              whileTap={{ scale: 0.995 }}
              className=' group  hover:bg-sky-900 hover:uppercase  hover:italic hover:font-black  caption-top hover:pl-16 pl-8 rounded-r-full py-4 rounded-sm hover:text-white/70'
            >
              <div className='relative inline-flex justify-start gap-3'>
                <span className='text-sky-500 text-3xl font-black group-hover:text-white'>
                  {index + 1}
                </span>
                <div>
                  {result.split(regex).map((part, i) =>
                    regex.test(part) ? (
                      <strong
                        key={i}
                        className='text-sky-500 group-hover:text-white'
                      >
                        {part}
                      </strong>
                    ) : (
                      part
                    ),
                  )}
                  <div className='absolute aaa  group-hover:flex hidden w-full -bottom-1 h-[3px] bg-white'></div>
                </div>
              </div>
            </m.li>
          ))}
        </PP>
      </m.ul>
    </div>
  );
};

export default SearchComponent;

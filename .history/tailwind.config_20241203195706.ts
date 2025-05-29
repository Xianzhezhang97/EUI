/** @format */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 基础颜色级别
        primary: 'var(--color-primary)', // 主要颜色
        secondary: 'var(--color-secondary)', // 次要颜色
        third: 'var(--color-third)', // 第三级颜色
        hover: 'var(--color-hover)', // 强调色
        active: 'var(--color-active)', // 激活色
        focus: 'var(--color-focus)', // 焦点色
        disabled: 'var(--color-disabled)', // 禁用状态色
        neutral: 'var(--color-neutral)', // 中性色，通常用于背景和次要元素
        muted: 'var(--color-muted)', // 弱化色，通常用于禁用状态或辅助元素
        body: 'var(--color-body)', // 主体色，通常用于文本和图标
        overlay: 'var(--color-overlay)', // 覆盖层背景（如模态框）
        link: 'var(--color-link)', // 链接色

        // 状态颜色
        info: 'var(--color-info)', // 信息色，通常用于通知或信息提示
        success: 'var(--color-success)', // 成功状态色
        warning: 'var(--color-warning)', // 警告状态色
        error: 'var(--color-error)', // 错误状态色

        // 文本颜色
        tc: {
          h1: 'var(--color-tc-h1)', // 标题1文本颜色
          h2: 'var(--color-tc-h2)', // 标题2文本颜色
          h3: 'var(--color-tc-h3)', // 标题3文本颜色
          h4: 'var(--color-tc-h4)', // 标题4文本颜色
          body: 'var(--color-tc-body)', // 主体文本颜色
          link: 'var(--color-link)', // 链接文本颜色
        },
      },
      fontSize: {
        xs: '0.65rem',
      },
      borderRadius: {
        none: '0',
        sm: '6px',
        md: '14px',
        lg: '28px',
        xl: '40px',
        full: '9999px',
      },
      spacing: {
        1: '0.25rem', // 4px
        2: '0.5rem', // 8px
        3: '0.75rem', // 12px
        4: '1rem', // 16px
        5: '1.25rem', // 20px
        6: '1.5rem', // 24px
        8: '2rem', // 32px
        10: '2.5rem', // 40px
        12: '3rem', // 48px
        sm: '6px',
        md: '14px',
        lg: '28px',
        xl: '40px',
      },
      keyframes: {
        'circle-draw': {
          '0%': { strokeDashoffset: '565.48' },
          '100%': { strokeDashoffset: '0' },
        },
        'tick-draw': {
          '0%': { strokeDashoffset: '240' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'circle-draw': 'circle-draw 1s ease-in-out forwards',
        'tick-draw': 'tick-draw 0.8s ease-out forwards',
      },
    },
  },

  plugins: [],
};
export default config;

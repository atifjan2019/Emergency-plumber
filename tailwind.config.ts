import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E73BE',
          dark: '#155a96',
        },
        accent: {
          DEFAULT: '#E53935',
          dark: '#c62828',
        },
        green: {
          DEFAULT: '#2ECC71',
          dark: '#27ae60',
        },
        navy: '#1E73BE',
        ink: '#222222',
        'off-white': '#F5F7FA',
        'gray-soft': '#666666',
        'gray-line': '#E5E7EB',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1280px',
      },
      fontSize: {
        'h1-d': ['48px', { lineHeight: '1.1', fontWeight: '800' }],
        'h1-m': ['32px', { lineHeight: '1.15', fontWeight: '800' }],
        'h2-d': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2-m': ['28px', { lineHeight: '1.25', fontWeight: '700' }],
        'h3-d': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3-m': ['20px', { lineHeight: '1.3', fontWeight: '600' }],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;

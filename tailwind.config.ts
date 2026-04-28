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
          DEFAULT: '#DC2626',
          dark: '#991B1B',
        },
        ink: '#0A0A0A',
        'off-white': '#FAFAFA',
        'gray-soft': '#6B7280',
        'gray-line': '#E5E7EB',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
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

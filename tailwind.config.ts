import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eff6ff',
          900: '#061525',
          950: '#020b14',
        },
        emerald: {
          500: '#10b981',
          600: '#059669',
        },
        gold: {
          400: '#d6b253',
          500: '#b98d24',
        },
      },
      boxShadow: {
        soft: '0 18px 40px rgba(2, 11, 20, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;

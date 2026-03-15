import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0F',
        card: '#12121A',
        border: '#1E1E2E',
        accent: '#7C3AED',
        accent2: '#06B6D4',
        success: '#10B981',
        warning: '#F59E0B',
        text: '#F8FAFC',
        muted: '#94A3B8',
      },
    },
  },
  plugins: [],
};
export default config;

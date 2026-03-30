/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5C6AC4',
          dark: '#3f4eae',
          light: '#F4F5FF',
        },
        accent: '#47C1BF',
        brand: {
          green: '#50B83C',
          text: '#1a1a2e',
          muted: '#6b7280',
          border: '#e5e7eb',
          alt: '#f9fafb',
          dark: '#0f1117',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        xl2: '20px',
      },
      keyframes: {
        pulse2: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':       { opacity: '0.6', transform: 'scale(1.3)' },
        },
      },
      animation: {
        pulse2: 'pulse2 2s infinite',
      },
    },
  },
  plugins: [],
}

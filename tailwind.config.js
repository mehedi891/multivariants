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
        // Help Center (/academy) palette, from the Help Center redesign file.
        hc: {
          bg: '#080a1c',
          panel: '#0d1030',
          ink: '#e9eafb',
          muted: '#9ea3c7',
          // The design's #6f749c is ~4.4:1 on the page; lifted to pass WCAG AA.
          dim: '#7a80a8',
          line: 'rgba(255,255,255,0.09)',
          'line-hover': 'rgba(120,140,255,0.45)',
          indigo: '#5766fa',
          cyan: '#1fe2e7',
          orange: '#f2894e',
          green: '#34d399',
          link: '#8b97ff',
          chip: '#aab4ff',
        },
      },
      backgroundImage: {
        'hc-grad': 'linear-gradient(231deg, #5766fa 20%, #1fe2e7 99%)',
      },
      boxShadow: {
        hc: '0 8px 22px rgba(87,102,250,0.28)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: { xl2: '20px' },
      keyframes: {
        pulse2: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':       { opacity: '0.6', transform: 'scale(1.3)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%':   { opacity: '0', transform: 'translateY(-32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeLeft: {
          '0%':   { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeRight: {
          '0%':   { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-14px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%':       { transform: 'translate(30px, -50px) scale(1.12)' },
          '66%':       { transform: 'translate(-20px, 20px) scale(0.92)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':       { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        pulse2:           'pulse2 2s infinite',
        'fade-up':        'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-down':      'fadeDown 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-left':      'fadeLeft 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-right':     'fadeRight 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in':       'scaleIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        float:            'float 6s ease-in-out infinite',
        blob:             'blob 9s infinite ease-in-out',
        shimmer:          'shimmer 3s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      backgroundSize: { '200%': '200%' },
    },
  },
  plugins: [
    // `cms-[img]:h-auto` styles <img> inside CMS article HTML, like `[&_img]:`,
    // but never inside a CMS custom HTML block (`<div data-html-block>`) — that
    // markup keeps its own styling. `:where()` adds no specificity, so the
    // cascade against the globals.css CMS rules is unchanged. As in `[&_…]`,
    // `_` stands for a space: `cms-[figure_img]` targets `figure img`.
    ({ matchVariant }) => {
      matchVariant('cms', (selector) =>
        `& ${selector.replaceAll('_', ' ')}:where(:not([data-html-block] *))`
      )
    },
  ],
}

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          'theme-bg': 'var(--color-theme-bg)',
          'theme-text': 'var(--color-theme-text)',
          'theme-accent': 'var(--color-theme-accent)',
          'theme-card': 'var(--color-theme-card)',
        },
      },
    },
    plugins: [],
  };
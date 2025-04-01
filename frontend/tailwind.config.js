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
        // Define the gradient colors as custom colors
        'gradient-start': 'var(--color-gradient-start)',
        'gradient-end': 'var(--color-gradient-end)',
        'gradient-start-hover': 'var(--color-gradient-start-hover)',
        'gradient-end-hover': 'var(--color-gradient-end-hover)',
      },
    },
  },
  plugins: [],
};
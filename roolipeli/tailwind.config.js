/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          400: '#4fa653', 500: '#2d8a31', 600: '#1e6e22',
          700: '#185a1b', 800: '#144818', 900: '#0e3211', 950: '#071a09',
        },
        parchment: '#f5f0e8',
        rune:      '#a3c9a8',
        gold:      '#c9a84c',
        darkwood:  '#1a2e1b',
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        body:    ['"Crimson Text"', 'serif'],
        mono:    ['"Fira Mono"', 'monospace'],
      },
      boxShadow: {
        rune: '0 0 20px rgba(163,201,168,0.25), 0 4px 24px rgba(0,0,0,0.5)',
      },
      backgroundImage: {
        'forest-grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}

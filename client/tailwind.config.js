// tailwind.config.js
import plugin from 'tailwindcss/plugin'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Roboto', ...defaultTheme.fontFamily.sans],
        outfit: ['Outfit', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#faf8ff',
          100: '#f3ecff',
          200: '#e9d5ff',
          300: '#d8b4ff',
          400: '#c084fc',
          500: '#a855f7', // purple-500 base
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
        },
      },
      boxShadow: {
        'soft-lg': '0 10px 30px rgba(14,30,80,0.12)',
      }
    }
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.bg-brand-gradient': {
          background: 'linear-gradient(90deg,#a855f7 0%, #9333ea 45%, #ec4899 100%)',
        },
        '.bg-brand-gradient-2': {
          background: 'linear-gradient(90deg,#d8b4ff 0%, #a855f7 50%, #ec4899 100%)',
        },
        '.text-gradient-purple': {
          background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        }
      })
    })
  ]
}

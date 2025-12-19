/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdedd3',
          200: '#f9d7a6',
          300: '#f5bb6e',
          400: '#f09535',
          500: '#ed7815',
          600: '#de5c0b',
          700: '#b8440c',
          800: '#923711',
          900: '#762f12',
          950: '#401507',
        },
        secondary: {
          50: '#f4f7fb',
          100: '#e9eff6',
          200: '#cddceb',
          300: '#a1c0da',
          400: '#6e9fc4',
          500: '#4c83ae',
          600: '#3a6992',
          700: '#305577',
          800: '#2b4963',
          900: '#283e54',
          950: '#1a2838',
        },
        dark: {
          50: '#f6f6f7',
          100: '#e1e3e6',
          200: '#c2c6cd',
          300: '#9ca2ad',
          400: '#777f8c',
          500: '#5c6471',
          600: '#494f5a',
          700: '#3d424a',
          800: '#34383f',
          900: '#2d3036',
          950: '#1a1c20',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'shimmer': 'shimmer 2s infinite',
        'pulse-soft': 'pulseSoft 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(237, 120, 21, 0.3)',
        'glow-lg': '0 0 40px rgba(237, 120, 21, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(237, 120, 21, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #1a1c20 0%, #2d3036 50%, #1a1c20 100%)',
      },
    },
  },
  plugins: [],
}


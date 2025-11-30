/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        music: {
          dark: '#1e1b4b',
          primary: '#4f46e5',
          accent: '#fbbf24',
          staff: '#334155'
        }
      },
      keyframes: {
        pop: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        pop: 'pop 0.3s ease-in-out',
        wiggle: 'wiggle 0.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
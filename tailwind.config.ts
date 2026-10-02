import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        solea: {
          terracota: '#7B4321',
          'terracota-dark': '#5E3218',
          marfim: '#FAF7F2',
          areia: '#F2ECE4',
          champagne: '#D4A373',
          charcoal: '#1E1B18',
          border: '#E8DFD5',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'solea-soft': '0 10px 30px -10px rgba(123, 67, 33, 0.08)',
        'solea-card': '0 8px 24px -6px rgba(30, 27, 24, 0.06)',
        'solea-drawer': '-10px 0 35px -5px rgba(30, 27, 24, 0.15)',
      }
    },
  },
  plugins: [],
} satisfies Config

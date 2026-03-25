import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#26A3AD',
          light: '#4EFFEF',
        },
        accent: '#E2B679',
        dark: '#2D3232',
      },
    },
  },
  plugins: [],
} satisfies Config

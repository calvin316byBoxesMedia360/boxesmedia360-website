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
        // Modo claro: tonos hueso/beige suaves en lugar de blanco puro
        paper: {
          DEFAULT: '#F3EEE5',
          soft: '#FAF7F1',
          deep: '#E9E1D3',
        },
      },
    },
  },
  plugins: [],
} satisfies Config

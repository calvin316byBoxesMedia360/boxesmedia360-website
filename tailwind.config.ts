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
          DEFAULT: '#E6DFD2',
          soft: '#EEE8DD',
          deep: '#D9CFBE',
        },
      },
    },
  },
  plugins: [],
} satisfies Config

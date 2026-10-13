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
        // Modo oscuro: azul navy (mismo tono del header)
        navy: {
          DEFAULT: '#111827',
          deep: '#0B1120',
          soft: '#1A2338',
        },
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

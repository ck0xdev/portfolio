import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',          // explicitly copies everything in /public → dist/
  build: {
    outDir: 'dist',
    emptyOutDir: true,          // always clean dist before building
  },
})


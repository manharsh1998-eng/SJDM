import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// We keep it simple; Vite 5 supports React fast refresh by default.
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three-vendor'
          if (id.includes('node_modules/react')) return 'react-vendor'
          return undefined
        },
      },
    },
  },
})

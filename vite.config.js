import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  // ← add this line (replace with your actual repo name)
  base: '/portfolio-site/',
  plugins: [react()],
})

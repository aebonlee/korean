import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync, existsSync } from 'fs'

const postBuildPlugin = () => ({
  name: 'post-build',
  closeBundle() {
    const distDir = resolve(__dirname, 'dist')
    try {
      const dest404 = resolve(distDir, '404.html')
      if (!existsSync(dest404)) {
        copyFileSync(resolve(distDir, 'index.html'), dest404)
        console.log('✅ 404.html copied from index.html')
      } else {
        console.log('✅ 404.html already exists (from public/), skipping copy')
      }
    } catch (e) {
      console.warn('⚠️ Could not copy 404.html:', e.message)
    }
    try {
      const cnameSrc = resolve(__dirname, 'CNAME')
      if (existsSync(cnameSrc)) {
        copyFileSync(cnameSrc, resolve(distDir, 'CNAME'))
        console.log('✅ CNAME copied to dist')
      }
    } catch (e) {
      console.warn('⚠️ Could not copy CNAME:', e.message)
    }
  }
})

export default defineConfig({
  plugins: [react(), postBuildPlugin()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})

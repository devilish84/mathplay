import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

const isSingle = process.env.BUILD_MODE === 'single'

export default defineConfig({
  plugins: isSingle ? [react(), viteSingleFile()] : [react()],
  base: isSingle ? './' : '/',
  build: {
    outDir: 'dist',
    ...(isSingle && {
      assetsInlineLimit: 100_000_000,
      cssCodeSplit: false,
    }),
  },
})

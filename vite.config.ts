import path from 'node:path'
import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react(), visualizer() as PluginOption],
  // development 환경에서는 base 경로를 사용하지 않음 (production에서만 base 경로 지정)
  base: process.env.NODE_ENV === 'development' ? undefined : '/Xflix--sw/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

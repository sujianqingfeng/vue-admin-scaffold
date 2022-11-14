import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@sujian/vue-admin-scaffold/style.scss': path.resolve(__dirname, '../src/style.scss'),
      '@sujian/vue-admin-scaffold': path.resolve(__dirname, '../src/index.ts')
    }
  },
  plugins: [vue(), vueJsx()],
  server: {
    proxy: {
      '/mock': {
        target: 'https://reqres.in/',
        ws: true,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/mock/, '')
      }
    }
  }
})

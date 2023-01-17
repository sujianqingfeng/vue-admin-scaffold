import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

const resolve = (...paths) => path.resolve(__dirname, '../packages/element-plus', ...paths)

export default defineConfig({
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      // '@sujian/vue-admin-scaffold/style.scss': resolve('style.scss'),
      // '@sujian/vue-admin-scaffold': resolve('index.ts'),
      // '@composables': resolve('composables/index.ts'),
      // '@config': resolve('config.ts')
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

import { build as viteBuild, InlineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

function resolveViteConfig(): InlineConfig {
  return {
    plugins: [vue(), vueJsx()],
    build: {
      lib: {
        entry: resolve(__dirname, '../src/index.ts'),
        name: 'vue-admin-scaffold',
        fileName: 'vue-admin-scaffold'
      },
      rollupOptions: {
        external: ['vue', '@sujian/utils'],
        output: {
          globals: {
            vue: 'Vue',
            '@sujian/utils': 'utils'
          }
        }
      }
    },
  }
}

export async function build() {
  await viteBuild(resolveViteConfig())
}

build()
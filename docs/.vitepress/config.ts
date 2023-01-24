import { resolve } from 'path'
import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { applyPlugins } from '../demo/plugins'

import { 
  scaffoldName,
  scaffoldDescription 
} from './meta'

const pkgResolve = (...paths) => resolve(__dirname, '../../packages', ...paths)

export default defineConfig({
  title: scaffoldName,
  description: scaffoldDescription,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Config', link: '/config/' },
    ],
    sidebar: {
      '/': [
        {
          text: 'Guide',
          items: [
            {
              text: 'basic',
              link: '/guide/basic'
            },
            {
              text: 'why',
              link: '/guide/why'
            }
          ]
        }
      ]
    }
  },
  markdown: {
    config(md) {
      applyPlugins(md)
    },
  },
  vite: {
    resolve: {
      alias: {
        'vue-admin-scaffold/element-plus/style.scss': pkgResolve('element-plus/src/style/scaffold.scss'),
        'vue-admin-scaffold/element-plus': pkgResolve('element-plus/index.ts'),
      }
    },
    plugins: [vueJsx()]
  }
})
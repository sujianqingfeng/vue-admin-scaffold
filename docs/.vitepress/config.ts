import { defineConfig } from 'vitepress'
import { applyPlugins } from '../demo/plugins'

import { 
  scaffoldName,
  scaffoldDescription 
} from './meta'

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
  }
})
import DefaultTheme from 'vitepress/theme'
import { Demo } from '../../demo'

export default {
  ...DefaultTheme,
  enhanceApp: ({ app }: any) => {
    app.component('Demo', Demo)
  },
}
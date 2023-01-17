import DefaultTheme from 'vitepress/theme'
// import 'vitepress-doc-plugin/style.css'
// import { Demo } from 'vitepress-doc-plugin'

export default {
  ...DefaultTheme,
  enhanceApp: ({ app }) => {
    // app.component('Demo', Demo)
  },
}
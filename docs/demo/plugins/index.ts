import  pluginDemoBlock from './demo-block'

export const applyPlugins = (md: any) => {
  md.use(pluginDemoBlock)
}
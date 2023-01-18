import { build as viteBuild, InlineConfig, LibraryOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

const ROOT_PATH = resolve(__dirname, '..')
const PKG_PATH = resolve(ROOT_PATH, 'packages')

const resolveBasePlugins = () => [vue(), vueJsx()]
const resolveRollupOptions = () => {
  return {
    external: ['vue', 'lodash-es'],
    output: {
      globals: {
        vue: 'Vue',
        'lodash-es': 'Lodash'
      }
    }
  }
}

const resolveConfig = (lib: LibraryOptions): InlineConfig => {
  return {
    plugins: resolveBasePlugins(),
    build: {
      emptyOutDir: false,
      lib,
      rollupOptions: resolveRollupOptions()
    }
  }
}

const resolveLib = (name: string): LibraryOptions => {
  return {
    entry: resolve(PKG_PATH, name, 'index.ts'),
    name,
    fileName: name
  }
}

const  buildElementPlus = async () => {
  const config = resolveConfig(resolveLib('element-plus'))
  await viteBuild(config)
}

const buildCore = async () => {
  const config = resolveConfig(resolveLib('core'))
  await viteBuild(config)
}

export const build = async () => {
  await buildCore()
  await buildElementPlus()
}

build()
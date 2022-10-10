import deepmerge from 'deepmerge'
import type { ScaffoldSchema } from './types'

const defaultConfig: ScaffoldSchema = {
  query: {
    layout: {
      span: 1
    },
    forms: []
  }
}

export const defineScaffoldConfig = (_config: ScaffoldSchema) => {
  config = deepmerge(defaultConfig, _config) 
}

export let config: ScaffoldSchema = defaultConfig
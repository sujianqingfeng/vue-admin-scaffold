import deepmerge from 'deepmerge'
import type { ScaffoldSchema } from './types'

export const defaultConfig: ScaffoldSchema = {
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
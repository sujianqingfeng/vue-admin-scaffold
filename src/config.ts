import deepmerge from 'deepmerge'
import type { ScaffoldSchema } from './props'
import { createElementUiRender } from './renders'

export const defaultConfig: Required<ScaffoldSchema> = {
  uiRender: createElementUiRender(),
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

export let config: Required<ScaffoldSchema> = defaultConfig
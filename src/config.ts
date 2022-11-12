import deepmerge from 'deepmerge'
import type { ScaffoldSchema } from './types'
import { createElementUiRender } from './renders'

export const defaultConfig: Required<ScaffoldSchema> = {
  uiRender: createElementUiRender(),
  query: {
    layout: {
      span: 1
    },
    forms: [],
    action: {
      hasReset: true,
      hasQuery: true,
      resetText: '重置',
      queryText: '查询',
      preventReset: false,
      resetAutoFetch: true,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onReset: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onQuery: () => {},
    }
  }
}

export const defineScaffoldConfig = (_config: ScaffoldSchema) => {
  config = deepmerge(defaultConfig, _config) 
}

export let config: Required<ScaffoldSchema> = defaultConfig
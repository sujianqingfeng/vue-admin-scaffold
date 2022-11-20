import deepmerge from 'deepmerge'
import type { ScaffoldSchema } from './types'
import { createElementUiRender } from './renders'

export const defineScaffoldSchema = <T extends ScaffoldSchema>(config: T): T => {
  return config
}

export const defaultConfig  = defineScaffoldSchema<Required<ScaffoldSchema>>({
  uiRender: createElementUiRender(),
  query: {
    layout: {
      span: 1,
      showLine: 100,
      labelWidth: '84px',
      formItemWidthMap: {
        1: [-8000, 800],
        2: [800, 1170],
        3: [1170, 1600],
        4: [1600, 8000]
      }
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
  },
  operate: {
    left: [],
    right: []
  },
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    hideOnSinglePage: false,
    pageSizes: [10, 20, 50, 100]
  },
  request: {
    auto: true,
    apiFn: () => Promise.resolve({ total: 0, list: [] }),
    transform: (val) => val,
    adapter: (val) => val,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onError: () => {}
  },
  table: {
    action: {
      fixed: 'right'
    },
    cols: []
  }
})

export const defineScaffoldConfig = (_config: ScaffoldSchema) => {
  config = deepmerge(defaultConfig, _config) 
}

export let config: Required<ScaffoldSchema> = defaultConfig
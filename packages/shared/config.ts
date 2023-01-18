import { merge } from 'lodash-es'
import type { DeepPartial, ScaffoldSchema, PartialScaffoldSchema  } from './types'

// export type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;

export const defineScaffoldSchema = (config: PartialScaffoldSchema) => {
  return config
}

export const defaultConfig: ScaffoldSchema  = {
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
    transform: (val: any) => val,
    adapter: (val: any) => val,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onError: () => {}
  },
  table: {
    action: {
      text: '操作',
      fixed: 'right',
      list: []
    },
    cols: []
  }
}

export const defineScaffoldConfig = (_config: DeepPartial<ScaffoldSchema>) => {
  config = merge(defaultConfig, _config) 
}

// export let config: DeepRequired<ScaffoldSchema> = defaultConfig
let config: ScaffoldSchema = defaultConfig

export const getConfig = () => config


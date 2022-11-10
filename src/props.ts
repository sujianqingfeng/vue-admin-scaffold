import type { PropType } from 'vue'
import { defaultConfig } from './config'
import { ScaffoldSchema } from './types'

export const props = {
  schema: {
    type: Object as PropType<ScaffoldSchema>,
    default: defaultConfig
  }
}
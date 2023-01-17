import type { PropType } from 'vue'
import { defaultConfig } from './config'
import { PartialScaffoldSchema } from './types'

export const props = {
  schema: {
    type: Object as PropType<PartialScaffoldSchema>,
    default: defaultConfig
  }
}
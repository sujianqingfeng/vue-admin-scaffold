import type { PropType } from 'vue'
import { defaultConfig } from './config'
import type { UiRender } from './renders/types'

type Value =  string | number | boolean | null

export interface Option {
  label: string,
  value?: Value
}

export interface ScaffoldQueryLayout {
  span?: number
}

type ScaffoldQueryCommonForm = {
  key: string
  label: string
  value?: string
} 

export type ScaffoldQuerySelectForm = ScaffoldQueryCommonForm & {
  type: 'select'
  options?: Option[] | (() => Promise<Option[]>)
}  

type ScaffoldQueryInputForm = ScaffoldQueryCommonForm  & {
  type: 'input'
}

export type ScaffoldQueryForm = ScaffoldQuerySelectForm | ScaffoldQueryInputForm

export type ScaffoldQueryFormTypes  = ScaffoldQueryForm['type'] 

export interface ScaffoldQuery {
  layout?: ScaffoldQueryLayout
  forms?: ScaffoldQueryForm[]
}

export interface ScaffoldSchema {
  uiRender?: UiRender
  query: ScaffoldQuery
}

export const props = {
  schema: {
    type: Object as PropType<ScaffoldSchema>,
    default: defaultConfig
  }
}
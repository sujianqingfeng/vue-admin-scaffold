import type { UiRender } from './renders/types'

type Value =  string | number | boolean | null

export interface Option {
  label: string,
  value?: Value
}

export type FormData<T = any> = Record<string, T> 

export interface ScaffoldQueryLayout {
  span?: number
}

type ScaffoldQueryCommonForm = {
  key: string
  label: string
  value?: string
} 

export type ScaffoldQuerySelectForm = ScaffoldQueryCommonForm & {
  __type__: 'select'
  when?: (formData: FormData, oldFormData: FormData) => boolean
  options?: Option[] | ((formData: FormData) => Promise<Option[]>)
}  

export type ScaffoldQueryInputForm = ScaffoldQueryCommonForm  & {
  __type__: 'input'
}

export type ScaffoldQueryForm = ScaffoldQuerySelectForm | ScaffoldQueryInputForm

export type ScaffoldQueryFormTypes  = ScaffoldQueryForm['__type__'] 

export interface ScaffoldQuery {
  layout?: ScaffoldQueryLayout
  forms?: ScaffoldQueryForm[]
}

export interface ScaffoldSchema {
  uiRender?: UiRender
  query: ScaffoldQuery
}
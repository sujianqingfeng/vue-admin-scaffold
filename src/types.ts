import type { UiRender } from './renders/types'

export type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

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
  label: string
  value?: any
  [index: string]: any
} 

export type ScaffoldQuerySelectForm = ScaffoldQueryCommonForm & {
  __type__: 'select'
  key: string
  autoFetch?: boolean
  options?: Option[] | ((formData: FormData) => Promise<Option[]>)
}  

export type ScaffoldQueryInputForm = ScaffoldQueryCommonForm  & {
  __type__: 'input'
  key: string
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

export type ScaffoldInstance = {
  fetchAsyncData: (keys: string[]) => void
}
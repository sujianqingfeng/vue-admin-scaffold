type Value =  string | number | boolean | null

export interface Option {
  label: string,
  value?: Value
}

export interface ScaffoldQueryLayout {
  span?: number
}

export type ScaffoldQuerySelectForm = {
  type: 'select'
  key: string
  value?: string
  options?: Option[] | (() => Promise<Option[]>)
}  

type ScaffoldQueryInputForm = {
  type: 'input'
  key:  string
  value?: string
}

export type ScaffoldQueryForm = ScaffoldQuerySelectForm | ScaffoldQueryInputForm

export type ScaffoldQueryFormTypes  = ScaffoldQueryForm['type'] 

export interface ScaffoldQuery {
  layout?: ScaffoldQueryLayout
  forms?: ScaffoldQueryForm[]
}

export interface ScaffoldSchema {
  query: ScaffoldQuery
}
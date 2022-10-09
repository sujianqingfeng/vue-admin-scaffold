export interface ScaffoldQueryLayout {
  span?: number
}

type ScaffoldQuerySelectForm = {
  type: 'select'
  key: string
  options: string
}  

type ScaffoldQueryInputForm = {
  type: 'input'
  key:  string
}

type ScaffoldQueryForm = ScaffoldQuerySelectForm | ScaffoldQueryInputForm

export interface ScaffoldQuery {
  layout?: ScaffoldQueryLayout
  forms?: ScaffoldQueryForm[]
}

export interface ScaffoldSchema {
  query?: ScaffoldQuery
}
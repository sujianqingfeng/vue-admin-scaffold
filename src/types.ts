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
export type RequiredScaffoldQueryLayout = Required<ScaffoldQueryLayout>

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

export type ScaffoldQueryActon = {
  hasReset?: boolean
  hasQuery?: boolean
  resetText?: string
  queryText?: string
  preventReset?: boolean
  resetAutoFetch?: boolean
  onReset?: () => void
  onQuery?: () => void
} 
export type RequiredScaffoldQueryAction = Required<ScaffoldQueryActon>

export interface ScaffoldQuery {
  layout?: ScaffoldQueryLayout
  forms?: ScaffoldQueryForm[]
  action?: ScaffoldQueryActon
}

export type DataSource = {
  list: unknown[]
  total: number
}

type Transform = (data: Pick<ScaffoldPagination, 'page' | 'pageSize'>) => any

export type ScaffoldRequest = {
  auto?: boolean
  apiFn: (data: any) => Promise<DataSource>
  transform?: Transform
  adapter?: (data: any) => DataSource 
  onSuccess?: (data: any, origialData: any) => void
  onError?: (err: Error) => void
}

export type ScaffoldPagination = {
  page: number
  pageSize: number
  pageSizes: number[]
  hideOnSinglePage: boolean
  total: number
}

type ScaffoldTableAction = {
  fixed: 'right' | '' 
}

type ScaffoldTableCol = {
  [key: string]: any
}

export type ScaffoldTable = {
  action?: ScaffoldTableAction
  cols: ScaffoldTableCol[]
}

export interface ScaffoldSchema {
  uiRender?: UiRender
  query: ScaffoldQuery
  request: ScaffoldRequest
  pagination?: ScaffoldPagination
  table: ScaffoldTable
}

export type ScaffoldInstance = {
  fetchAsyncData: (keys: string[]) => void
}
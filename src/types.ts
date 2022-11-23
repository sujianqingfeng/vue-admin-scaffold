import type { UiRender } from './renders/types'
import type { Ref } from 'vue'

export type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type Value =  string | number | boolean | null

export interface Option {
  label: string,
  value?: Value
}

// --- query ---

export type FormData<T = any> = Record<string, T> 

export type FormDataRef = Ref<Record<string, any>>
export type AsyncDataRef = Ref<Record<string, any>>

export type QueryContext = {
  asyncData: AsyncDataRef
  formData: FormDataRef
}

export type Custom<T = any> = {
  render?: (param: T) => JSX.Element
  slot?: string
}

export type FormItemWidthMap = Record<number, [number, number]>
export interface ScaffoldQueryLayout {
  span?: number
  showLine?: number
  labelWidth?: string
  formItemWidthMap?: FormItemWidthMap
}
export type RequiredScaffoldQueryLayout = Required<ScaffoldQueryLayout>

type ScaffoldQueryCommonForm = {
  label: string
  value?: any
  show?: (formData: FormData) => boolean
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

export type ScaffoldQueryCustomForm = Custom<QueryContext> & ScaffoldQueryCommonForm  & {
  __type__: 'custom'
  key: string
}

export type ScaffoldQueryAddExtraParamsForm = ScaffoldQueryCommonForm  & {
  __type__: 'add-extra-params'
  key: string
}

export type ScaffoldQueryForm = ScaffoldQuerySelectForm | ScaffoldQueryInputForm | ScaffoldQueryAddExtraParamsForm | ScaffoldQueryCustomForm 

export type ScaffoldQueryFormTypes  = ScaffoldQueryForm['__type__'] 
export type AsyncQueryFormTypes = Exclude<ScaffoldQueryFormTypes, 'input' | 'custom' | 'add-extra-params'>

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

// --- request ---

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
  onSuccess?: (data: any, originalData: any) => void
  onError?: (err: Error) => void
}

export type ScaffoldPagination = {
  page: number
  pageSize: number
  pageSizes: number[]
  hideOnSinglePage: boolean
  total: number
}

// --- table ---

type ScaffoldTableActionShow = {
  show?: () => boolean
}

export type ScaffoldTableActionTextBt = {
  __type__: 'text_bt'
  // TODO function
  text: string
  onClick: () => void
}

export type ScaffoldTableActionCustom = Custom & {
  __type__: 'custom'
}

export type ScaffoldTableActionConfirmTextBt = {
  __type__: 'confirm_text_bt'
  // TODO function
  text: string
  confirmText: string
  onConfirm: () => void
}

export type ScaffoldTableActionItem = ScaffoldTableActionTextBt | ScaffoldTableActionCustom | ScaffoldTableActionConfirmTextBt 

export type ScaffoldTableActionTypes = ScaffoldTableActionItem['__type__']

type ScaffoldTableAction = {
  text?: string
  fixed?: 'right' | ''
  list?: ScaffoldTableActionItem[] 
}

export type  ScaffoldTableColWithoutCustom = {
  [key: string]: any
}

export type ScaffoldTableCol = Custom & ScaffoldTableColWithoutCustom 

export type ScaffoldTable = {
  action?: ScaffoldTableAction
  cols: ScaffoldTableCol[]
}

// --- operate ---

export type ScaffoldOperateBtItem = {
  __type__: 'bt'
  text: string
  onClick: () => void
  [key: string]: any
}

export type ScaffoldOperateCustomItem = {
  __type__: 'custom'
} & Custom 

export type ScaffoldOperateConfirmBtItem = {
  __type__: 'confirm_bt'
  text: string
  confirmText: string
  onConfirm: () => void
  [key: string]: any
}

export type ScaffoldOperateItem = ScaffoldOperateBtItem | ScaffoldOperateCustomItem | ScaffoldOperateConfirmBtItem
export type ScaffoldOperateTypes = ScaffoldOperateItem['__type__']

export type ScaffoldOperate = {
  left?: ScaffoldOperateItem[]
  right?: ScaffoldOperateItem[]
}

// --- main ---
export interface ScaffoldSchema {
  uiRender?: UiRender
  query: ScaffoldQuery
  request: ScaffoldRequest
  pagination?: ScaffoldPagination
  table: ScaffoldTable
  operate?: ScaffoldOperate
}

export type ScaffoldInstance = {
  fetchAsyncData: (keys: string[]) => void
}

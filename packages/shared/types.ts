import type { Ref } from 'vue'
// import { InjectRequest, InjectTable } from '@composables'

export type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
// export type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;
export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

export type DeepRequired<T> = {
  [K in keyof T]: Required<DeepRequired<T[K]>>
}

export type ValueOf<T> = T[keyof T]

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
  render?: (param: T) => JSX.Element | JSX.Element[]
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
  key: string
  label: string
  value?: any
  span?: number
  show?: (formData: FormData) => boolean
  [index: string]: any
} 

export type ScaffoldQuerySelectForm = ScaffoldQueryCommonForm & {
  __type__: 'select'
  autoFetch?: boolean
  options?: Option[] | ((formData: FormData) => Promise<Option[]>)
}  

export type ScaffoldQueryInputForm = ScaffoldQueryCommonForm  & {
  __type__: 'input'
}

export type ScaffoldQueryCustomForm = Custom<QueryContext> & ScaffoldQueryCommonForm  & {
  __type__: 'custom'
}

export type ScaffoldQueryAddExtraParamsForm = ScaffoldQueryCommonForm  & {
  __type__: 'add-extra-params'
}

export type ScaffoldQueryForm = ScaffoldQuerySelectForm | ScaffoldQueryInputForm | ScaffoldQueryAddExtraParamsForm | ScaffoldQueryCustomForm 

export type ScaffoldQueryFormTypes  = ScaffoldQueryForm['__type__'] 
export type AsyncQueryFormTypes = Exclude<ScaffoldQueryFormTypes, 'input' | 'custom' | 'add-extra-params'>

export type ScaffoldQueryAction = {
  hasReset?: boolean
  hasQuery?: boolean
  resetText?: string
  queryText?: string
  preventReset?: boolean
  resetAutoFetch?: boolean
  onReset?: () => void
  onQuery?: () => void
} 
export type RequiredScaffoldQueryAction = Required<ScaffoldQueryAction>

export interface ScaffoldQuery {
  layout: ScaffoldQueryLayout
  forms: ScaffoldQueryForm[]
  action: ScaffoldQueryAction
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
  show?: (param: any) => boolean
}

export type ScaffoldTableActionText = string | ((param: any) => string)

export type ScaffoldTableActionTextBt =ScaffoldTableActionShow  & {
  __type__: 'text_bt'
  text: ScaffoldTableActionText  
  onClick: (param: any) => void
}

export type ScaffoldTableActionCustom = Custom & ScaffoldTableActionShow & {
  __type__: 'custom'
}

export type ScaffoldTableActionConfirmTextBt = ScaffoldTableActionShow &{
  __type__: 'confirm_text_bt'
  text: ScaffoldTableActionText  
  confirmText: string
  onConfirm: (param: any) => void
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

export type ScaffoldTableCol = Custom & ScaffoldTableColWithoutCustom  & {
  show?: (formData: FormData) => boolean
}

export type ScaffoldTable = {
  action?: ScaffoldTableAction
  cols: ScaffoldTableCol[]
}

// --- operate ---

export type OperateContext = {
  tableInstance: any
  formData: FormData
}

export type GetContentFn = () => OperateContext 
export type OperateShow = (formData: FormData ) => boolean

export type ScaffoldOperateBtItem = {
  __type__: 'bt'
  text: string
  show?: OperateShow
  onClick: (context: OperateContext ) => void
  [key: string]: any
}

export type ScaffoldOperateCustomItem = {
  __type__: 'custom'
  show?: OperateShow
} & Custom<OperateContext> 

export type ScaffoldOperateConfirmBtItem = {
  __type__: 'confirm_bt'
  text: string
  show?: OperateShow
  confirmText: string
  onConfirm: (context: OperateContext) => void
  [key: string]: any
}

export type ScaffoldOperateItem = ScaffoldOperateBtItem | ScaffoldOperateCustomItem | ScaffoldOperateConfirmBtItem
export type ScaffoldOperateTypes = ScaffoldOperateItem['__type__']

export type ScaffoldOperate = {
  left: ScaffoldOperateItem[]
  right: ScaffoldOperateItem[]
}

// ui render

export type ActionProps = {
  onClick: () => void
  class: string
}

export type RenderTableOption =Pick<InjectTable, 'tableRef'> &  Pick<InjectRequest, 'loading' | 'dataSource'>

// --- main ---
export interface ScaffoldSchema {
  query: ScaffoldQuery
  request: ScaffoldRequest
  pagination: ScaffoldPagination
  table: ScaffoldTable
  operate: ScaffoldOperate
}

export type PartialNoDeep<T> = { [P in keyof T]?: Partial<T[P]> }

export type PartialScaffoldSchema = PartialNoDeep<ScaffoldSchema> 

// export type ScaffoldInstance = {
//   fetchAsyncData: (keys: string[]) => void
// }

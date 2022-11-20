import type { ScaffoldOperateBtItem, ScaffoldOperateConfirmBtItem, ScaffoldOperateCustomItem, ScaffoldPagination, ScaffoldQueryInputForm, ScaffoldQuerySelectForm, ScaffoldTableCol } from 'src/types'
import type { ActionProps, Context } from '../components/query/types'
import type { RenderTableOption } from '../components/table/types'

export type UiRender = {
  renderQueryInput: (form: ScaffoldQueryInputForm, context: Context) => JSX.Element
  renderQuerySelect: (form: ScaffoldQuerySelectForm, context: Context) => JSX.Element
  renderQueryResetAction: (props: ActionProps, text: string) => JSX.Element
  renderQueryQueryAction: (props: ActionProps, text: string) => JSX.Element
  renderQueryMore: (isShowAll: boolean) => JSX.Element
  renderTable: (option: RenderTableOption, children: JSX.Element[]) => JSX.Element
  renderTableColumn: (col: ScaffoldTableCol) => JSX.Element
  renderOperateBt: (operate: ScaffoldOperateBtItem) => JSX.Element
  renderOperateConfirmBt: (operate: ScaffoldOperateConfirmBtItem) => JSX.Element
  renderOperateCustom: (operate: ScaffoldOperateCustomItem) => JSX.Element
  renderPagination: (pagination: ScaffoldPagination) => JSX.Element
}
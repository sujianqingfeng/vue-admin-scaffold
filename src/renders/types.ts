import type { QueryContext, ScaffoldOperateBtItem, ScaffoldOperateConfirmBtItem, ScaffoldPagination, ScaffoldQueryInputForm, ScaffoldQuerySelectForm, ScaffoldTableCol } from 'src/types'
import type { ActionProps } from '../components/query/types'
import type { RenderTableOption } from '../components/table/types'

export type UiRender = {
  renderQueryInput: (form: ScaffoldQueryInputForm, context: QueryContext) => JSX.Element
  renderQuerySelect: (form: ScaffoldQuerySelectForm, context: QueryContext) => JSX.Element
  renderQueryResetAction: (props: ActionProps, text: string) => JSX.Element
  renderQueryQueryAction: (props: ActionProps, text: string) => JSX.Element
  renderQueryMore: (isShowAll: boolean) => JSX.Element
  renderTable: (option: RenderTableOption, children: JSX.Element[]) => JSX.Element
  renderTableColumn: (col: ScaffoldTableCol) => JSX.Element
  renderOperateBt: (operate: ScaffoldOperateBtItem) => JSX.Element
  renderOperateConfirmBt: (operate: ScaffoldOperateConfirmBtItem) => JSX.Element
  renderPagination: (pagination: ScaffoldPagination) => JSX.Element
}
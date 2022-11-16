import type { ScaffoldQueryInputForm, ScaffoldQuerySelectForm, ScaffoldTableCol } from 'src/types'
import type { ActionProps, Context } from '../components/query/types'
import type { RenderTableOption } from '../components/table/types'

export type UiRender = {
  renderQueryInput: (form: ScaffoldQueryInputForm, context: Context) => JSX.Element
  renderQuerySelect: (form: ScaffoldQuerySelectForm, context: Context) => JSX.Element
  renderQueryResetAction: (props: ActionProps, text: string) => JSX.Element
  renderQueryQueryAction: (props: ActionProps, text: string) => JSX.Element
  renderTable: (option: RenderTableOption, children: JSX.Element[]) => JSX.Element
  renderTableColumn: (col: ScaffoldTableCol) => JSX.Element
}
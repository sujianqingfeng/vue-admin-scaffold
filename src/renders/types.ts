import type { ScaffoldQueryInputForm, ScaffoldQuerySelectForm } from 'src/types'
import type { ActionProps, Context } from '../components/query/types'

export type UiRender = {
  renderQueryInput: (form: ScaffoldQueryInputForm, context: Context) => JSX.Element
  renderQuerySelect: (form: ScaffoldQuerySelectForm, context: Context) => JSX.Element
  renderQueryResetAction: (props: ActionProps, text: string) => JSX.Element
  renderQueryQueryAction: (props: ActionProps, text: string) => JSX.Element
}
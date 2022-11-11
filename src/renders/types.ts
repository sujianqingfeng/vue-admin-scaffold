import type { ScaffoldQueryInputForm, ScaffoldQuerySelectForm } from 'src/types'
import type { Context } from '../components/query/types'

export type UiRender = {
  renderInput: (form: ScaffoldQueryInputForm, context: Context) => JSX.Element
  renderSelect: (form: ScaffoldQuerySelectForm, context: Context) => JSX.Element
}
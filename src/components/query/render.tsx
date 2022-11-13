import type { RequiredScaffoldQueryAction, ScaffoldQueryForm, ScaffoldQueryFormTypes, ScaffoldQueryInputForm, ScaffoldQuerySelectForm } from '../../types'
import { config } from '../../config'
import { ActionProps, Context } from './types'

const { uiRender } = config

const isInput = (form: ScaffoldQueryForm): form is ScaffoldQueryInputForm => form.__type__ === 'input'
const isSelect = (form: ScaffoldQueryForm): form is ScaffoldQuerySelectForm => form.__type__ === 'select'

const formTypeMap: Record<ScaffoldQueryFormTypes, (form: ScaffoldQueryForm, context: Context) => JSX.Element> = {
  input: (form: ScaffoldQueryForm, context: Context) => {
    if (isInput(form)) {
      return uiRender.renderQueryInput(form, context)
    }
    throw new Error('form type is not input')
  },
  select: (form: ScaffoldQueryForm, context: Context) => {
    if (isSelect(form)) {
      return uiRender.renderQuerySelect(form, context)
    }
    throw new Error('form type is not select')
  } 
}

export const renderFormItem = (form: ScaffoldQueryForm, context: Context) => {
  const { __type__ } = form
  const renderFn = formTypeMap[__type__]
  return renderFn(form, context)
}

export const renderReset = (action: RequiredScaffoldQueryAction) => {
  const { hasReset, onReset, resetText, preventReset, resetAutoFetch } = action
  if (hasReset) {
    const props: ActionProps = {
      class: 'reset-bt',
      onClick: () => {
        if (!preventReset) {
        // this.reset()
        }
        // 重置后是否自动查询
        if (resetAutoFetch) {
          // this._fetchList()
        }
        onReset()
      } 
    }
    return uiRender.renderQueryResetAction(props, resetText)
  }
}

export const renderQuery = (action: RequiredScaffoldQueryAction) => {
  const { hasQuery, queryText, onQuery  } = action
  if (hasQuery) {
    const props: ActionProps = {
      class: 'query-bt',
      onClick: () => {
        onQuery()
      } 
    }
    return uiRender.renderQueryQueryAction(props, queryText)
  }
}
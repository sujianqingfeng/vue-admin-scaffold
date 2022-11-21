import type { QueryContext, RequiredScaffoldQueryAction, ScaffoldQueryAddExtraParamsForm, ScaffoldQueryCustomForm, ScaffoldQueryForm, ScaffoldQueryFormTypes, ScaffoldQueryInputForm, ScaffoldQuerySelectForm } from '../../types'
import { config } from '../../config'
import type { ActionProps } from './types'
import RenderOrSlot from '../render-or-slot'

const { uiRender } = config

const isInput = (form: ScaffoldQueryForm): form is ScaffoldQueryInputForm => form.__type__ === 'input'
const isSelect = (form: ScaffoldQueryForm): form is ScaffoldQuerySelectForm => form.__type__ === 'select'
const isCustom = (form: ScaffoldQueryForm): form is ScaffoldQueryCustomForm => form.__type__ === 'custom'
export const isAddExtraParams = (form: ScaffoldQueryForm): form is ScaffoldQueryAddExtraParamsForm => form.__type__ === 'add-extra-params'

const formTypeMap: Record<Exclude<ScaffoldQueryFormTypes, 'add-extra-params'>, (form: ScaffoldQueryForm, context: QueryContext) => JSX.Element> = {
  input: (form: ScaffoldQueryForm, context: QueryContext) => {
    if (isInput(form)) {
      return uiRender.renderQueryInput(form, context)
    }
    throw new Error('form type is not input')
  },
  select: (form: ScaffoldQueryForm, context: QueryContext) => {
    if (isSelect(form)) {
      return uiRender.renderQuerySelect(form, context)
    }
    throw new Error('form type is not select')
  },
  custom: (form: ScaffoldQueryForm, context: QueryContext) => {
    if (isCustom(form)) {
      return <RenderOrSlot name='query-item-custom' option={form} param={context}></RenderOrSlot>
    }
    throw new Error('form type is not custom')
  }
}

export const renderFormItem = (form: Exclude<ScaffoldQueryForm, ScaffoldQueryAddExtraParamsForm>, context: QueryContext) => {
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

export const renderMore = (isShowAll: boolean) => {
  return uiRender.renderQueryMore(isShowAll)
}
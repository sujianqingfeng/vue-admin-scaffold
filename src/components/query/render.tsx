import type { ActionProps, QueryContext, RequiredScaffoldQueryAction, ScaffoldQueryAddExtraParamsForm,  ScaffoldQueryForm,  ScaffoldUiRender } from 'types'
import RenderOrSlot from '../render-or-slot'

export const isAddExtraParams = (form: ScaffoldQueryForm): form is ScaffoldQueryAddExtraParamsForm => form.__type__ === 'add-extra-params'

export const createFormRender = (uiRender: ScaffoldUiRender, context: QueryContext) => {

  const renderFormItem = (form: Exclude<ScaffoldQueryForm, ScaffoldQueryAddExtraParamsForm>) => {
    switch (form.__type__) {
      case 'input':
        return uiRender.renderQueryInput(form, context)
      case 'select':
        return uiRender.renderQuerySelect(form, context)
      case 'custom':
        return <RenderOrSlot name='query-item-custom' option={form} param={context}></RenderOrSlot>
    }
  }

  const renderReset = (action: RequiredScaffoldQueryAction) => {
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

  const renderQuery = (action: RequiredScaffoldQueryAction) => {
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

  const renderMore = (isShowAll: boolean) => {
    return uiRender.renderQueryMore(isShowAll)
  }

  return {
    renderFormItem,
    renderReset,
    renderQuery,
    renderMore 
  }
}


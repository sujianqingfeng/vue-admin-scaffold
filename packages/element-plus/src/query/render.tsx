import { ElButton, ElIcon, ElInput, ElOption, ElSelect } from 'element-plus'
import type { ActionProps, QueryContext, RequiredScaffoldQueryAction, ScaffoldQueryAddExtraParamsForm, ScaffoldQueryForm, ScaffoldQueryInputForm, ScaffoldQuerySelectForm } from 'shared/types'
import { createDefaultEvent, createWrapperEvent } from '../utils'
import RenderOrSlot from '../render-or-slot'
import { ArrowUp } from '@element-plus/icons-vue'
import { CSSProperties } from 'vue'

const renderQueryInput = (form: ScaffoldQueryInputForm, { formData }: QueryContext) => {
  const { key, label } = form 
  const on = createWrapperEvent(form, {
    onInput: createDefaultEvent(formData, key)
  })
  const placeholder = `请输入${label}` 
  return <ElInput placeholder={placeholder} modelValue={formData.value[key]} {...on}></ElInput>
} 

const renderQuerySelect = (form: ScaffoldQuerySelectForm, { formData, asyncData }: QueryContext) => {
  const { key, label } = form
  const on = createWrapperEvent(form, {
    onChange: createDefaultEvent(formData, key)
  })
  const placeholder = `请选择${label}` 
  return <ElSelect placeholder={placeholder} modelValue={formData.value[key]} {...on}>
    {asyncData.value[key]?.map((item: any) => <ElOption label={item.label} value={item.value}></ElOption>)}
  </ElSelect>
}

export const createFormItemRender = (context: QueryContext) => {
  const renderFormItem = (form: Exclude<ScaffoldQueryForm, ScaffoldQueryAddExtraParamsForm>) => {
    switch (form.__type__) {
      case 'input':
        return renderQueryInput(form, context)
      case 'select':
        return renderQuerySelect(form, context)
      case 'custom':
        return <RenderOrSlot name='query-item-custom' option={form} param={context}></RenderOrSlot>
    }
  }

  return {
    renderFormItem
  }
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
    return <ElButton {...props}>{resetText}</ElButton>
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
    return <ElButton type='primary' {...props}>{queryText}</ElButton>
  }
}

export const renderMore = (isShowAll: boolean) => {
  const text = isShowAll ? '收起' : '更多'
  const style: CSSProperties = {
    transform: isShowAll ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s'
  }
  return <div> {text} <ElIcon style={style}><ArrowUp/></ElIcon> </div>
}


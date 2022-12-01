import type { UiRender } from '../types'
import { ElInput, ElSelect, ElOption, ElButton, ElTable, ElTableColumn, ElPopconfirm, ElPagination, ElIcon, ElLoadingDirective } from 'element-plus'
import './style'
import type {  GetContentFn, QueryContext, ScaffoldOperateBtItem, ScaffoldOperateConfirmBtItem, ScaffoldPagination, ScaffoldQueryInputForm, ScaffoldQuerySelectForm, ScaffoldTableActionConfirmTextBt, ScaffoldTableActionText, ScaffoldTableActionTextBt, ScaffoldTableCol, ScaffoldTableColWithoutCustom } from '../../types'
import type { ActionProps } from '../../components/query/types'
import type { RenderTableOption } from '../../components/table/types'
import { createDefaultEvent, createWrapperEvent } from '../utils'
import { ArrowUp  } from '@element-plus/icons-vue'
import { CSSProperties, h, withDirectives } from 'vue'
import { isFunction } from 'lodash-es'

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

const renderQueryResetAction = (props: ActionProps, text: string) => {
  return <ElButton {...props}>{text}</ElButton>
}

const renderQueryQueryAction = (props: ActionProps, text: string) => {
  return <ElButton type='primary' {...props}>{text}</ElButton>
}

const renderQueryMore = (isShowAll: boolean) => {
  // TODO extract out
  const text = isShowAll ? '收起' : '更多'
  const style: CSSProperties = {
    transform: isShowAll ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s'
  }
  return <div> {text} <ElIcon style={style}><ArrowUp/></ElIcon> </div>
}

const renderTable = (option: RenderTableOption, children: JSX.Element[]) => {
  const { tableRef, dataSource, loading } = option

  const vNode = <ElTable ref={tableRef} data={dataSource.value.list}>
    {children}
  </ElTable>
  return withDirectives(vNode, [[ElLoadingDirective, loading.value]])
}

const renderTableColumn = (col: ScaffoldTableColWithoutCustom, render: ((param: any) => JSX.Element) | null) => {
  return <ElTableColumn {...col}>
    {{
      default: (param: any) => {
        if (!render) {
          return null
        } 
        return render(param)
      } 
    }}
  </ElTableColumn>
}

const getTableActionText = (text: ScaffoldTableActionText, param: any): string => {
  if (isFunction(text)) {
    return text(param)
  }
  return text
}

const renderTableConfirmTextBtAction = (item: ScaffoldTableActionConfirmTextBt, param: any) => {
  const { text, confirmText, onConfirm } = item

  return <ElPopconfirm title={confirmText} onConfirm={() => onConfirm(param)}>
    {{
      reference: () => <ElButton link>{getTableActionText(text, param)}</ElButton>,
    }}
  </ElPopconfirm>
}

const renderTableTextBtAction = (item: ScaffoldTableActionTextBt, param: any) => {
  const { text, onClick } = item
  return <ElButton link onClick={() => onClick(param)}>{getTableActionText(text, param)}</ElButton>
}

const renderOperateBt  = (item: ScaffoldOperateBtItem, contentFn: GetContentFn) => {
  const { text, onClick, ...rest } = item
  return <ElButton onClick={() => onClick(contentFn())} {...rest}>{text}</ElButton>
} 

const renderOperateConfirmBt = (item: ScaffoldOperateConfirmBtItem, contentFn: GetContentFn) => {
  const { text, confirmText, onConfirm } = item
  return <ElPopconfirm title={confirmText} onConfirm={() => onConfirm(contentFn())}>
    {{
      reference: () => <ElButton>{text}</ElButton>,
    }}
  </ElPopconfirm>
}

const renderPagination = (pagination: ScaffoldPagination) => {
  return <ElPagination {...pagination}></ElPagination>
}

export const createElementUiRender = (): UiRender => {
  return {
    renderQueryInput,
    renderQuerySelect,
    renderQueryResetAction,
    renderQueryQueryAction,
    renderQueryMore,
    renderTable,
    renderTableColumn,
    renderOperateBt,
    renderOperateConfirmBt,
    renderPagination,
    renderTableConfirmTextBtAction,
    renderTableTextBtAction
  } 
} 
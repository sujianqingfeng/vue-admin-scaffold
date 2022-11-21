import type { UiRender } from '../types'
import { ElInput, ElSelect, ElOption, ElButton, ElTable, ElTableColumn, ElPopconfirm, ElPagination } from 'element-plus'
import './style'
import type { QueryContext, ScaffoldOperateBtItem, ScaffoldOperateConfirmBtItem, ScaffoldPagination, ScaffoldQueryInputForm, ScaffoldQuerySelectForm, ScaffoldTableCol } from '../../types'
import type { ActionProps } from '../../components/query/types'
import type { RenderTableOption } from '../../components/table/types'
import { createDefaultEvent, createWrapperEvent } from '../utils'

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
  return <div> {text}</div>
}

const renderTable = (option: RenderTableOption, children: JSX.Element[]) => {
  const { tableRef, dataSource } = option
  return <ElTable ref={tableRef} data={dataSource.value.list}>
    {children}
  </ElTable>
}

const renderTableColumn = (col: ScaffoldTableCol) => {
  return <ElTableColumn {...col}></ElTableColumn>
}

const renderOperateBt  = (item: ScaffoldOperateBtItem) => {
  const { text, onClick } = item
  return <ElButton onClick={onClick}>{text}</ElButton>
} 

const renderOperateConfirmBt = (item: ScaffoldOperateConfirmBtItem) => {
  const { text, confirmText, onConfirm } = item
  return <ElPopconfirm title={confirmText} onConfirm={onConfirm}>
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
    renderTable,
    renderTableColumn,
    renderOperateBt,
    renderOperateConfirmBt,
    renderPagination,
    renderQueryMore
  } 
} 
import type { UiRender } from '../types'
import { ElInput, ElSelect, ElOption, ElButton, ElTable, ElTableColumn } from 'element-plus'
import './style'
import type { ScaffoldQueryInputForm, ScaffoldQuerySelectForm, ScaffoldTableCol } from '../../types'
import type { ActionProps, Context } from '../../components/query/types'
import type { RenderTableOption } from '../../components/table/types'
import { createDefaultEvent, createWrapperEvent } from '../utils'

const renderQueryInput = (form: ScaffoldQueryInputForm, { formData }: Context) => {
  const { key, label } = form 
  const on = createWrapperEvent(form, {
    onInput: createDefaultEvent(formData, key)
  })
  const placeholder = `请输入${label}` 
  return <ElInput placeholder={placeholder} modelValue={formData.value[key]} {...on}></ElInput>
} 

const renderQuerySelect = (form: ScaffoldQuerySelectForm, { formData, asyncData }: Context) => {
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

const renderTable = (option: RenderTableOption, children: JSX.Element[]) => {
  const { tableRef, dataSource } = option
  return <ElTable ref={tableRef} data={dataSource.value.list}>
    {children}
  </ElTable>
}

const renderTableColumn = (col: ScaffoldTableCol) => {
  return <ElTableColumn {...col}></ElTableColumn>
}

export const createElementUiRender = (): UiRender => {
  return {
    renderQueryInput,
    renderQuerySelect,
    renderQueryResetAction,
    renderQueryQueryAction,
    renderTable,
    renderTableColumn 
  } 
} 
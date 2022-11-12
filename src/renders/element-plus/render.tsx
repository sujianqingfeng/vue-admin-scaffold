import type { UiRender } from '../types'
import { ElInput, ElSelect, ElOption, ElButton } from 'element-plus'
import './style'
import type { ScaffoldQueryInputForm, ScaffoldQuerySelectForm } from '../../types'
import type { ActionProps, Context } from '../../components/query/types'
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

export const createElementUiRender = () => {
  return {
    renderQueryInput,
    renderQuerySelect,
    renderQueryResetAction,
    renderQueryQueryAction 
  } as UiRender
} 
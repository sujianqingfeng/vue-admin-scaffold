import type { UiRender } from '../types'
import { ElInput, ElSelect, ElOption } from 'element-plus'
import './style'
import type { ScaffoldQueryInputForm, ScaffoldQuerySelectForm } from '../../types'
import type { Context } from '../../components/query/types'
import { createDefaultEvent, createWrapperEvent } from '../utils'

const renderInput = (form: ScaffoldQueryInputForm, { formData }: Context) => {
  const { key } = form 
  const on = createWrapperEvent(form, {
    onInput: createDefaultEvent(formData, key)
  })
  return <ElInput modelValue={formData.value[key]} {...on}></ElInput>
} 

const renderSelect = (form: ScaffoldQuerySelectForm, { formData, asyncData }: Context) => {
  const { key } = form
  const on = createWrapperEvent(form, {
    onChange: createDefaultEvent(formData, key)
  })
  return <ElSelect modelValue={formData.value[key]} {...on}>
    {asyncData.value[key]?.map((item: any) => <ElOption label={item.label} value={item.value}></ElOption>)}
  </ElSelect>
} 

export const createElementUiRender = () => {
  return {
    renderInput,
    renderSelect
  } as UiRender
} 
import type { UiRender } from '../types'
import { ElInput, ElSelect, ElOption } from 'element-plus'
import './style'
import type { ScaffoldQueryInputForm, ScaffoldQuerySelectForm } from '../../types'
import type { Context } from '../../components/query/types'

const renderInput = (form: ScaffoldQueryInputForm, { formData }: Context) => {
  const { key } = form
  const onInput = (val: string) => {
    formData.value[key] = val
  }
  return <ElInput modelValue={formData.value[key]} onInput={onInput}></ElInput>
} 

const renderSelect = (form: ScaffoldQuerySelectForm, { formData, asyncData }: Context) => {
  const { key } = form
  const onChange = (val: any) => {
    formData.value[key] = val
  }
  return <ElSelect modelValue={formData.value[key]} onChange={onChange}>
    {asyncData.value[key]?.map((item: any) => <ElOption label={item.label} value={item.value}></ElOption>)}
  </ElSelect>
} 

export const createElementUiRender = () => {
  return {
    renderInput,
    renderSelect
  } as UiRender
} 
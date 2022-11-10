import type { UiRender } from '../types'
import { ElInput, ElSelect } from 'element-plus'

const renderInput = () => <ElInput>fff</ElInput>
const renderSelect = () => <ElSelect></ElSelect>

export const createElementUiRender = () => {
  return {
    renderInput,
    renderSelect
  } as UiRender
} 
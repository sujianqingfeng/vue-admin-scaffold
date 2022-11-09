import type { UiRender } from '../types'
import { ElInput } from 'element-plus'

const renderInput = () => <ElInput>fff</ElInput>

export const createElementUiRender = () => {
  return {
    renderInput
  } as UiRender
} 
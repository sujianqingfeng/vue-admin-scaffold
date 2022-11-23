import type { ScaffoldTableActionConfirmTextBt, ScaffoldTableActionCustom, ScaffoldTableActionItem, ScaffoldTableActionTextBt, ScaffoldTableActionTypes, ScaffoldTableCol } from '../../types'
import type { RenderTableOption } from './types'
import { config } from '../../config'
import RenderOrSlot from '../render-or-slot'
const { uiRender } = config

export const renderTable = (option: RenderTableOption, children: JSX.Element[]) => {
  return uiRender.renderTable(option, children)
}

export const renderTableColumn = (col: ScaffoldTableCol) => {
  const { render, slot, ...rest } = col

  return uiRender.renderTableColumn(rest)
}

const isBt = (item: ScaffoldTableActionItem): item is ScaffoldTableActionTextBt  => item.__type__ === 'text_bt'
const isCustom = (item: ScaffoldTableActionItem): item is ScaffoldTableActionCustom  => item.__type__ === 'custom'
const isConfirmBt = (item: ScaffoldTableActionItem): item is ScaffoldTableActionConfirmTextBt  => item.__type__ === 'confirm_text_bt'

const actionTypeMap: Record<ScaffoldTableActionTypes, (item: ScaffoldTableActionItem) => JSX.Element> = {
  text_bt: (item: ScaffoldTableActionItem) => {
    if (isBt(item)) {
      return uiRender.renderTableTextBtAction(item)
    }
    throw new Error('operate type is not bt')
  },
  confirm_text_bt: (item: ScaffoldTableActionItem) => {
    if (isConfirmBt(item)) {
      return uiRender.renderTableConfirmTextBtAction(item)
    }
    throw new Error('operate type is not custom')
  },
  custom: (item: ScaffoldTableActionItem) => {
    // TODO context
    if (isCustom(item)) {
      return <RenderOrSlot name='operate-custom-item' option={item}></RenderOrSlot> 
    }
    throw new Error('operate type is not custom')
  }
}

export const renderTableAction = (item: ScaffoldTableActionItem) => {
  const { __type__ } = item
  const fn = actionTypeMap[__type__]
  
  return fn(item)
}

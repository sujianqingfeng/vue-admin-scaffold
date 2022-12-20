import type { Custom, ScaffoldTableActionConfirmTextBt, ScaffoldTableActionCustom, ScaffoldTableActionItem, ScaffoldTableActionTextBt, ScaffoldTableActionTypes, ScaffoldTableCol } from 'types'
import type { RenderTableOption } from './types'
import { config } from '../../config'
import RenderOrSlot from '../render-or-slot'
const { uiRender } = config

export const renderTable = (option: RenderTableOption, children: JSX.Element[]) => {
  return uiRender.renderTable(option, children)
}

export const renderTableColumn = (col: ScaffoldTableCol) => {
  const { render, slot, ...rest } = col

  let paramRender = null

  if (render || slot) {
    const option: Custom = {
      render,
      slot
    }
    paramRender = (param: any) => <RenderOrSlot name='column-custom' param={param} option={option}></RenderOrSlot> 
  }

  return uiRender.renderTableColumn(rest, paramRender)
}

const isBt = (item: ScaffoldTableActionItem): item is ScaffoldTableActionTextBt  => item.__type__ === 'text_bt'
const isCustom = (item: ScaffoldTableActionItem): item is ScaffoldTableActionCustom  => item.__type__ === 'custom'
const isConfirmBt = (item: ScaffoldTableActionItem): item is ScaffoldTableActionConfirmTextBt  => item.__type__ === 'confirm_text_bt'

const actionTypeMap: Record<ScaffoldTableActionTypes, (item: ScaffoldTableActionItem, param: any) => JSX.Element> = {
  text_bt: (item: ScaffoldTableActionItem, param: any) => {
    if (isBt(item)) {
      return uiRender.renderTableTextBtAction(item, param)
    }
    throw new Error('operate type is not bt')
  },
  confirm_text_bt: (item: ScaffoldTableActionItem, param: any) => {
    if (isConfirmBt(item)) {
      return uiRender.renderTableConfirmTextBtAction(item, param)
    }
    throw new Error('operate type is not custom')
  },
  custom: (item: ScaffoldTableActionItem, param: any) => {
    // TODO context
    if (isCustom(item)) {
      return <RenderOrSlot name='operate-custom-item' option={item} param={param}></RenderOrSlot> 
    }
    throw new Error('operate type is not custom')
  }
}

export const renderTableAction = (item: ScaffoldTableActionItem, param: any) => {
  const { __type__ } = item
  const fn = actionTypeMap[__type__]
  
  return fn(item, param)
}

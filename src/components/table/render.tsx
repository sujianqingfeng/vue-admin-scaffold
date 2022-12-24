import type { Custom,  ScaffoldTableActionItem,  ScaffoldTableCol, ScaffoldUiRender } from 'types'
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

export const crateTableActionRender = (uiRender: ScaffoldUiRender, param: any) => {

  const render = (item: ScaffoldTableActionItem) => {
    switch (item.__type__) {
      case 'text_bt':
        return uiRender.renderTableTextBtAction(item, param)
      case 'confirm_text_bt':
        return uiRender.renderTableConfirmTextBtAction(item, param)
      case 'custom':
        return <RenderOrSlot name='operate-custom-item' option={item} param={param}></RenderOrSlot>
    }
  }

  return (item: ScaffoldTableActionItem) => {
    return render(item)
  }
}

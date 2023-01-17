import type { Custom,  RenderTableOption,  ScaffoldTableActionItem,  ScaffoldTableCol, ScaffoldUiRender } from 'types'
import RenderOrSlot from '../render-or-slot'

export const createTableRender = (uiRender: ScaffoldUiRender) => {
  const createTableActionRender = (param: any) => {
    return  (item: ScaffoldTableActionItem) => {
      switch (item.__type__) {
        case 'text_bt':
          return uiRender.renderTableTextBtAction(item, param)
        case 'confirm_text_bt':
          return uiRender.renderTableConfirmTextBtAction(item, param)
        case 'custom':
          return <RenderOrSlot name='operate-custom-item' option={item} param={param}></RenderOrSlot>
      }
    }
  } 

  const renderTable = (option: RenderTableOption, children: JSX.Element[]) => {
    return uiRender.renderTable(option, children)
  }

  const renderTableColumn = (col: ScaffoldTableCol) => {
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

  return {
    createTableActionRender,
    renderTable,
    renderTableColumn
  }
}
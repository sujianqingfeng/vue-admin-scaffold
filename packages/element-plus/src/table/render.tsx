import { ElButton, ElLoadingDirective, ElPopconfirm, ElTable, ElTableColumn, TableInstance } from 'element-plus'
import { isFunction } from 'lodash-es'
import { useScaffoldRequest, useScaffoldTable } from 'core'
import type { Custom,  ScaffoldTableActionConfirmTextBt,  ScaffoldTableActionItem,  ScaffoldTableActionText,  ScaffoldTableActionTextBt,  ScaffoldTableCol, ScaffoldTableColWithoutCustom, ScaffoldUiRender } from 'shared/types'
import { VNode, withDirectives } from 'vue'
import type { Ref } from 'vue'
import RenderOrSlot from '../render-or-slot'

const getTableActionText = (text: ScaffoldTableActionText, param: any): string => {
  if (isFunction(text)) {
    return text(param)
  }
  return text
}

const renderTableConfirmTextBtAction = (item: ScaffoldTableActionConfirmTextBt, param: any) => {
  const { text, confirmText, onConfirm } = item

  return <ElPopconfirm title={confirmText} onConfirm={() => onConfirm(param)}>
    {{
      reference: () => <ElButton link>{getTableActionText(text, param)}</ElButton>,
    }}
  </ElPopconfirm>
}

const renderTableTextBtAction = (item: ScaffoldTableActionTextBt, param: any) => {
  const { text, onClick } = item
  return <ElButton link onClick={() => onClick(param)}>{getTableActionText(text, param)}</ElButton>
}
export const createTableActionRender = (param: any) => {
  return  (item: ScaffoldTableActionItem) => {
    switch (item.__type__) {
      case 'text_bt':
        return renderTableTextBtAction(item, param)
      case 'confirm_text_bt':
        return renderTableConfirmTextBtAction(item, param)
      case 'custom':
        return <RenderOrSlot name='operate-custom-item' option={item} param={param}></RenderOrSlot>
    }
  }
} 

export const renderTable = (children: JSX.Element[], loading: boolean) => {
  const scaffoldTable = useScaffoldTable()
  const tableRef = scaffoldTable.tableRef as Ref<TableInstance> 

  const {  dataSource } = useScaffoldRequest()
  const vNode = <ElTable ref={tableRef} data={dataSource.value.list}>
    {children}
  </ElTable>

  return withDirectives(vNode as VNode, [[ElLoadingDirective, loading]])
}

export const renderTableColumn = (col: ScaffoldTableCol) => {
  const { render, slot,  ...rest } = col
  let paramRender: ((params: any) => JSX.Element) | null = null

  if (render || slot) {
    const option: Custom = {
      render,
      slot
    }
    paramRender = (param: any) => <RenderOrSlot name='column-custom' param={param} option={option}></RenderOrSlot> 
  }

  return <ElTableColumn {...rest as any}>
    {{
      default: (param: any) => {
        if (!paramRender) {
          return null
        } 
        return paramRender(param)
      } 
    }}
  </ElTableColumn>
}


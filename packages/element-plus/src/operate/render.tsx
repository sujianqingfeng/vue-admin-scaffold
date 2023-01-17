import { ElButton, ElPopconfirm } from 'element-plus'
import type { GetContentFn,  ScaffoldOperateBtItem,  ScaffoldOperateConfirmBtItem,  ScaffoldOperateItem } from 'shared/types'
import RenderOrSlot from '../render-or-slot'

const renderOperateBt  = (item: ScaffoldOperateBtItem, contentFn: GetContentFn) => {
  const { text, onClick, ...rest } = item
  return <ElButton onClick={() => onClick(contentFn())} {...rest}>{text}</ElButton>
} 

const renderOperateConfirmBt = (item: ScaffoldOperateConfirmBtItem, contentFn: GetContentFn) => {
  const { text, confirmText, onConfirm } = item
  return <ElPopconfirm title={confirmText} onConfirm={() => onConfirm(contentFn())}>
    {{
      reference: () => <ElButton>{text}</ElButton>,
    }}
  </ElPopconfirm>
}

export const createOperateItemRender = (contentFn: GetContentFn) => {

  const render = (item: ScaffoldOperateItem) => {
    switch (item.__type__) {
      case 'bt':
        return renderOperateBt(item, contentFn)
      case 'confirm_bt':
        return renderOperateConfirmBt(item, contentFn)
      case 'custom':
        return <RenderOrSlot name='operate-custom-item' option={item} param={contentFn} ></RenderOrSlot>
    }
  }
  
  return (item: ScaffoldOperateItem) => {
    return render(item)
  }
}
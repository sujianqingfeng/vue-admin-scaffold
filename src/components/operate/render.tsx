import type { GetContentFn,  ScaffoldOperateItem, ScaffoldUiRender } from 'types'
import RenderOrSlot from '../render-or-slot'

export const createOperateItemRender = (uiRender: ScaffoldUiRender, contentFn: GetContentFn) => {

  const render = (item: ScaffoldOperateItem) => {
    switch (item.__type__) {
      case 'bt':
        return uiRender.renderOperateBt(item, contentFn)
      case 'confirm_bt':
        return uiRender.renderOperateConfirmBt(item, contentFn)
      case 'custom':
        return <RenderOrSlot name='operate-custom-item' option={item} param={contentFn} ></RenderOrSlot>
    }
  }
  
  return (item: ScaffoldOperateItem) => {
    return render(item)
  }
}
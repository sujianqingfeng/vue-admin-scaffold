import type { GetContentFn,  ScaffoldOperateBtItem, ScaffoldOperateConfirmBtItem, ScaffoldOperateCustomItem, ScaffoldOperateItem, ScaffoldOperateTypes } from 'src/types'
import { config } from '../../config'
import RenderOrSlot from '../render-or-slot'

const { uiRender } = config

const isBt = (item: ScaffoldOperateItem): item is ScaffoldOperateBtItem => item.__type__ === 'bt'
const isCustom = (item: ScaffoldOperateItem): item is ScaffoldOperateCustomItem => item.__type__ === 'custom'
const isConfirmBt = (item: ScaffoldOperateItem): item is ScaffoldOperateConfirmBtItem => item.__type__ === 'confirm_bt'

const operateTypeMap: Record<ScaffoldOperateTypes, (item: ScaffoldOperateItem, contentFn: GetContentFn) => JSX.Element> = {
  bt: (item: ScaffoldOperateItem, contentFn: GetContentFn) => {
    if (isBt(item)) {
      return uiRender.renderOperateBt(item, contentFn)
    }
    throw new Error('operate type is not bt')
  },
  confirm_bt: (item: ScaffoldOperateItem, contentFn: GetContentFn) => {
    if (isConfirmBt(item)) {
      return uiRender.renderOperateConfirmBt(item, contentFn)
    }
    throw new Error('operate type is not custom')
  },
  custom: (item: ScaffoldOperateItem, contentFn: GetContentFn) => {
    // TODO context
    if (isCustom(item)) {
      return <RenderOrSlot name='operate-custom-item' option={item} param={contentFn} ></RenderOrSlot> 
    }
    throw new Error('operate type is not custom')
  }
}

export const renderOperateItem = (item: ScaffoldOperateItem, contentFn: GetContentFn) => {
  const { __type__ } = item
  const fn = operateTypeMap[__type__]
  return fn(item, contentFn)
}
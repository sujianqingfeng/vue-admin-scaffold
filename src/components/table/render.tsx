import type { ScaffoldTableCol } from '../../types'
import type { RenderTableOption } from './types'
import { config } from '../../config'
const { uiRender } = config

export const renderTable = (option: RenderTableOption, children: JSX.Element[]) => {
  return uiRender.renderTable(option, children)
}

export const renderTableColumn = (col: ScaffoldTableCol) => {
  return uiRender.renderTableColumn(col)
}

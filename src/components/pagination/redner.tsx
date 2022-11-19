import { ScaffoldPagination } from 'src/types'

import { config } from '../../config'

const { uiRender } = config

export const renderPagination = (pagination: ScaffoldPagination) => {
  return uiRender.renderPagination(pagination) 
}
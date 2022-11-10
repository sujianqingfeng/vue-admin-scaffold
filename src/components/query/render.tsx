import type { ScaffoldQueryForm, ScaffoldQueryFormTypes } from '../../types'
import { config } from '../../config'

const { uiRender } = config

const formTypeMap: Record<ScaffoldQueryFormTypes, () => JSX.Element> = {
  input: uiRender.renderInput,
  select: uiRender.renderSelect
}

export const renderFormItem = (form: ScaffoldQueryForm) => {
  const { __type__ } = form
  const renderFn = formTypeMap[__type__]
  return renderFn()
}
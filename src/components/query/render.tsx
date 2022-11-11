import type { ScaffoldQueryForm, ScaffoldQueryFormTypes } from '../../types'
import { config } from '../../config'
import { Context } from './types'

const { uiRender } = config

const formTypeMap: Record<ScaffoldQueryFormTypes, (form: ScaffoldQueryForm, context: Context) => JSX.Element> = {
  input: uiRender.renderInput,
  select: uiRender.renderSelect
}

export const renderFormItem = (form: ScaffoldQueryForm, context: Context) => {
  const { __type__ } = form
  const renderFn = formTypeMap[__type__]
  return renderFn(form, context)
}
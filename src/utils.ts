import { getConfig } from '@config'
import { isArray } from '@sujian/utils'
import { merge } from 'lodash-es'
import { ScaffoldSchema, ScaffoldSchemaKeys } from 'types'

export const generateKey = (key: string | string[]) => {
  return isArray(key) ? key.join('_') : key
}

export const resolveConfig = (defaultKey: ScaffoldSchemaKeys, options: ScaffoldSchema[ScaffoldSchemaKeys]) => {
  const config = getConfig() 
  return merge(config[defaultKey], options)  
}

import { getConfig } from '@config'
import { isArray } from '@sujian/utils'
import { merge } from 'lodash-es'
import { ScaffoldSchemaKeys } from 'types'

export const generateKey = (key: string | string[]) => {
  return isArray(key) ? key.join('_') : key
}

const resolveConfig = (defaultData: any) => {
  return <T>(defaultKey: ScaffoldSchemaKeys, options: T  ) => {
    return merge<Required<T>, T>(defaultData[defaultKey] as Required<T>, options)  
  }
}

const config = getConfig() 
export const resolveScaffoldConfig = resolveConfig(config) 
export const resolveScaffoldQueryConfig = resolveConfig(config.query)

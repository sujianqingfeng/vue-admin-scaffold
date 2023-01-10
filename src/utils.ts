import { getConfig } from '@config'
import { isArray, merge } from 'lodash-es'
import { ScaffoldQuery, ScaffoldSchema } from 'types'

export const generateKey = (key: string | string[]) => {
  return isArray(key) ? key.join('_') : key
}

const resolveConfig = <T>(defaultData: T) => {
  return <K extends keyof T>(defaultKey: K, options: T[K]): Required<T[K]> => {
    return merge<Required<T[K]>, T[K]>(defaultData[defaultKey] as Required<T[K]>, options) 
  }
}

const config = getConfig() 
export const resolveScaffoldConfig = resolveConfig<ScaffoldSchema>(config) 
export const resolveScaffoldQueryConfig = resolveConfig<ScaffoldQuery>(config.query)

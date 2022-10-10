import { isArray } from '@sujian/utils'

export const generateKey = (key: string | string[]) => {
  return isArray(key) ? key.join('_') : key
}
import { isFunction } from '@sujian/utils'
import type { Ref } from 'vue'
import type { FormData, ScaffoldQueryForm } from '../types'

type Event = (...rest: any[]) => any
type WrapperEvent = Record<string, Event>

export const createDefaultEvent = <T>(formData: Ref<FormData>, key: string) => {
  return (val: T) => {
    formData.value[key] = val
  }
}

export const createWrapperEvent = (form: ScaffoldQueryForm, wrapperEvent: WrapperEvent) => {
  const ret: WrapperEvent = {}

  Object.keys(form).forEach(key => {
    const isOn = key.startsWith('on')
    if (isOn) {
      ret[key] = form[key]
    }
  })

  Object.keys(wrapperEvent).forEach(key => {
    const originalFn = ret[key]

    ret[key] = (...rest: any) => {
      wrapperEvent[key](...rest)
      if (originalFn && isFunction(originalFn)) {
        originalFn(...rest)
      }
    }
  })

  return ret
}
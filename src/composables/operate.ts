import type { ScaffoldOperate } from 'src/types'
import { ref, provide, inject } from 'vue'
import type {  InjectionKey,  Ref } from 'vue'
import { config } from '../config'
import { merge } from 'lodash-es'

export type InjectOperate = Ref<ScaffoldOperate>

const OPERATE_KEY: InjectionKey<InjectOperate> = Symbol('pagination-key') 

export const useProvideScaffoldOperate = (_operate: ScaffoldOperate) => {

  const formatOperate = (operate: ScaffoldOperate) => {
    const  { operate: defaultOperate } = config
    return  merge(defaultOperate, operate)
  }

  const injectData = ref(formatOperate(_operate))

  provide(OPERATE_KEY, injectData)
  return injectData
}

export const useScaffoldOperate = () => inject(OPERATE_KEY)
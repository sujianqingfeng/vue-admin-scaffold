import type { ScaffoldOperate } from 'types'
import { ref, provide, inject } from 'vue'
import type { InjectionKey,  Ref } from 'vue'
import { resolveScaffoldConfig } from '../utils'

export type InjectOperate = Ref<ScaffoldOperate>

const OPERATE_KEY: InjectionKey<InjectOperate> = Symbol('pagination-key') 

export const useProvideScaffoldOperate = (_operate: ScaffoldOperate) => {

  const operateRaw = resolveScaffoldConfig('operate', _operate)
  const injectData = ref(operateRaw)

  provide(OPERATE_KEY, injectData)
  return injectData
}

export const useScaffoldOperate = () => inject(OPERATE_KEY)
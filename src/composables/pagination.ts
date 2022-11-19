import type { ScaffoldPagination } from 'src/types'
import type {  InjectionKey, Ref } from 'vue'
import { ref, provide, inject  } from 'vue'
import { config } from '../config'

export type InjectPagination = {
  pagination: Ref<ScaffoldPagination>
  resetPagination: () => void
} 

const PAGINATION_KEY: InjectionKey<InjectPagination> = Symbol('pagination-key') 

export const useProvideScaffoldPagination = (_pagination?: ScaffoldPagination) => {

  const formatPagination = (pagination?: ScaffoldPagination) => {
    const { pagination: defaultPagination } = config
    return { ...defaultPagination, ...pagination }
  }

  const pagination = ref(formatPagination(_pagination))

  const resetPagination = () => {
    const { pagination: defaultPagination } = config
    pagination.value = defaultPagination
  }

  const injectPagination: InjectPagination = {
    pagination,
    resetPagination  
  }

  provide(PAGINATION_KEY, injectPagination)
  return injectPagination
}

export const useScaffoldPagination = () => inject(PAGINATION_KEY)!
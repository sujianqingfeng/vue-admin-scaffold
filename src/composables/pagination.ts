import { getConfig } from '@config'
import { merge } from 'lodash-es'
import type { ScaffoldPagination } from 'types'
import type { InjectionKey, Ref } from 'vue'
import { ref, provide, inject } from 'vue'

export type InjectPagination = {
  pagination: Ref<Required<ScaffoldPagination>>
  resetPagination: () => void
} 

const resolvePaginationConfig = (pagination: ScaffoldPagination) => {
  const { pagination: defaultPagination } = getConfig() 
  return merge(defaultPagination, pagination)
}

const PAGINATION_KEY: InjectionKey<InjectPagination> = Symbol('pagination-key') 

export const useProvideScaffoldPagination = (_pagination: ScaffoldPagination) => {

  const pagination = ref(resolvePaginationConfig(_pagination))

  const resetPagination = () => {
    pagination.value = resolvePaginationConfig(_pagination) 
  }

  const injectPagination: InjectPagination = {
    pagination,
    resetPagination  
  }

  provide(PAGINATION_KEY, injectPagination)
  return injectPagination
}

export const useScaffoldPagination = () => inject(PAGINATION_KEY)!
import { ref, provide, inject } from 'vue'
import type { Ref, InjectionKey } from 'vue'
import type { DataSource, FormDataRef, ScaffoldRequest } from 'types'
import type { InjectPagination } from './pagination'
import { resolveScaffoldConfig } from '../utils'

export type InjectRequest = {
  fetchList: () => void,
  loading: Ref<boolean>,
  dataSource: Ref<DataSource>
}

const REQUEST_KEY = Symbol('request-key') as InjectionKey<InjectRequest> 

export const useProvideScaffoldRequest  = (_request: ScaffoldRequest, formData: FormDataRef, { pagination }: InjectPagination) => {

  const loading = ref(false)
  const dataSource  = ref<DataSource>({
    list: [],
    total: 0
  })
  
  const request = ref(resolveScaffoldConfig('request', _request) as Required<ScaffoldRequest>)

  const fetchList = () => {
    const { apiFn, adapter, transform, onSuccess, onError } = request.value

    loading.value = true
    const { page, pageSize } = pagination.value
    let data = { page, pageSize, ...formData.value }
    data = transform(data)
    apiFn(data).then(res => {
      const result = adapter(res)
      dataSource.value = result
      pagination.value.total  = result.total
      onSuccess(result, res)
    })
      .catch((err) => {
        onError(err)
      })
      .finally(() => {
        loading.value = false
      })
  }

  if (request.value.auto) {
    fetchList()
  }

  const injectData = {
    fetchList,
    loading,
    dataSource
  } as InjectRequest
  
  provide(REQUEST_KEY, injectData)
  return injectData
} 

export const useScaffoldRequest = () => inject(REQUEST_KEY)!
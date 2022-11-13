import deepmerge from 'deepmerge'
import { ref } from 'vue'
import type { DataSource, ScaffoldRequest } from 'src/types'
import { config } from '../config'
import type { InjectPagination } from './pagination'
import type { FormDataRef } from './query'

export const useProvideScaffoldRequest  = (_request: ScaffoldRequest, formData: FormDataRef, { pagination }: InjectPagination) => {

  const loading = ref(false)
  const dataSource  = ref<DataSource>({
    list: [],
    total: 0
  })

  const formatRequest = (request: ScaffoldRequest) => {
    const { request: defaultRequest } = config
    return deepmerge(defaultRequest, request)
  }
  const request = ref(formatRequest(_request))

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

  return {
    fetchList,
    loading,
    dataSource
  }
} 
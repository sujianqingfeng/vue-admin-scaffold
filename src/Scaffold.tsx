import { defineComponent } from 'vue'
import { props } from './props'

import { ScaffoldQuery, ScaffoldTable, ScaffoldOperate, ScaffoldPagination } from './components'

import {
  useProvideScaffoldQuery,
  useProvideScaffoldPagination, 
  useProvideScaffoldRequest,
  useProvideScaffoldTable,
  useProvideScaffoldOperate,
  useProvideScaffoldSlots,
  useProvideScaffoldUIRender
} from '@composables'

export default defineComponent({
  name: 'Scaffold',
  props,
  setup(props, { expose }) {
    const { formData, fetchAsyncData } = useProvideScaffoldQuery(props.schema.query)
    const pagination = useProvideScaffoldPagination(props.schema.pagination)
    
    useProvideScaffoldOperate(props.schema.operate || {})

    useProvideScaffoldRequest(props.schema.request || {}, formData, pagination)
    useProvideScaffoldTable(props.schema.table || {})
    useProvideScaffoldSlots()
    useProvideScaffoldUIRender()

    expose({
      formData,
      fetchAsyncData 
    })

    return () => <div class='scaffold-container'>
      <ScaffoldQuery></ScaffoldQuery>
      <ScaffoldOperate></ScaffoldOperate>
      <ScaffoldTable></ScaffoldTable>
      <ScaffoldPagination></ScaffoldPagination>
    </div>
  }
}) 

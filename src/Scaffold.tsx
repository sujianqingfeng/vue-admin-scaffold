import { defineComponent } from 'vue'
import { props } from './props'

import { ScaffoldQuery, ScaffoldTable, ScaffoldOperate, ScaffoldPagination } from './components'

import {
  useProvideScaffoldQuery,
  useProvideScaffoldPagination, 
  useProvideScaffoldRequest,
  useProvideScaffoldTable,
  useProvideScaffoldOperate,
  useProvideScaffoldSlots
} from './composables'

export default defineComponent({
  name: 'Scaffold',
  props,
  setup(props) {
    const { formData, fetchAsyncData } = useProvideScaffoldQuery(props.schema.query)
    const pagination = useProvideScaffoldPagination(props.schema.pagination)
    
    useProvideScaffoldOperate(props.schema.operate || {})

    useProvideScaffoldRequest(props.schema.request || {}, formData, pagination)
    useProvideScaffoldTable(props.schema.table || {})
    useProvideScaffoldSlots()

    return {
      formData,
      fetchAsyncData 
    }
  },
  render() {
    return <div class='scaffold-container'>
      {JSON.stringify(this.formData)}
      <ScaffoldQuery></ScaffoldQuery>
      <ScaffoldOperate></ScaffoldOperate>
      <ScaffoldTable></ScaffoldTable>
      <ScaffoldPagination></ScaffoldPagination>
    </div>
  }
}) 

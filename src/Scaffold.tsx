import { defineComponent } from 'vue'
import { props } from './props'

import { ScaffoldQuery, ScaffoldTable } from './components'

import {
  useProvideScaffoldQuery,
  useProvideScaffoldPagination, 
  useProvideScaffoldRequest,
  useProvideScaffoldTable 
} from './composables'

export default defineComponent({
  name: 'Scaffold',
  props,
  setup(props) {
    const { formData, fetchAsyncData } = useProvideScaffoldQuery(props.schema.query)
    const pagination = useProvideScaffoldPagination(props.schema.pagination)

    useProvideScaffoldRequest(props.schema.request || {}, formData, pagination)
    useProvideScaffoldTable(props.schema.table || {})

    return {
      formData,
      fetchAsyncData 
    }
  },
  render() {
    return <div class='scaffold-container'>
      {JSON.stringify(this.formData)}
      <ScaffoldQuery></ScaffoldQuery>
      <ScaffoldTable></ScaffoldTable>
    </div>
  }
}) 

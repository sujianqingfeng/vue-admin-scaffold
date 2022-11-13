import { defineComponent } from 'vue'
import { useProvideScaffoldQuery } from './composables/query'
import { props } from './props'

import ScaffoldQuery from './components/query'
import { useProvideScaffoldPagination } from './composables/pagination'
import { useProvideScaffoldRequest } from './composables/request'

export default defineComponent({
  name: 'Scaffold',
  props,
  setup(props) {
    const { formData, fetchAsyncData } = useProvideScaffoldQuery(props.schema.query)

    const pagination = useProvideScaffoldPagination(props.schema.pagination)

    useProvideScaffoldRequest(props.schema.request, formData, pagination)
    return {
      formData,
      fetchAsyncData 
    }
  },
  render() {
    return <div class='scaffold-container'>
      {JSON.stringify(this.formData)}
      <ScaffoldQuery></ScaffoldQuery>
    </div>
  }
}) 

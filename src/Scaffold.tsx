import { defineComponent } from 'vue'
import { useProvideScaffoldQuery } from './composables/query'
import { props } from './props'

import ScaffoldQuery from './components/query'

export default defineComponent({
  name: 'Scaffold',
  props,
  setup(props) {
    const { formData, fetchAsyncData } = useProvideScaffoldQuery(props.schema.query)
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

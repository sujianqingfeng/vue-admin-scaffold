import { defineComponent } from 'vue'
import { useProvideScaffoldQuery } from './composables/query'
import { props } from './props'

import ScaffoldQuery from './components/query'

export default defineComponent({
  name: 'Scaffold',
  props,
  setup(props) {
    const { formData } = useProvideScaffoldQuery(props.schema.query)

    return () => <div class='scaffold-container'>
      {JSON.stringify(formData.value)}
      <ScaffoldQuery></ScaffoldQuery>
    </div> 
  }
}) 

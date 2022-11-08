import { defineComponent } from 'vue'
import { useProvideScaffoldQuery } from './composables/query'
import { props } from './props'

import ScaffoldQuery from './components/query'

export default defineComponent({
  name: 'Scaffold',
  props,
  setup(props) {
    useProvideScaffoldQuery(props.schema.query)

    return () => <>
      <ScaffoldQuery></ScaffoldQuery>
    </>
  }
}) 
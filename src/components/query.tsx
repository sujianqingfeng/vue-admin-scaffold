import { useScaffoldQuery } from '../composables/query'
import { defineComponent } from 'vue'
import createDebug from 'debug'

const debug  = createDebug('scaffold:components:query')

export default defineComponent({
  name: 'ScaffoldQuery',
  setup() {
    const { layout } = useScaffoldQuery()
    debug('layout', layout)

    return () => <>
    query
    </>
  }
})
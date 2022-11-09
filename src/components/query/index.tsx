import { useScaffoldQuery } from '../../composables/query'
import { defineComponent } from 'vue'
import createDebug from 'debug'
import { config } from '../../config'

const debug  = createDebug('scaffold:components:query')

const { uiRender } = config

export default defineComponent({
  name: 'ScaffoldQuery',
  setup() {
    const { layout, forms } = useScaffoldQuery()
    debug('layout', layout)

    const renderRows = () => forms.map(form => {
      const { label } = form
      return <div>
        <div>{label}</div>
      </div>
    })

    return () => <div class='scaffold-query-container'>
      <div class='main-container'>
        <div class="forms">
          <div class="row">
            {renderRows()}
          </div>
        </div>
        <div class="actions">
          action
        </div>
      </div>
      <div class="more-container">
        more
      </div>
    </div>
  }
})
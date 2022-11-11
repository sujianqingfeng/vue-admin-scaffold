import { useScaffoldQuery } from '../../composables/query'
import { defineComponent } from 'vue'
import createDebug from 'debug'
import { renderFormItem  } from './render'

const debug  = createDebug('scaffold:components:query')

export default defineComponent({
  name: 'ScaffoldQuery',
  setup() {
    const { layout, forms, asyncData, formData, } = useScaffoldQuery()
    debug('layout', layout)

    const renderRows = () => forms.map(form => {
      const { label } = form
      return <div>
        <div class='label'>{label}</div>
        <div class='form-item'>
          {renderFormItem(form, { asyncData, formData })}
        </div>
      </div>
    })

    return () => <div class='scaffold-query-container'>
      <div class='main-container'>
        <div class="forms">
          <div class="row">
            {renderRows()}
            { JSON.stringify(asyncData.value) }
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
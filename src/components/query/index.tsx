import { useScaffoldQuery } from '../../composables/query'
import { defineComponent } from 'vue'
import createDebug from 'debug'
import { renderFormItem, renderQuery, renderReset  } from './render'

const debug  = createDebug('scaffold:components:query')

export default defineComponent({
  name: 'ScaffoldQuery',
  setup() {
    const { layout, forms, asyncData, formData, action } = useScaffoldQuery()
    debug('layout', layout)

    const renderCols = () => forms.map(form => {
      const { label } = form
      return <div class='col'>
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
            {renderCols()}
            { JSON.stringify(asyncData.value) }
          </div>
        </div>
        <div class="actions">
          {renderReset(action.value)}
          {renderQuery(action.value)}
        </div>
      </div>
      <div class="more-container">
        more
      </div>
    </div>
  }
})
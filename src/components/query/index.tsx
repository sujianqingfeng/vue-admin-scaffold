import { useScaffoldQuery } from '../../composables/query'
import { computed, defineComponent, ref } from 'vue'
import createDebug from 'debug'
import { renderFormItem, renderQuery, renderReset, isAddExtraParams, renderMore  } from './render'
import { useSize } from './size'
import type { ScaffoldQueryAddExtraParamsForm, ScaffoldQueryForm } from 'src/types'

const debug  = createDebug('scaffold:components:query')

export default defineComponent({
  name: 'ScaffoldQuery',
  setup() {
    const { layout, forms, asyncData, formData, action } = useScaffoldQuery()
    const { formRef, showCount } = useSize(layout)

    const isShowAll = ref(false)
    const isShowMore = computed(() => {
      return showCount.value < forms.length
    })
    
    const visibleForms = computed(() => {
      return forms
        .filter((form) => !isAddExtraParams(form))
        .filter((form) => {
          const { show = () => true } = form
          return show(formData.value)
        }) as Exclude<ScaffoldQueryForm, ScaffoldQueryAddExtraParamsForm>[]
    })

    const filterForms  = computed(() => {
      const forms = visibleForms.value
      if (isShowAll.value) {
        return forms
      }
      if (isShowMore.value) {
        return forms.slice(0, showCount.value)
      }
      return forms
    })

    const toggle = () => {
      isShowAll.value = !isShowAll.value
    }

    const renderCols = () => filterForms.value.map(form => {
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
        <div ref={formRef} class="forms">
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
        <div class='more' onClick={toggle}>
          {renderMore(isShowAll.value)}
        </div>
      </div>
    </div>
  }
})
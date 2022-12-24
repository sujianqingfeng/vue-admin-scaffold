import { useScaffoldQuery } from '@composables'
import { computed, defineComponent, ref } from 'vue'
import { renderFormItem, renderQuery, renderReset, isAddExtraParams, renderMore  } from './render'
import { useSize } from './size'
import type { ScaffoldQueryAddExtraParamsForm, ScaffoldQueryForm } from 'types'

export default defineComponent({
  name: 'ScaffoldQuery',
  setup() {
    const { layout, forms, asyncData, formData, action } = useScaffoldQuery()
    const { formRef, showCount, getColStyle } = useSize(layout)

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

    const toggle: any = () => {
      isShowAll.value = !isShowAll.value
    }

    const renderCols = () => filterForms.value.map(form => {
      const { label, span } = form
      return <div class='col' style={getColStyle(span!)}>
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
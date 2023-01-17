import { useScaffoldPagination, useScaffoldUIRender } from '@composables'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Pagination',
  setup() {
    const { pagination } = useScaffoldPagination()
    const uiRender = useScaffoldUIRender()

    return () => <div class='pagination-container'>
      { uiRender.renderPagination(pagination.value)}
    </div>
  },
})
import { useScaffoldPagination } from '@composables'
import { defineComponent } from 'vue'
import { renderPagination } from './render'

export default defineComponent({
  name: 'Pagination',
  setup() {
    const { pagination } = useScaffoldPagination()

    return () => <div class='pagination-container'>
      {renderPagination(pagination.value)}
    </div>
  },
})
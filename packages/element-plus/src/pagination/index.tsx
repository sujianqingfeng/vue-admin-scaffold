import { useScaffoldPagination } from 'core'
import { ElPagination } from 'element-plus'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Pagination',
  setup() {
    const { pagination } = useScaffoldPagination()

    return () => <div class='pagination-container'>
      <ElPagination {...pagination.value}></ElPagination>
    </div>
  },
})
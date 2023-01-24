import { useScaffoldPagination, useScaffoldRequest } from 'core'
import { ElPagination } from 'element-plus'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Pagination',
  setup() {
    const { pagination } = useScaffoldPagination()
    const { fetchList } = useScaffoldRequest()

    const onCurrentChange = (page: number) => {
      pagination.value.page = page
      fetchList()
    }
    const onSizeChange = (size: number) => {
      pagination.value.pageSize = size
      fetchList()
    }

    return () => <div class='pagination-container'>
      <ElPagination {...pagination.value} onSizeChange={onSizeChange} onCurrentChange={onCurrentChange}></ElPagination>
    </div>
  },
})
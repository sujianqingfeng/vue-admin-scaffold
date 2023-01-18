import { defineComponent } from 'vue'
import Query from './query'
import Operate from './operate'
import Table from './table'
import Pagination from './pagination'

export default defineComponent({
  setup() {
    return () => <div class="scaffold-container">
      <Query />
      <Operate/>
      <Table />
      <Pagination/>
    </div>
  }
})
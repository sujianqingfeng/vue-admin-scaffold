import { defineComponent } from 'vue'
import { useScaffoldTable } from '../../composables/table'
import { useScaffoldRequest } from '../../composables/request'
import { renderTable, renderTableColumn  } from './render'
import type { ScaffoldTableCol } from '../../types'

export default defineComponent({
  
  setup() {
    const { table, tableRef } = useScaffoldTable()
    const { loading, dataSource } = useScaffoldRequest()
    const renderCols = (cols: ScaffoldTableCol[]) => {
      const list = cols
        .map((col) => {
          return renderTableColumn(col) 
        })

      return list 
    } 

    const columns = renderCols(table.value.cols)
    const option = { tableRef, loading, dataSource }

    return () => <div class='table-container'>
      table
      {renderTable(option, columns)}
    </div>
  }
})
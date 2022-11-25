import { defineComponent } from 'vue'
import { useScaffoldTable } from '../../composables/table'
import { useScaffoldRequest } from '../../composables/request'
import { renderTable, renderTableAction, renderTableColumn  } from './render'
import type { ScaffoldTableActionItem, ScaffoldTableCol } from '../../types'

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

    const renderActions = (actions: ScaffoldTableActionItem[], param: any) => {
      const list = actions
        .map(action => {
          return renderTableAction(action, param)
        })
      return list
    }

    const columns = renderCols(table.value.cols)

    // actions
    if (table.value.action && table.value.action.list && table.value.action.list.length) {
      const { text } = table.value.action
      const createActionRender = (param: any) => renderActions(table.value.action!.list!, param)
      const col = renderTableColumn({ label: text, render: createActionRender })
      columns.push(col)
    }
    const option = { tableRef, loading, dataSource }

    return () => <div class='table-container'>
      {renderTable(option, columns)}
    </div>
  }
})
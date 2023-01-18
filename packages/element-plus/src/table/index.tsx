import { defineComponent, ref, VNode, watchEffect } from 'vue'
import type { ScaffoldTableActionItem, ScaffoldTableCol } from 'shared/types'
import { isFunction } from 'lodash-es'
import { useScaffoldQuery, useScaffoldRequest, useScaffoldTable } from 'core'
import { createTableActionRender, renderTable, renderTableColumn } from './render'

export default defineComponent({
  
  setup() {
    const { table, tableRef } = useScaffoldTable()
    const { loading, dataSource } = useScaffoldRequest()
    const { formData } = useScaffoldQuery()

    const columnVNodes = ref<VNode[]>([])

    const filterCol = (col: ScaffoldTableCol) => {
      const { show } = col
      if (!isFunction(show)) {
        return true
      }
      return show(formData.value)
    }

    const renderCols = (cols: ScaffoldTableCol[]) => {
      return cols
        .filter(filterCol)
        .map(renderTableColumn)
    } 

    const createFilterAction = (param: any) => {
      return (action: ScaffoldTableActionItem) => {
        const { show } = action
        if (!isFunction(show)) {
          return true
        }
        return show(param) 
      }
    }

    const renderActions = (actions: ScaffoldTableActionItem[], param: any) => {
      return actions
        .filter(createFilterAction(param))
        .map(createTableActionRender(param))
    }

    watchEffect(() => {
      columnVNodes.value = renderCols(table.value.cols)
      // actions
      if (table.value.action && table.value.action.list && table.value.action.list.length) {
        const { text } = table.value.action
        const createActionRender = (param: any) => renderActions(table.value.action!.list!, param)
        const col = renderTableColumn({ label: text, render: createActionRender })
        columnVNodes.value.push(col)
      }
    })
    
    const option = { tableRef, loading, dataSource }

    return () => <div class='table-container'>
      {renderTable(option, columnVNodes.value)}
    </div>
  }
})
import { defineComponent } from 'vue'
import { renderOperateItem } from './render'
import type { OperateContext } from 'src/types'
import { useScaffoldTable, useScaffoldOperate, useScaffoldQuery  } from '../../composables'

export default defineComponent({
  name: 'Operate',
  setup() {
    const operate = useScaffoldOperate()
    const { tableRef } = useScaffoldTable()
    const { formData } = useScaffoldQuery()

    const createOperateContent = (): OperateContext => {
      return {
        tableInstance: tableRef.value,
        formData: formData.value
      }
    }

    let left: JSX.Element[] = []
    if (operate?.value.left) {
      const nodes = operate.value.left.map((item) => renderOperateItem(item, createOperateContent))
      left = left.concat(nodes)
    }
  
    return () => <div class='operate-container'>
      <div class="operate-left-container">
        {left}
      </div>
    </div>
  }
})
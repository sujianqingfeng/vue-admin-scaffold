import {  defineComponent, ref, watchEffect } from 'vue'
import { renderOperateItem } from './render'
import type { OperateContext, ScaffoldOperateItem } from 'src/types'
import { useScaffoldTable, useScaffoldOperate, useScaffoldQuery  } from '../../composables'

export default defineComponent({
  name: 'Operate',
  setup() {
    const operate = useScaffoldOperate()
    const { tableRef } = useScaffoldTable()
    const { formData } = useScaffoldQuery()

    const filterOperate = (item: ScaffoldOperateItem) => {
      const { show } = item
      if (!show) {
        return true
      }
      return show(formData.value)
    }

    const createOperateContent = (): OperateContext => {
      return {
        tableInstance: tableRef.value,
        formData: formData.value
      }
    }

    const leftNodes  = ref<JSX.Element[]>([])

    watchEffect(() => {
      leftNodes .value = operate!.value.left!
        .filter(filterOperate)
        .map((item) => renderOperateItem(item, createOperateContent))
    })
  
    return () => <div class='operate-container'>
      <div class="operate-left-container">
        {leftNodes.value}
      </div>
    </div>
  }
})
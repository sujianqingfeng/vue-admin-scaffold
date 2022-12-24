import {  defineComponent, ref, watchEffect } from 'vue'
import { createOperateItemRender } from './render'
import type { OperateContext, ScaffoldOperateItem } from 'types'
import { useScaffoldTable, useScaffoldOperate, useScaffoldQuery, useScaffoldUIRender  } from '@composables'

export default defineComponent({
  name: 'Operate',
  setup() {
    const operate = useScaffoldOperate()
    const { tableRef } = useScaffoldTable()
    const { formData } = useScaffoldQuery()
    const uiRender = useScaffoldUIRender()

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

    const renderOperateItem = createOperateItemRender(uiRender, createOperateContent)

    const leftNodes  = ref<JSX.Element[]>([])
    const rightNodes  = ref<JSX.Element[]>([])

    watchEffect(() => {
      leftNodes.value = operate!.value.left!
        .filter(filterOperate)
        .map(renderOperateItem)
    })

    watchEffect(() => {
      rightNodes.value = operate!.value.right!
        .filter(filterOperate)
        .map(renderOperateItem)
    })
  
    return () => <div class='operate-container'>
      <div class="operate-left-container">
        {leftNodes.value}
      </div>
      <div class="operate-right-container">
        {rightNodes.value}
      </div>
    </div>
  }
})
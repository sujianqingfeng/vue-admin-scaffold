import { useScaffoldOperate } from '../../composables/operate'
import { defineComponent } from 'vue'
import { renderOperateItem } from './render'

export default defineComponent({
  name: 'Operate',
  setup() {
    const operate = useScaffoldOperate()

    let left: JSX.Element[] = []
    if (operate?.value.left) {
      const nodes =   operate.value.left.map(renderOperateItem)
      left = left.concat(nodes)
    }
  
    return () => <div class='operate-container'>
      <div class="operate-left-container">
        {left}
      </div>
    </div>
  }
})
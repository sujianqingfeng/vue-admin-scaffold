import { defineComponent } from 'vue'
import Query from './query'
import Operate from './operate'

export default defineComponent({
  setup() {
    return () => <div class="scaffold-container">
      <Query></Query>
      <Operate/>
    </div>
  }
})
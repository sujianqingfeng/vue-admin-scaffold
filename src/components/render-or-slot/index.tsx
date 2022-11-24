import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Custom } from 'src/types'
import { useScaffoldSlots } from '../../composables'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: ''
    },
    option: {
      type: Object as PropType<Custom>,
      default: () => ({})
    },
    param: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const slots = useScaffoldSlots()
    return () => {
      
      const { render, slot } = props.option
      const { param } = props
      if (render) {
        return render(param) 
      }
      const { name } = props
      if (slot) {
        const slotFn = slots[slot]
        if (!slotFn) {
          throw new Error(`${name}:slot ${slot} is not exist`)
        }
        return slotFn(param)
      }
      throw new Error(`${name}:render or slot is required`)
    } 
  }
}) 
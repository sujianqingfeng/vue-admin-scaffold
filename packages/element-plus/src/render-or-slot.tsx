import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Custom } from 'types'
import { useScaffoldSlots } from 'core'

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
      type: [Function, Object],
      default: () => ({})
    }
  },
  setup(props) {
    const slots = useScaffoldSlots()
    return () => {
      
      const { render, slot } = props.option
      const { param } = props
      if (render) {
        if (typeof param === 'function') {
          return render(param())
        }
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
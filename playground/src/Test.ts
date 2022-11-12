import { defineComponent, h } from 'vue'

export default defineComponent({
  render() {
    return h('div', { '.name': 'some-name', '^width': '100' }, 'test')
  }
})
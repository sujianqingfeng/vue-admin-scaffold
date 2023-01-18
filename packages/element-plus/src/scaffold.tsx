import { defineComponent } from 'vue'
import { props } from 'shared/props'
import { ScaffoldProvider } from 'core'
import Main from './main'

import './style'

export default defineComponent({
  props,
  setup(props) {

    return () => <ScaffoldProvider {...props}>
      <Main></Main>
    </ScaffoldProvider>
  },
})
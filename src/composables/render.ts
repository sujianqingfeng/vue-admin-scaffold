import { getConfig } from '@config'
import { UiRender } from 'renders/types'
import { inject, InjectionKey, provide } from 'vue'

type InjectUIRender =  UiRender

const UI_RENDER_KEY: InjectionKey<InjectUIRender> = Symbol('ui-render-key') 

export const useProvideScaffoldUIRender = () => {
  const { uiRender } = getConfig()

  provide(UI_RENDER_KEY, uiRender)
}

export const useScaffoldUIRender = () => inject(UI_RENDER_KEY)
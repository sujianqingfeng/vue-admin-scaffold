import { useSlots, provide, inject } from 'vue'
import type { Slots, InjectionKey } from 'vue'

export type InjectSlots = Slots

const SLOTS_KEY: InjectionKey<InjectSlots> = Symbol('slots-key') 

export const useProvideScaffoldSlots = () => {
  const slots  = useSlots()
  provide(SLOTS_KEY, slots)
}

export const useScaffoldSlots = () => inject(SLOTS_KEY)!


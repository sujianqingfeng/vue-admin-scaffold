import deepmerge from 'deepmerge'
import { inject, provide, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import type { ScaffoldTable } from '../types'
import { config } from '../config'

type InjectTable = Ref<ScaffoldTable>

const TABLE_KEY: InjectionKey<InjectTable> = Symbol('table-key')

export const useProvideScaffoldTable = (_table: ScaffoldTable) => {

  const formatTable = (table: ScaffoldTable) => {
    const { table: defaultTable } = config
    return deepmerge(defaultTable, table)
  }

  const table = ref(formatTable(_table))

  provide(TABLE_KEY, table)

  return {
    table
  }
}

export const useScaffoldTable = () => inject(TABLE_KEY)
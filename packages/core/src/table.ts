import { inject, provide, ref } from 'vue'
import type { InjectionKey } from 'vue'
import type { InjectTable, ScaffoldTable } from 'shared/types'
import { resolveScaffoldConfig } from 'shared'

const TABLE_KEY: InjectionKey<InjectTable> = Symbol('table-key')

export const useProvideScaffoldTable = (_table: Partial<ScaffoldTable> = {}) => {
  const tableInject: InjectTable = {
    table: ref(resolveScaffoldConfig('table', _table)),
    tableRef: ref<any>()
  } 

  provide(TABLE_KEY, tableInject)
  return tableInject
}

export const useScaffoldTable = () => inject(TABLE_KEY)!
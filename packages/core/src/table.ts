import { inject, provide, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import type { ScaffoldTable } from 'shared/types'
import { resolveScaffoldConfig } from 'shared'

export type InjectTable = {
  table: Ref<ScaffoldTable>,
  tableRef: Ref<any>
} 

const TABLE_KEY: InjectionKey<InjectTable> = Symbol('table-key')
export const useProvideScaffoldTable = (_table: Partial<ScaffoldTable> = {}) => {

  const tableInject: InjectTable = {
    table: ref(resolveScaffoldConfig('table', _table)),
    tableRef: ref(null)
  } 

  provide(TABLE_KEY, tableInject)

  return tableInject
}

export const useScaffoldTable = () => inject(TABLE_KEY)!
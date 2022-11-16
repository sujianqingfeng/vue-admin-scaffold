import deepmerge from 'deepmerge'
import { inject, provide, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import type { ScaffoldTable } from '../types'
import { config } from '../config'

export type InjectTable = {
  table: Ref<ScaffoldTable>,
  tableRef: Ref<any>
} 

const TABLE_KEY: InjectionKey<InjectTable> = Symbol('table-key')

export const useProvideScaffoldTable = (_table: ScaffoldTable) => {

  const formatTable = (table: ScaffoldTable) => {
    const { table: defaultTable } = config
    return deepmerge(defaultTable, table)
  }

  const tableInject: InjectTable = {
    table: ref(formatTable(_table)),
    tableRef: ref(null)
  } 

  provide(TABLE_KEY, tableInject)

  return tableInject
}

export const useScaffoldTable = () => inject(TABLE_KEY)!
import { inject, provide, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import type { ScaffoldTable } from 'types'
import { getConfig } from '@config'
import { merge } from 'lodash-es'

export type InjectTable = {
  table: Ref<ScaffoldTable>,
  tableRef: Ref<any>
} 

const resolveTableConfig = (table: ScaffoldTable) => {
  const { table: defaultTable } = getConfig()
  return merge(defaultTable, table)
}

const TABLE_KEY: InjectionKey<InjectTable> = Symbol('table-key')
export const useProvideScaffoldTable = (_table: ScaffoldTable) => {

  const tableInject: InjectTable = {
    table: ref(resolveTableConfig(_table)),
    tableRef: ref(null)
  } 

  provide(TABLE_KEY, tableInject)

  return tableInject
}

export const useScaffoldTable = () => inject(TABLE_KEY)!
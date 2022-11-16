import type { InjectTable } from '../../composables/table'
import type { InjectRequest } from '../../composables/request'

export type RenderTableOption =Pick<InjectTable, 'tableRef'> &  Pick<InjectRequest, 'loading' | 'dataSource'>
import { defineComponent } from 'vue'
import { props } from 'shared/props'
import { useProvideScaffoldQuery } from './query'
import { useProvideScaffoldSlots } from './slots'
import { useProvideScaffoldPagination } from './pagination'
import { useProvideScaffoldOperate } from './operate'
import { useProvideScaffoldRequest } from './request'
import { useProvideScaffoldTable } from './table'

export default defineComponent({
  props,
  setup(props, ctx) {
    const { formData, fetchAsyncData } = useProvideScaffoldQuery(props.schema.query)
    const pagination = useProvideScaffoldPagination(props.schema.pagination)
    useProvideScaffoldOperate(props.schema.operate)
    useProvideScaffoldRequest(props.schema.request, formData, pagination)
    useProvideScaffoldTable(props.schema.table)
    useProvideScaffoldSlots()

    return ctx.slots?.default
  },
})
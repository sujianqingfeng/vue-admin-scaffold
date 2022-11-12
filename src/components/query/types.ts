import type { AsyncDataRef, FormDataRef } from '../../composables/query'

export type Context = {
  asyncData: AsyncDataRef
  formData: FormDataRef
}

export type ActionProps = {
  onClick: () => void
  class: string
}
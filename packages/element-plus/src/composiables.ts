import { useScaffoldPagination, useScaffoldQuery } from 'core'

export const useReset = () => {
  const { resetFormData } = useScaffoldQuery()
  const { resetPagination } = useScaffoldPagination()

  const reest = () => {
    resetFormData()
    resetPagination()
  }

  return {
    reest
  }
}
import type { ScaffoldQuery, ScaffoldQueryForm, ScaffoldQueryFormTypes, ScaffoldQueryLayout, ScaffoldQuerySelectForm } from '../types'
import { config } from '../config'
import { ref } from 'vue'
import { isArray, isFunction, isString } from '@sujian/utils'

const formatLayout = (layout: ScaffoldQueryLayout) => {
  const { query: defaultQuery } = config
  const mergeLayout = { ...defaultQuery.layout, ...layout }
  return mergeLayout
}

const generateFormData = (forms: ScaffoldQueryForm[]) => {
  const data: Record<string, any> = {}

  const batchGenerate = (keys: string[], values: any[]) => {
    const n = keys.length
    for (let i = 0; i < n; i++) {
      const k = keys[i]
      const v = values[i]
      data [k] = v || ''
    }
  }

  forms.forEach(form => {
    const { key, value } = form 
    if (isString(key)) {
      data[key] = value || ''
    } else if (isArray(key) && isArray(value)) {
      batchGenerate(key, value)
    }
  })

  return data
}

const useFetchAsyncData = (forms: ScaffoldQueryForm[]) => {
  const asyncData = ref<Record<string, any>>({})
  
  const asyncTypeMap: Record<Exclude<ScaffoldQueryFormTypes, 'input'>, (form: ScaffoldQueryForm) => void > = {
    select: async (form: ScaffoldQueryForm) => {
      const { key, options } = form as ScaffoldQuerySelectForm
      if (!options) {
        asyncData.value[key] = []
      } else if (isArray(options)) {
        asyncData.value[key] = options
      } else if (isFunction(options)) {
        asyncData.value[key] = await options() 
      }
    },
  }

  const filterForms = forms.filter(form => Object.keys(asyncTypeMap).includes(form.type) )

  filterForms.forEach(form => {
    asyncTypeMap[form.type as Exclude<ScaffoldQueryFormTypes, 'input'>](form)
  })

  return { asyncData }
}

export const useQuery = (query: ScaffoldQuery) => {

  const useFormatQuery = () => {
    const layout = ref(formatLayout(query.layout || {})) 
    const formData = ref(generateFormData(query.forms || []))
    const { asyncData } = useFetchAsyncData(query.forms || [])
    return { layout, formData, asyncData  }
  }

  return [useFormatQuery]
}
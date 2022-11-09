import { inject, provide, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import type { ScaffoldQuery, ScaffoldQueryForm, ScaffoldQueryFormTypes, ScaffoldQueryLayout, ScaffoldQuerySelectForm } from '../props'
import { isArray, isFunction, isString } from '@sujian/utils'
import { config } from '../config'

type RequiredScaffoldQueryLayout = Required<ScaffoldQueryLayout>

type InjectQuery = {
  layout: Ref<RequiredScaffoldQueryLayout>
  formData: Ref<Record<string, any>>
  asyncData: Ref<Record<string, any>>
  forms: ScaffoldQueryForm[]
} 

const formatLayout = (layout: ScaffoldQueryLayout): RequiredScaffoldQueryLayout   => {
  const { query: defaultQuery } = config
  const mergeLayout = { ...defaultQuery.layout, ...layout } as Required<ScaffoldQueryLayout >
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

const QUERY_KEY: InjectionKey<InjectQuery> = Symbol('query-layout-key') 

export const useProvideScaffoldQuery = (query: ScaffoldQuery) => {
  const layout = ref(formatLayout(query.layout || {})) 

  const forms =  query.forms || []
  const formData = ref(generateFormData(forms))
  const { asyncData } = useFetchAsyncData(forms)

  const injectData: InjectQuery = { layout, formData, asyncData, forms }

  provide(QUERY_KEY, injectData)
  return injectData
}

export const useScaffoldQuery = () => {
  return inject(QUERY_KEY)!
}
import { inject, provide, ref, watch } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import type { FormData, ScaffoldQuery, ScaffoldQueryForm, ScaffoldQueryFormTypes, ScaffoldQueryLayout, ScaffoldQuerySelectForm } from '../types'
import { isArray, isFunction, isString } from '@sujian/utils'
import { config } from '../config'
import { generateKey } from '../utils'

type RequiredScaffoldQueryLayout = Required<ScaffoldQueryLayout>

export type FormDataRef = Ref<Record<string, any>>
export type AsyncDataRef = Ref<Record<string, any>>

type InjectQuery = {
  layout: Ref<RequiredScaffoldQueryLayout>
  formData: FormDataRef 
  asyncData: AsyncDataRef  
  forms: ScaffoldQueryForm[]
} 

const formatLayout = (layout: ScaffoldQueryLayout): RequiredScaffoldQueryLayout   => {
  const { query: defaultQuery } = config
  const mergeLayout = { ...defaultQuery.layout, ...layout } as Required<ScaffoldQueryLayout>
  return mergeLayout
}

const formatForms = (forms: ScaffoldQueryForm[], layout: Ref<Required<ScaffoldQueryLayout>>) => {
  const data: ScaffoldQueryForm[] = []

  forms.forEach(form => {
    const { label = 'no label text' } = form
    data.push({
      span: layout.value.span,
      ...form,
      label
    })
  })
  return data
}

const generateFormData = (forms: ScaffoldQueryForm[]) => {
  const data: FormData = {}

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

// async data
const useFetchAsyncData = (forms: ScaffoldQueryForm[], formData: Ref<FormData>) => {
  const asyncData = ref<Record<string, any>>({})
  
  const generateOptions = async (form: ScaffoldQueryForm) => {
    const { key, options } = form as ScaffoldQuerySelectForm
    const newKey = generateKey(key)

    if (!options) {
      asyncData.value[newKey ] = []
    } else if (isArray(options)) {
      asyncData.value[newKey] = options
    } else if (isFunction(options)) {
      asyncData.value[newKey] = await options(formData.value) 
    }
  }

  const asyncTypeMap: Record<Exclude<ScaffoldQueryFormTypes, 'input'>, (form: ScaffoldQueryForm) => void > = {
    select: generateOptions
  }

  const fetchOptions = (list: ScaffoldQuerySelectForm[]) => {
    list.forEach(form => {
      asyncTypeMap[form.__type__](form)
    })
  }

  const isSelect = (form: ScaffoldQueryForm): form is ScaffoldQuerySelectForm => Object.keys(asyncTypeMap).includes(form.__type__) 
  const isAutoFetch = (form: ScaffoldQuerySelectForm) => form.autoFetch === undefined ? true : form.autoFetch 

  const getFilterSelectForms = () => forms.filter(isSelect)

  const selectForms = getFilterSelectForms() 
  const asyncForms = selectForms.filter(isAutoFetch)

  // initial
  fetchOptions(asyncForms)

  const fetchAsyncData = (keys: string[]) => {
    const filterForms =  selectForms.filter(form => keys.some(key => generateKey(key) === generateKey(form.key)))
    fetchOptions(filterForms)
  }

  return { asyncData, fetchAsyncData }
}

const QUERY_KEY: InjectionKey<InjectQuery> = Symbol('query-layout-key') 

export const useProvideScaffoldQuery = (query: ScaffoldQuery) => {
  const layout = ref(formatLayout(query.layout || {})) 

  const forms = query.forms || []
  const formData = ref(generateFormData(forms))
  const { asyncData, fetchAsyncData } = useFetchAsyncData(forms, formData)

  const finalForms = formatForms(forms, layout)

  const injectData: InjectQuery = { layout, formData, asyncData, forms: finalForms  }

  provide(QUERY_KEY, injectData)
  return { ...injectData, fetchAsyncData }
}

export const useScaffoldQuery = () => {
  return inject(QUERY_KEY)!
}
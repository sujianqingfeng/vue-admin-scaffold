<script setup lang="ts">
import { Scaffold, defineScaffoldSchema, DataSource } from 'vue-admin-scaffold/element-plus'
import 'vue-admin-scaffold/element-plus/style.scss'

const fetchApi = (params: any) => new Promise<DataSource>((resolve) => {
  const { page, pageSize } = params

  const start = (page - 1) * pageSize
  const end = page * pageSize
  
  const list = []
  for (let i = start; i < end; i++) {
    const item = {
      name: `name-${i}`,
      index: i
    }
    list.push(item)
  }

  resolve({
    list,
    total: 100
  })
})

const schema = defineScaffoldSchema({
  query: {
    forms: [
      {
        __type__: 'input',
        label: '输入',
        key: 'name',
        onInput: (val: string) => {
          console.log('onInput', val)
        }
      },
    ]
  },
  request: {
    apiFn: fetchApi
  },
  table: {
    cols: [
      {
        label: '序号',
        prop: 'index'
      },
      {
        label: '名称',
        prop: 'name'
      }
    ]
  }
})
</script>

<template>
  <scaffold :schema="schema" />
</template>

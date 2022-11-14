<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Scaffold, ScaffoldSchema } from '@sujian/vue-admin-scaffold'
import type { ScaffoldInstance } from '@sujian/vue-admin-scaffold'
import Test from './Test'

import '@sujian/vue-admin-scaffold/style.scss'
const scaffoldRef = ref<ScaffoldInstance>()

const schema: ScaffoldSchema = {
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
      {
        __type__: 'select',
        label: '选择',
        key: 'select',
        onChange: (val: string) => {
          console.log('onSelectChange', val)
          scaffoldRef.value?.fetchAsyncData(['select1'])
        },
        options: [{ label: '选项1', value: '1' },],
      },
      {
        __type__: 'select',
        label: '选择',
        key: 'select1',
        autoFetch: false,
        options: [{ label: '选项1', value: '1' },],
      }
    ]
  },
  request: {
    apiFn: () => Promise.resolve({ list: [], total: 0 }) 
  }
}

onMounted(() => {
  console.log('scaffoldRef', scaffoldRef.value)
})
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      vue-admin-scaffold
      <test />
    </header>
    <div class="scaffold-container">
      <scaffold ref="scaffoldRef" :schema="schema" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  background-color: rgb(245 245 245 / 70%);

  .app-header {
    text-align: center;
    font-size: 20px;
    line-height: 40px;
  }

  .scaffold-container {
    margin-top: 16px;
  }
}
</style>
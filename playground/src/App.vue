<script setup lang="ts">
import { Scaffold, ScaffoldSchema } from '@sujian/vue-admin-scaffold'
import '@sujian/vue-admin-scaffold/style.scss'

const schema: ScaffoldSchema = {
  query: {
    forms: [
      {
        __type__: 'input',
        label: '输入',
        key: 'name',
      },
      {
        __type__: 'select',
        label: '选择',
        key: 'select',
        options: [{ label: '选项1', value: '1' },],
      },
      {
        __type__: 'select',
        label: '选择',
        key: 'select1',
        when: (data, oldData) => {
          console.log('when', data, oldData)
          return data.select !== oldData.select
        },
        options: [{ label: '选项1', value: '1' },],
      }
    ]
  }
}
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      vue-admin-scaffold
    </header>
    <div class="scaffold-container">
      <scaffold :schema="schema" />
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
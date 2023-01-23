<script setup lang="ts">
import { Scaffold, defineScaffoldSchema, defineScaffoldConfig } from 'vue-admin-scaffold/element-plus'

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
  }
})
</script>

<template>
  <scaffold :schema="schema" />
</template>

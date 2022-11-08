<script setup lang="ts">
import { Scaffold, ScaffoldSchema } from '@sujian/vue-admin-scaffold'

const schema: ScaffoldSchema = {
  query: {
    forms: [
      {
        type: 'input',
        key: 'name',
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
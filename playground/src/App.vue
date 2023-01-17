<script setup lang="ts">
import { onMounted, ref, h } from 'vue'
import { Scaffold, defineScaffoldSchema, defineScaffoldConfig } from 'scaffold-element-plus'
// import type { ScaffoldInstance } from '@sujian/vue-admin-scaffold'

import { fetchTestTableListApi } from './api'

import 'scaffold-element-plus/src/style/scaffold.scss'

// const scaffoldRef = ref<ScaffoldInstance>()
const scaffoldRef = ref<any>()
defineScaffoldConfig({
  request: {
    transform: (data: any) => {
      const { pageSize, ...rest } = data
      return {
        ...rest,
        limit: pageSize
      }
    },
    adapter: (data: any) => {
      const { total, data: list } = data
      return {
        total,
        list
      }
    }
  }
}
)

const schema = defineScaffoldSchema({
  query: {
    layout: {
      showLine: 1
    },
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
        __type__: 'input',
        label: '输入',
        key: 'name1',
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
      },
      {
        __type__: 'custom',
        key: 'custom',
        span: 2,
        label: '自定义',
        render: (context) => {
          console.log('custom form item render', context.formData)
          return h('span', '自定义')
        } 
      }
    ]
  },
  operate: {
    left: [
      {
        __type__: 'bt',
        text: '按钮',
        type: 'primary',
        onClick: (context: any) => {
          console.log('click', context)
        },
      },
      {
        __type__: 'confirm_bt',
        text: '确认按钮',
        confirmText: '确认?',
        show: (formData: any) => formData.select === '1',
        onConfirm: () => {
          console.log('confirm')
        }
      },
      {
        __type__: 'custom',
        render: () => {
          return h('span', '自定义')
        }
      }
    ],
    right: [
      {
        __type__: 'bt',
        text: '按钮',
        type: 'primary',
        onClick: (context: any) => {
          console.log('click', context)
        },
      },
    ]
  },
  request: {
    apiFn: fetchTestTableListApi  
  },
  table: {
    cols: [
      {
        label: '名称',
        prop: 'first_name'
      },
      {
        label: 'last',
        prop: 'last_name',
        show: (formData: any) => formData.select === '1',
      },
      {
        label: '自定义',
        render: (param: any) => {
          return h('span', `自定义 ${param.row.last_name}`)
        }
      }
    ],
    action: {
      list: [
        {
          __type__: 'text_bt',
          text: (param: any) => param.row.first_name === 'George' ? '文本条件显示' : '按钮',
          onClick: (param: any) => {
            console.log('click', param)
          },
        },
        {
          __type__: 'confirm_text_bt',
          text: 'confirm',
          confirmText: '确认?',
          show: (param: any) => param.row.first_name === 'Janet',
          onConfirm: () => {
            console.log('confirm')
          }
        }
      ]
    }
    
  }
})

onMounted(() => {
  console.log('scaffoldRef', scaffoldRef.value)
})
</script>

<template>
  <div class="app-container">
    <div class="scaffold-container">
      <scaffold ref="scaffoldRef" :schema="schema" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  background-color: rgb(245 245 245 / 70%);
}
</style>
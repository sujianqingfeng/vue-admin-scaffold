<script lang="ts" setup>
import { computed, ref } from 'vue'
import IconCode from './icons/code.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  },
  highlightedCode: {
    type: String,
    default: ''
  },
  lang: {
    type: String,
    default: 'vue'
  }
})

const decodedHighlightedCode = computed(() => decodeURIComponent(props.highlightedCode))

const expand = ref(false)
const toggleExpand = () => {
  expand.value = !expand.value
}
</script>

<template>
  <ClientOnly>
    <div class="demo-box">
      <div class="demo-slot">
        <slot></slot>
      </div>

      <div class="demo-title">
        <span class="title-text">{{ title }}</span>
        <span class="desc-text">{{ desc }}</span>
      </div>

      <div class="action-box">
        <icon-code class="icon-code" @click="toggleExpand" />
      </div>

      <div v-if="expand" :class="`language-${lang} extra-class`" v-html="decodedHighlightedCode"></div>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.demo-box {
  --demo-border-color: #ebedf1;
}

.dark .vitepress-demo {
  --demo-border-color: #6b6c6d;
}

.demo-box {
  border: 1px solid var(--demo-border-color);
  border-radius: 1px;
  margin-bottom: 24px;

  .demo-slot {
    padding: 40px 24px;
  }

  .demo-title {
    border-top: 1px dashed var(--demo-border-color);
    position: relative;
    padding: 1.2em 1em 1em;
    color: var(--vp-c-text-1);
    font-size: 14px;

    .title-text {
      position: absolute;
      top: 0;
      left: 1em;
      transform: translateY(-50%);
      background: var(--vp-c-bg);
      font-weight: 500;
    }
  }

  .action-box {
    display: flex;
    height: 40px;
    padding: 0 8px;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px dashed var(--demo-border-color);
  }

  div[class*="language-"] {
    border-radius: 0;
    margin: 0 !important;
    line-height: 1.5 !important;
    background-color: transparent;
  }

  [class*="language-"] pre {
    padding: 0;
  }

  [class*="language-"] code {
    padding: 1em;
  }

  .extra-class {
    border-top: 1px dashed var(--demo-border-color);
    box-sizing: border-box;
  }
}
</style>
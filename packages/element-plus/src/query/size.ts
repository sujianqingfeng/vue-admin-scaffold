import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'
import { throttle } from 'lodash-es'
import type { FormItemWidthMap, RequiredScaffoldQueryLayout } from 'shared/types'

const matchSize = (width: number, widthMap: FormItemWidthMap) => {
  for (const [size, values] of Object.entries(widthMap)) {
    const [min, max] = values
    if (width >= min && width < max) {
      return size
    }
  }

  throw new Error(`computedWidthSize method ${width} 不存在`)
}

export const useSize = (layout: Ref<RequiredScaffoldQueryLayout>) => {
  const formRef = ref<HTMLElement|null>()
  const count = ref()
  const itemWidth = ref(328)

  const getRealWidth = () => {
    return formRef.value?.clientWidth ?? 0 
  }

  const computedSize = () => {
    const width = getRealWidth()
    
    const size = matchSize(width, layout.value.formItemWidthMap)
    count.value = size    
    itemWidth.value  = 100 / +size 
  }

  const showCount = computed(() => {
    return count.value * layout.value.showLine
  })

  const getColStyle = (span: number) => {
    return {
      width: `${itemWidth.value * span}%`
    }
  }

  const getItemWidth = throttle(computedSize, 500, {
    leading: true,
    trailing: true
  })

  onMounted(() => {
    window.addEventListener('resize', getItemWidth)
    getItemWidth()
  })

  onUnmounted(() => {
    window.addEventListener('resize', getItemWidth)
  })

  return {
    formRef,
    showCount,
    getColStyle 
  }
}
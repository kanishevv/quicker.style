<script setup lang="ts">
import { ref, computed } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { provide } from 'vue'

export interface QGridProps {
  cols: number | string
  xGap: number | string
  yGap: number | string
}

const props = withDefaults(defineProps<Partial<QGridProps>>(), {
  cols: 24,
  xGap: 0,
  yGap: 0
})

const { xGap } = props

const grid = ref(null)

const width = ref<number | null>(null)

const styles = computed(() => {
  const { cols, xGap, yGap } = props

  return [
    {
      gridTemplateColumns: `repeat(${cols}, minmax(0px, 1fr))`,
      rowGap: typeof yGap === 'number' ? `${yGap}px` : '',
      columnGap: typeof xGap === 'number' ? `${xGap}px` : ''
    }
  ]
})

useResizeObserver(grid, (entries) => (width.value = entries[0].contentRect.width))

provide('params', {
  width,
  xGap
})
</script>

<template>
  <div ref="grid" class="q-grid" :style="styles">
    <slot />
  </div>
</template>

<style src="./QGrid.style.scss" lang="scss"></style>

<script setup lang="ts">
import { computed, type Ref } from 'vue'
import { parseResponsivePropValue, pxfy } from 'seemly'
import { inject } from 'vue'

type InjectParams = {
  width: Ref
  xGap: string | number
}

export interface QGridItemProps {
  span: number | string
  offset: number | string
}

const props = withDefaults(defineProps<Partial<QGridItemProps>>(), {
  span: 1,
  offset: 0
})

const params = inject('params') as InjectParams

const styles = computed(() => {
  const span = params
    ? parseResponsivePropValue(props.span.toString(), params.width.value)
    : props.span
  const offset =
    params && props.offset
      ? parseResponsivePropValue(props.offset.toString(), params.width.value)
      : props.offset

  const mergedXGap = pxfy((params && params.xGap) || 0)

  return [
    {
      gridColumn: `span ${span} / span ${span}`,
      marginLeft: offset
        ? `calc((100% - (${span} - 1) * ${mergedXGap}) / ${span} * ${offset} + ${mergedXGap} * ${offset})`
        : ''
    }
  ]
})
</script>

<template>
  <div class="q-grid-item" :style="styles">
    <slot />
  </div>
</template>

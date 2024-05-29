<script setup lang="ts">
import { computed } from 'vue'

export interface QFlexProps {
  vertical: boolean
  wrap: boolean
  justify: string
  align: string
}

const props = withDefaults(defineProps<Partial<QFlexProps>>(), {
  wrap: true,
  justify: 'start'
})

const classes = computed(() => {
  const { wrap, vertical, justify, align } = props

  let classes: [{} | string] = [
    {
      'q-flex--wrap': wrap,
      'q-flex--vertical': vertical
    }
  ]

  if (justify) classes.push(`q-flex--justify-${justify}`)
  if (align) classes.push(`q-flex--align-${align}`)

  return classes
})
</script>

<template>
  <div class="q-flex" :class="classes">
    <slot />
  </div>
</template>

<style src="./QFlex.style.scss" lang="scss"></style>

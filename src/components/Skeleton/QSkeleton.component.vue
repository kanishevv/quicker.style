<script setup lang="ts">
import { computed } from 'vue'

export type QSkeletonProps = {
  effect?: string
}

const props = defineProps<QSkeletonProps>()

const classes = computed(() => {
  const { effect } = props

  return [
    {
      'q-skeleton--sheen': effect === 'sheen',
      'q-skeleton--pulse': effect === 'pulse'
    }
  ]
})
</script>

<template>
  <div class="q-skeleton" :class="classes">
    <div class="q-skeleton__indicator"></div>
  </div>
</template>

<style src="./Skeleton.style.scss" lang="scss"></style>

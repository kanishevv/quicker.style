<script setup lang="ts">
import { computed } from 'vue'

export interface QDividerProps {
  vertical: boolean
}

const props = withDefaults(defineProps<Partial<QDividerProps>>(), {
  vertical: false
})

const classes = computed(() => {
  const { vertical } = props

  return [
    {
      'q-divider--horizontal': !vertical,
      'q-divider--vertical': vertical
    }
  ]
})
</script>

<template>
  <div class="q-divider" :class="classes"></div>
</template>

<style src="./QDivider.style.scss" lang="scss" scoped></style>

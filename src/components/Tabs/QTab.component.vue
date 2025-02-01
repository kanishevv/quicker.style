<script setup lang="ts">
import { computed } from 'vue'

export interface QTabProps {
  active?: boolean
}

const props = defineProps<QTabProps>()

const classes = computed(() => {
  const { active } = props

  return [
    {
      'q-tab--active': active
    }
  ]
})
</script>

<template>
  <div class="q-tab" :class="classes">
    <slot />
  </div>
</template>

<style src="./QTab.style.scss" lang="scss" scoped></style>

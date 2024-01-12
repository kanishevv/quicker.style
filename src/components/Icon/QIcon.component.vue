<script setup lang="ts">
import { computed } from 'vue'

interface QIconProps {
  size: string | number
  color: string
}

const props = defineProps<Partial<QIconProps>>()

const styles = computed(() => {
  const { size, color } = props

  return [
    {
      '--font-size': typeof size === 'number' ? `${size}px` : size,
      '--color': color
    }
  ]
})
</script>

<template>
  <div class="q-icon" :style="styles">
    <slot />
  </div>
</template>

<style src="./QIcon.style.scss" lang="scss"></style>

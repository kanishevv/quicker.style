<script setup lang="ts">
import { computed } from 'vue'
import QIcon from '@/components/Icon/QIcon'

export interface QIconButtonProps {
  size: string | number
  color: string
  variant: 'default' | 'primary'
}

const props = withDefaults(defineProps<Partial<QIconButtonProps>>(), {
  size: '18px',
  variant: 'default'
})

const classes = computed(() => {
  const { variant } = props
  return [
    {
      'q-icon-button--variant-default': variant === 'default',
      'q-icon-button--variant-primary': variant === 'primary'
    }
  ]
})
</script>

<template>
  <button class="q-icon-button" :class="classes">
    <q-icon :size="size" :color="color" class="q-icon-button__icon">
      <slot />
    </q-icon>
  </button>
</template>

<style src="./QIconButton.style.scss" lang="scss" scoped></style>

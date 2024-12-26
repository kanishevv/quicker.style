<script setup lang="ts">
import { computed } from 'vue'

export type QBadgeProps = {
  variant?: 'primary' | 'success' | 'neutral' | 'warning' | 'danger'
  pill?: boolean
  pulse?: boolean
  text?: string
}

const props = withDefaults(defineProps<Partial<QBadgeProps>>(), {
  variant: 'primary',
  pill: false,
  pulse: false
})

const classes = computed(() => {
  const { variant, pill, pulse } = props

  return [
    {
      'q-badge--primary': variant === 'primary',
      'q-badge--success': variant === 'success',
      'q-badge--neutral': variant === 'neutral',
      'q-badge--warning': variant === 'warning',
      'q-badge--danger': variant === 'danger',
      'q-badge--pill': pill,
      'q-badge--pulse': pulse
    }
  ]
})
</script>

<template>
  <span class="q-badge" :class="classes">
    <slot>
      {{ text }}
    </slot>
  </span>
</template>

<style src="./QBadge.style.scss" lang="scss" scoped />

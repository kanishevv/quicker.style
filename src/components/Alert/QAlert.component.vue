<script setup lang="ts">
import { computed, useSlots } from 'vue'

export type QAlertProps = {
  variant: 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger'
  open: boolean
  closable: boolean
  pill: boolean
}

const slots = useSlots()
const props = withDefaults(defineProps<Partial<QAlertProps>>(), {
  variant: 'primary'
})
const classes = computed(() => {
  const { variant, open, pill } = props

  return [
    {
      'q-alert--standart': !pill,
      'q-alert--pill': pill,
      'q-alert--has-icon': slots.icon,
      'q-alert--open': open,
      'q-alert--default': variant === 'default',
      'q-alert--primary': variant === 'primary',
      'q-alert--success': variant === 'success',
      'q-alert--neutral': variant === 'neutral',
      'q-alert--warning': variant === 'warning',
      'q-alert--danger': variant === 'danger'
    }
  ]
})
</script>

<template>
  <div class="q-alert" :class="classes">
    <div class="q-alert__icon" v-if="slots.icon">
      <slot name="icon" />
    </div>
    <div class="q-alert__message">
      <slot />
    </div>
  </div>
</template>

<style src="./QAlert.style.scss" lang="scss" scoped></style>

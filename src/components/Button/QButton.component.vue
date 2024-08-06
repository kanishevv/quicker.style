<script setup lang="ts">
import { computed } from 'vue'

export interface QButtonProps {
  outline: boolean
  variant: 'text' | 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger'
  size: 'small' | 'medium' | 'large'
  pill: boolean
  circle: boolean
  disabled: boolean
  caret: boolean
  href?: string
  target?: 'blank' | 'self' | 'parent' | 'top'
}

const props = withDefaults(defineProps<Partial<QButtonProps>>(), {
  outline: false,
  variant: 'default',
  size: 'medium'
})

const slots = defineSlots()

const component = computed(() => props.href ? 'a' : 'button')

const targ = computed(() => props.href !== null && props.target ? `_${props.target}` : null)

const classes = computed(() => {
  const { outline, variant, size, caret, pill, circle, disabled, href } = props

  return [
    {
      'q-button--standard': !outline,
      'q-button--outline': outline,
      'q-button--text': variant === 'text',
      'q-button--default': variant === 'default',
      'q-button--primary': variant === 'primary',
      'q-button--success': variant === 'success',
      'q-button--neutral': variant === 'neutral',
      'q-button--warning': variant === 'warning',
      'q-button--danger': variant === 'danger',
      'q-button--small': size === 'small',
      'q-button--medium': size === 'medium',
      'q-button--large': size === 'large',
      'q-button--pill': pill,
      'q-button--circle': circle,
      'q-button--disabled': disabled,
      'q-button--label': slots.default,
      'q-button--prefix': slots.prefix,
      'q-button--suffix': slots.suffix || caret,
      'q-button--link': href
    }
  ]
})
</script>

<template>
  <component class="q-button" :is='component' :class="classes" :href="href" :target="targ">
    <span class="q-button__prefix" v-if="slots.prefix">
      <slot name="prefix"></slot>
    </span>
    <span class="q-button__label">
      <slot />
    </span>
    <span class="q-button__suffix" v-if="slots.suffix">
      <slot name="suffix"></slot>
    </span>
  </component>
</template>

<style src="./QButton.style.scss" lang="scss"></style>

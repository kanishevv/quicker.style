<script setup lang="ts">
import { computed } from 'vue'

let RouterLink: any = null
try {
  // @ts-ignore - dynamic import for optional dependency
  RouterLink = require('vue-router').RouterLink
} catch {
  // vue-router is not installed, RouterLink will remain null
}

export interface QButtonProps {
  outline: boolean
  variant: 'text' | 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger'
  size: 'small' | 'medium' | 'large'
  pill: boolean
  circle: boolean
  disabled: boolean
  caret: boolean
  href: string
  to: string | object
  target: 'blank' | 'self' | 'parent' | 'top'
}

const props = withDefaults(defineProps<Partial<QButtonProps>>(), {
  outline: false,
  variant: 'default',
  size: 'medium'
})

const slots = defineSlots()

const component = computed(() => {
  if (props.to && RouterLink) {
    return RouterLink
  }
  if (props.href || props.to) {
    return 'a'
  }
  return 'button'
})

const linkProps = computed(() => {
  if (props.to && RouterLink) {
    return { to: props.to }
  }
  if (props.href) {
    return { href: props.href }
  }
  if (props.to) {
    return { href: typeof props.to === 'string' ? props.to : '#' }
  }
  return {}
})

const targ = computed(() => {
  const hasLink = props.href || (props.to && !RouterLink)
  return hasLink && props.target ? `_${props.target}` : null
})

const classes = computed(() => {
  const { outline, variant, size, caret, pill, circle, disabled, href, to } = props
  const hasLink = href || to

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
      'q-button--link': hasLink
    }
  ]
})
</script>

<template>
  <component class="q-button" :is="component" :class="classes" v-bind="linkProps" :target="targ">
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

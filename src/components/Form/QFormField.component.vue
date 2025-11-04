<script setup lang="ts">
import { computed } from 'vue'

export interface QFormFieldProps {
  variant: 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger'
  label: string
  helpText: string
  size: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Partial<QFormFieldProps>>(), {
  variant: 'default',
  size: 'medium'
})

const classes = computed(() => {
  const { variant, label, size } = props

  return [
    {
      'q-form-field--default': variant === 'default',
      'q-form-field--primary': variant === 'primary',
      'q-form-field--success': variant === 'success',
      'q-form-field--neutral': variant === 'neutral',
      'q-form-field--warning': variant === 'warning',
      'q-form-field--danger': variant === 'danger',
      'q-form-field--has-label': label,
      'q-form-field--small': size === 'small',
      'q-form-field--medium': size === 'medium',
      'q-form-field--large': size === 'large'
    }
  ]
})
</script>

<template>
  <div class="q-form-field" :class="classes">
    <label class="q-form-field__label" for="input" v-if="label">
      {{ label }}
    </label>
    <div class="q-form-field__input">
      <slot />
    </div>
    <div class="q-form-field__help-text">
      <span v-if="helpText">{{ helpText }}</span>
    </div>
  </div>
</template>

<style src="./QFormField.style.scss" lang="scss" scoped></style>

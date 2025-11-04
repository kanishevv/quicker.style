<script setup lang="ts">
import { computed } from 'vue'
import QIcon from '../Icon/QIcon'
import { Checkmark16Filled } from '@vicons/fluent'

const modelValue = defineModel()

type QCheckboxProps = {
  title: string
  name: string
  size: 'small' | 'medium' | 'large'
  disabled: boolean
  checked: boolean
  required: boolean
  indeterminate: boolean
}

const props = withDefaults(defineProps<Partial<QCheckboxProps>>(), {
  title: '',
  name: '',
  size: 'medium',
  disabled: false,
  checked: false,
  required: false,
  indeterminate: false
})

const classes = computed(() => {
  const { disabled, indeterminate, size } = props

  return [
    {
      'q-checkbox--checked': modelValue.value,
      'q-checkbox--disabled': disabled,
      // 'q-checkbox--focused': this.hasFocus,
      'q-checkbox--indeterminate': indeterminate,
      'q-checkbox--small': size === 'small',
      'q-checkbox--medium': size === 'medium',
      'q-checkbox--large': size === 'large'
    }
  ]
})

const handleClick = () => {
  if (!props.disabled) {
    modelValue.value = !modelValue.value
  }
}

const handleInput = () => {}

const handleBlur = () => {}

const handleFocus = () => {}
</script>

<template>
  <label
    for=""
    class="q-checkbox"
    :class="classes"
    @click="() => handleClick()"
    @input="() => handleInput()"
    @blur="() => handleBlur()"
    @focus="() => handleFocus()"
  >
    <input
      type="checkbox"
      class="q-checkbox__input"
      v-model="modelValue"
      :title="title"
      :name="name"
      :indeterminate="indeterminate"
      :checked="checked"
      :disabled="disabled"
      :required="required"
    />
    <span class="q-checkbox__control">
      <q-icon class="q-checkbox__checked-icon">
        <Checkmark16Filled />
      </q-icon>
    </span>
    <div class="q-checkbox__label">
      <slot></slot>
    </div>
  </label>
</template>

<style src="./QCheckbox.style.scss" lang="scss" scoped></style>

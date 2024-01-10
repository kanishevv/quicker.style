<script setup lang="ts">
import { computed, reactive } from 'vue'

const model = defineModel()

const slots = defineSlots()

export interface QInputProps {
  title: string
  name: string
  type: string
  placeholder: string
  disabled: boolean
  size: 'small' | 'medium' | 'large'
  filled: boolean
  pill: boolean
  readonly: boolean
  required: boolean
  minlength: number
  maxlength: number
  min: number | string
  max: number | string
  autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'
  autocomplete: string
  inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
  autocorrect: 'off' | 'on'
  autofocus: boolean
  enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'
  spellcheck: boolean
  pattern: string
}

const props = withDefaults(defineProps<Partial<QInputProps>>(), {
  title: '',
  name: '',
  type: 'text',
  size: 'medium',
  placeholder: '',
  spellcheck: true
})

const state = reactive({
  focus: false
})

const classes = computed(() => {
  const { size, filled, pill, disabled } = props

  return [
    {
      'q-input--small': size === 'small',
      'q-input--medium': size === 'medium',
      'q-input--large': size === 'large',
      'q-input--disabled': disabled,
      'q-input--standard': !filled,
      'q-input--filled': filled,
      'q-input--pill': pill,
      'q-input--focused': state.focus,
      'q-input--empty': !model.value
    }
  ]
})

const handleFocus = () => {
  state.focus = true
}

const handleBlur = () => {
  state.focus = false
}
</script>

<template>
  <div class="q-input" :class="classes">
    <div class="q-input__prefix" v-if="slots.prefix">
      <slot name="prefix" />
    </div>

    <input
      class="q-input__control"
      v-model="model"
      :name="name"
      :type="type"
      :title="title"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :minlength="minlength"
      :maxlength="maxlength"
      :min="min"
      :max="max"
      :autocapitalize="autocapitalize"
      :autocomplete="autocomplete"
      :autocorrect="autocorrect"
      :autofocus="autofocus"
      :spellcheck="spellcheck"
      :pattern="pattern"
      :enterkeyhint="enterkeyhint"
      :inputmode="inputmode"
      @focus="() => handleFocus()"
      @blur="() => handleBlur()"
    />

    <div class="q-input__suffix" v-if="slots.suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<style src="./QInput.style.scss" lang="scss"></style>

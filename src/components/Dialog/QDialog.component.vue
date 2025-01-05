<script setup lang="ts">
import { computed, useSlots } from 'vue'

const slots = useSlots()

const open = defineModel<boolean>()

const classes = computed(() => {
  return [
    {
      'q-dialog--open': open,
      'q-dialog--has-footer': slots.footer
    }
  ]
})
</script>

<template>
  <div class="q-dialog" :class="classes" v-if="open">
    <div class="q-dialog__overlay">
      <slot name="overlay" />
    </div>
    <div class="q-dialog__panel">
      <div class="q-dialog__header" v-if="slots.label || slots.actions">
        <div class="q-dialog__title" v-if="slots.label">
          <slot name="label" />
        </div>
        <div class="q-dialog__header-actions" v-if="slots.actions">
          <slot name="actions" />
        </div>
      </div>
      <div class="q-dialog__body">
        <slot />
      </div>
      <div class="q-dialog__footer" v-if="slots.footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style src="./QDialog.style.scss" lang="scss" scoped></style>

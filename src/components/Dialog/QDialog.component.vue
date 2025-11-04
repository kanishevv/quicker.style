<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface QDialogProps {
  closeOnOverlay?: boolean
}

const props = withDefaults(defineProps<QDialogProps>(), {
  closeOnOverlay: true
})

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

const handleOverlayClick = (event: MouseEvent) => {
  if (props.closeOnOverlay && event.target === event.currentTarget) {
    open.value = false
  }
}

const handlePanelClick = (event: MouseEvent) => {
  event.stopPropagation()
}
</script>

<template>
  <div class="q-dialog" :class="classes" v-if="open">
    <div class="q-dialog__overlay" @click="handleOverlayClick">
      <slot name="overlay" />
    </div>
    <div class="q-dialog__panel" @click="handlePanelClick">
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

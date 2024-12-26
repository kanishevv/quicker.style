<script setup lang="ts">
import { computed, useSlots } from 'vue'

export interface QMenuItemProps {
  active?: boolean
}

const slots = useSlots()

const props = defineProps<QMenuItemProps>()

const classes = computed(() => {
  const { active } = props

  return [
    {
      'q-menu-item--active': active
    }
  ]
})
</script>

<template>
  <div class="q-menu-item" :class="classes">
    <div class="q-menu-item__check"></div>
    <div class="q-menu-item__prefix" v-if="slots.prefix">
      <slot name="prefix" />
    </div>
    <div class="q-menu-item__label" v-if="slots.default">
      <slot />
    </div>
    <div class="q-menu-item__suffix" v-if="slots.suffix">
      <slot name="suffix" />
    </div>
    <div class="q-menu-item__chevron"></div>
  </div>
</template>

<style src="./QMenuItem.styles.scss" lang="scss" scoped></style>

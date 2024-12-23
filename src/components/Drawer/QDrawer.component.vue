<script setup lang="ts">
import { computed, useSlots } from 'vue'

const slots = useSlots()

export type QDrawerProps = {
  open: boolean
  label?: string
  placement: 'top' | 'end' | 'bottom' | 'start'
  contained: boolean
}

const props = withDefaults(defineProps<Partial<QDrawerProps>>(), {
  open: false,
  label: '',
  placement: 'end',
  contained: false
})

const classes = computed(() => {
  const { open, placement, contained } = props

  return [
    {
      'q-drawer--open': open,
      'q-drawer--top': placement === 'top',
      'q-drawer--end': placement === 'end',
      'q-drawer--bottom': placement === 'bottom',
      'q-drawer--start': placement === 'start',
      'q-drawer--contained': contained,
      'q-drawer--fixed': !contained,
      'q-drawer--has-footer': slots.footer
    }
  ]
})

const drawerTransitionName = computed(() => {
  switch (props.placement) {
    case 'top':
      return props.open ? 'q-drawer-show-top' : 'q-drawer-hide-top'
    case 'end':
      return props.open ? 'q-drawer-show-end' : 'q-drawer-hide-end'
    case 'bottom':
      return props.open ? 'q-drawer-show-bottom' : 'q-drawer-hide-bottom'
    case 'start':
      return props.open ? 'q-drawer-show-start' : 'q-drawer-hide-start'
    default:
      return ''
  }
})
</script>

<template>
  <div class="q-drawer" :class="classes">
    <Transition name="q-drawer-fade">
      <div class="q-drawer__overlay" tabindex="-1" v-if="open"></div>
    </Transition>
    <Transition :duration="55000" :name="drawerTransitionName">
      <div class="q-drawer__panel" tabindex="0" v-show="open">
        <div class="q-drawer__header">
          <h2 class="q-drawer__title" v-if="slots.label || props.label">
            <span v-if="props.label">{{ label }}</span>
            <slot name="label" v-else-if="slots.label" />
          </h2>
          <div class="q-drawer__header-actions">
            <slot name="actions" />
          </div>
        </div>
        <div class="q-drawer__body">
          <slot />
        </div>
        <div class="q-drawer__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style src="./QDrawer.style.scss" lang="scss" scoped></style>

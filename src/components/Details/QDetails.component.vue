<script setup lang="ts">
import { ref, reactive, useSlots, computed } from 'vue'
import QIcon from '../Icon/QIcon'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'

export type QDetailsProps = {
  open?: boolean
  disabled?: boolean
  summary?: string
}

const props = defineProps<QDetailsProps>()

const slots = useSlots()

const state = reactive({
  open: props.open,
  disabled: props.disabled
})

const header = ref<HTMLElement>()

const classes = computed(() => {
  const { open, disabled } = state

  return [
    {
      'q-details--open': open,
      'q-details--disabled': disabled
    }
  ]
})

const show = () => {
  if (!state.open) {
    state.open = true
  }
}

const hide = () => {
  if (state.open) {
    state.open = false
  }
}

const toggle = () => {
  if (state.open) {
    hide()
  } else {
    show()
  }
}

const handleSummaryClick = () => {
  toggle()
  header.value?.focus()
}
</script>

<template>
  <details class="q-details" :class="classes">
    <summary
      ref="header"
      class="q-details__header"
      part="header"
      role="button"
      @click="() => handleSummaryClick()"
    >
      <div class="q-details__summary">
        <slot name="summary" v-if="slots.summary" />
        <template v-else-if="props.summary">{{ props.summary }}</template>
      </div>
      <span part="summary-icon" class="q-details__summary-icon">
        <slot name="expand-icon" v-if="state.open">
          <QIcon>
            <ChevronRightIcon />
          </QIcon>
        </slot>
        <slot name="collapse-icon" v-else>
          <QIcon>
            <ChevronRightIcon />
          </QIcon>
        </slot>
      </span>
    </summary>
    <div class="q-details__body">
      <div class="q-details__content">
        <slot />
      </div>
    </div>
  </details>
</template>

<style src="./QDetails.style.scss" lang="scss"></style>

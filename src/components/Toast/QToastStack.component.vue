<script lang="ts" setup>
import { computed } from 'vue'
import QToast from './QToast.component.vue'
import { useToast } from './QToast.service'

const { toasts } = useToast()

export interface QToastStackProps {
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
}

const props = withDefaults(defineProps<QToastStackProps>(), {
  placement: 'bottom-start'
})

const classes = computed(() => {
  const { placement } = props

  return [
    {
      'q-toast-stack--placement-top': placement === 'top',
      'q-toast-stack--placement-top-start': placement === 'top-start',
      'q-toast-stack--placement-top-end': placement === 'top-end',
      'q-toast-stack--placement-bottom': placement === 'bottom',
      'q-toast-stack--placement-bottom-start': placement === 'bottom-start',
      'q-toast-stack--placement-bottom-end': placement === 'bottom-end'
    }
  ]
})
</script>

<template>
  <div class="q-toast-stack" :class="classes" v-if="toasts.length">
    <q-toast class="q-toast-stack__toast" v-for="toast in toasts" :key="toast.id" :class="toast.type">
      <component v-if="toast.component" :is="toast.component" v-bind="toast.props">
        <template v-for="(slotFn, slotName) in toast.slots" :key="`${toast.id}-${slotName}`"
          v-slot:[slotName]="slotProps">
          <component :is="slotFn" v-bind="slotProps" />
        </template>
      </component>
      <div class="q-toast-stack__message" v-else>{{ toast.message }}</div>
    </q-toast>
  </div>
</template>

<style src="./QToastStack.style.scss" scoped></style>

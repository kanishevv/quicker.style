<script lang="ts" setup>
import { computed } from 'vue'
import QToast from './QToast.component.vue'
import { useToast } from './QToast.service'
import { ref, onBeforeUnmount, onMounted, nextTick } from "vue"

const { toasts } = useToast()

export interface QToastStackProps {
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'click',
  windowMargin?: number,
  clickMargin?: number
}

const props = withDefaults(defineProps<QToastStackProps>(), {
  placement: 'bottom-start',
  windowMargin: 10,
  clickMargin: 30
})

const toastRef = ref<HTMLElement | null>(null)
const x = ref(0)
const y = ref(0)
const toastWidth = ref(0)
const toastHeight = ref(0)

function updateToastSize() {
  nextTick(() => {
    if (toastRef.value) {
      const rect = toastRef.value.getBoundingClientRect()
      toastWidth.value = rect.width
      toastHeight.value = rect.height
    }
  })
}

function setPosition(event: MouseEvent) {
  x.value = event.clientX
  y.value = event.clientY
}

const stylePosition = computed(() => {
  if (props.placement !== 'click') return {}
  let translateX = 0
  let translateY = -100
  let xPosition = x.value
  let yPosition = y.value

  if (xPosition + props.clickMargin + toastWidth.value + props.windowMargin > window.innerWidth) {
    translateX = -100
    xPosition = -2*props.clickMargin
  }
  if (yPosition - toastHeight.value < props.windowMargin) {
    translateY = 0
    yPosition = y.value + props.clickMargin
  }

  return {
    left: `${xPosition + 30}px`,
    top: `${yPosition}px`,
    transform: `translate(${translateX}%, ${translateY}%)`,
  }
})

onMounted(() => {
  updateToastSize()
  window.addEventListener('click', setPosition, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('click', setPosition)
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
      'q-toast-stack--placement-bottom-end': placement === 'bottom-end',
      'q-toast-stack--placement-click': placement === 'click'
    }
  ]
})
</script>

<template>
  <div
    class="q-toast-stack"
    :class="classes"
    v-if="toasts.length"
    :style="stylePosition"
    ref="toastRef"
  >
    <q-toast
      class="q-toast-stack__toast"
      v-for="toast in toasts"
      :key="toast.id"
      :class="toast.type"
    >
      <component v-if="toast.component" :is="toast.component" v-bind="toast.props">
        <template
          v-for="(slotFn, slotName) in toast.slots"
          :key="`${toast.id}-${slotName}`"
          v-slot:[slotName]="slotProps"
        >
          <component :is="slotFn" v-bind="slotProps" />
        </template>
      </component>
      <div class="q-toast-stack__message" v-else>{{ toast.message }}</div>
    </q-toast>
  </div>
</template>

<style src="./QToastStack.style.scss" scoped></style>

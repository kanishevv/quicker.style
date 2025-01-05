import type { VNode } from 'vue'
import { markRaw } from 'vue'
import { reactive, defineComponent } from 'vue'

interface Toast {
  id: number
  component?: ReturnType<typeof defineComponent>
  props?: Record<string, any>
  slots?: Record<string, () => VNode>
  message?: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration: number
}

const toasts = reactive<Toast[]>([])

export const useToast = () => {
  const addToast = (options: {
    message?: string
    component?: ReturnType<typeof defineComponent>
    props?: Record<string, any>
    slots?: Record<string, () => VNode>
    type?: 'success' | 'error' | 'info' | 'warning'
    duration?: number
  }) => {
    const id = Date.now()
    const { message, component, props, slots, type = 'info', duration = 3000 } = options

    const rawComponent = component ? markRaw(component) : undefined

    toasts.push({ id, message, component: rawComponent, props, slots, type, duration })

    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  const removeToast = (id: number) => {
    const index = toasts.findIndex((toast) => toast.id === id)
    if (index !== -1) {
      toasts.splice(index, 1)
    }
  }

  return {
    toasts,
    addToast,
    removeToast
  }
}

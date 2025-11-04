import type { VNode } from 'vue'
import { markRaw } from 'vue'
import { reactive, defineComponent } from 'vue'

interface Toast {
  id: string
  component?: ReturnType<typeof defineComponent>
  props?: Record<string, any>
  slots?: Record<string, () => VNode>
  message?: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration: number
  timerId?: ReturnType<typeof setTimeout>
}

const toasts = reactive<Toast[]>([])
const timers = new Map<string, ReturnType<typeof setTimeout>>()

const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export const useToast = () => {
  const addToast = (options: {
    message?: string
    component?: ReturnType<typeof defineComponent>
    props?: Record<string, any>
    slots?: Record<string, () => VNode>
    type?: 'success' | 'error' | 'info' | 'warning'
    duration?: number
  }) => {
    const id = generateId()
    const { message, component, props, slots, type = 'info', duration = 3000 } = options

    const rawComponent = component ? markRaw(component) : undefined

    const toast: Toast = {
      id,
      message,
      component: rawComponent,
      props,
      slots,
      type,
      duration
    }

    if (duration > 0) {
      const timerId = setTimeout(() => {
        removeToast(id)
      }, duration)
      toast.timerId = timerId
      timers.set(id, timerId)
    }

    toasts.push(toast)
  }

  const removeToast = (id: string) => {
    const timerId = timers.get(id)
    if (timerId) {
      clearTimeout(timerId)
      timers.delete(id)
    }

    const index = toasts.findIndex((toast) => toast.id === id)
    if (index !== -1) {
      toasts.splice(index, 1)
    }
  }

  const clearAllToasts = () => {
    timers.forEach((timerId) => {
      clearTimeout(timerId)
    })
    timers.clear()

    toasts.splice(0, toasts.length)
  }

  const cancelAutoRemove = (id: string) => {
    const timerId = timers.get(id)
    if (timerId) {
      clearTimeout(timerId)
      timers.delete(id)

      const toast = toasts.find((t) => t.id === id)
      if (toast) {
        delete toast.timerId
      }
    }
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    cancelAutoRemove
  }
}

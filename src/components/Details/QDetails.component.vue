<script setup lang="ts">
import { ref, computed } from 'vue';
import QIcon from '../Icon/QIcon.component.vue'

type Props = {
    open?: boolean,
    disabled?: boolean
}

const slots = defineSlots()

const props = withDefaults(defineProps<Props>(), {
    open: false,
    disabled: false
})

const open = ref<boolean>(props.open)

const classes = computed(() => {
    const { disabled } = props

    return [
        {
            'q-details--open': open.value,
            'q-details--disabled': disabled
        }
    ]
})

const bodyStyles = () => {
    return {
        height: open.value ? 'auto' : '0'
    }
}

const show = () => {
    if (!open.value && !props.disabled) {
        open.value = true
    }
}

const hide = () => {
    if (open.value && !props.disabled) {
        open.value = false
    }
}

const handleSummaryClick = () => {
    if (open.value) {
        hide()
    } else {
        show()
    }
}
</script>

<template>
    <div class="q-details" :class="classes">
        <div class="q-details__header">
            <div class="q-details__summary" v-if="slots.summary" @click="() => handleSummaryClick()">
                <slot name="summary" />
            </div>
            <span class="q-details__summary-icon">
                <div class="q-details__expand-icon">
                    <slot name="expand-icon">
                        <q-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-chevron-right" viewBox="0 0 16 16" part="svg">
                                <path fill-rule="evenodd"
                                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                </path>
                            </svg>
                        </q-icon>
                    </slot>
                </div>
                <div class="q-details__collapse-icon">
                    <slot name="collapse-icon">
                        <q-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-chevron-right" viewBox="0 0 16 16" part="svg">
                                <path fill-rule="evenodd"
                                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                </path>
                            </svg>
                        </q-icon>
                    </slot>
                </div>
            </span>
        </div>
        <div class="q-details__body" :style="bodyStyles()">
            <transition name="q-details__body-animate" enter-active-class="q-details__body-enter"
                leave-active-class="q-details__body-leave">
                <div class="q-details__content" v-if="slots.content" v-show="open">
                    <slot name="content" />
                </div>
            </transition>
        </div>
    </div>
</template>

<style src="./QDetails.style.scss" lang="scss"></style>
<script setup lang="ts">
import { onMounted, computed, ref, getCurrentInstance } from 'vue'
import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  platform,
  shift,
  size
} from '@floating-ui/dom'
import { offsetParent } from 'composed-offset-position'

const instance = getCurrentInstance()

export interface QPopupProps {
  active: boolean
  placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end'
  strategy: 'absolute' | 'fixed'
  distance: number
  skidding: number
  arrow: boolean
  arrowPlacement: 'start' | 'end' | 'center' | 'anchor'
  arrowPadding: number
  flip: boolean
  flipFallbackPlacements: string
  flipFallbackStrategy: 'best-fit' | 'initial'
  flipBoundary?: Element | Element[]
  flipPadding: number
  shift: boolean
  shiftBoundary: Element | Element[]
  shiftPadding: number
  autoSize: 'horizontal' | 'vertical' | 'both'
  sync: 'width' | 'height' | 'both'
  autoSizeBoundary: Element | Element[]
  autoSizePadding: number
  hoverBridge: boolean
}

const props = withDefaults(defineProps<Partial<QPopupProps>>(), {
  active: false,
  placement: 'top',
  strategy: 'absolute',
  distance: 0,
  skidding: 0,
  arrow: false,
  arrowPlacement: 'anchor',
  arrowPadding: 10,
  flip: false,
  flipFallbackPlacements: '',
  flipFallbackStrategy: 'best-fit',
  flipPadding: 0,
  shift: false,
  shiftPadding: 0,
  autoSizePadding: 0,
  hoverBridge: false
})

const popup = ref<HTMLElement | null>(null)
const anchor = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

const classes = computed(() => {
  const { active, strategy, arrow } = props

  return [
    {
      'q-popup--active': active,
      'q-popup--fixed': strategy === 'fixed',
      'q-popup--has-arrow': arrow
    }
  ]
})

const start = () => {
  if (anchor.value && popup.value) {
    autoUpdate(anchor.value, popup.value, () => reposition())
  }
}

const reposition = () => {
  const { distance, strategy, placement, skidding, sync } = props

  const middleware = [
    // The offset middleware goes first
    offset({ mainAxis: distance, crossAxis: skidding })
  ]

  if (popup.value && anchor.value) {
    if (sync) {
      middleware.push(
        size({
          apply: ({ rects }) => {
            const syncWidth = sync === 'width' || sync === 'both'
            const syncHeight = sync === 'height' || sync === 'both'
            if (popup.value) {
              popup.value.style.width = syncWidth ? `${rects.reference.width}px` : ''
              popup.value.style.height = syncHeight ? `${rects.reference.height}px` : ''
            }
          }
        })
      )
    } else {
      // Cleanup styles if we're not matching width/height
      popup.value.style.width = ''
      popup.value.style.height = ''
    }

    // Then we flip
    if (props.flip) {
      middleware.push(
        flip({
          boundary: props.flipBoundary,
          // @ts-expect-error - We're converting a string attribute to an array here
          fallbackPlacements: props.flipFallbackPlacements,
          fallbackStrategy:
            props.flipFallbackStrategy === 'best-fit' ? 'bestFit' : 'initialPlacement',
          padding: props.flipPadding
        })
      )
    }

    if (props.shift) {
      middleware.push(
        shift({
          boundary: props.shiftBoundary,
          padding: props.shiftPadding
        })
      )
    }

    if (props.autoSize) {
      middleware.push(
        size({
          boundary: props.autoSizeBoundary,
          padding: props.autoSizePadding,
          apply: ({ availableWidth, availableHeight }) => {
            if (props.autoSize === 'vertical' || props.autoSize === 'both') {
              popup.value?.style.setProperty('--auto-size-available-height', `${availableHeight}px`)
            } else {
              popup.value?.style.removeProperty('--auto-size-available-height')
            }

            if (props.autoSize === 'horizontal' || props.autoSize === 'both') {
              popup.value?.style.setProperty('--auto-size-available-width', `${availableWidth}px`)
            } else {
              popup.value?.style.removeProperty('--auto-size-available-width')
            }
          }
        })
      )
    } else {
      // Cleanup styles if we're no longer using auto-size
      popup.value.style.removeProperty('--auto-size-available-width')
      popup.value.style.removeProperty('--auto-size-available-height')
    }

    if (props.arrow && arrowRef.value) {
      middleware.push(
        arrow({
          element: arrowRef.value,
          padding: props.arrowPadding
        })
      )
    }

    const getOffsetParent =
      strategy === 'absolute'
        ? (element: Element) => platform.getOffsetParent(element, offsetParent)
        : platform.getOffsetParent

    computePosition(anchor.value, popup.value, {
      placement: placement,
      middleware,
      strategy: strategy,
      platform: {
        ...platform,
        getOffsetParent
      }
    }).then(({ x, y, middlewareData, placement }) => {
      //
      // Even though we have our own localization utility, it uses different heuristics to determine RTL. Because of
      // that, we'll use the same approach that Floating UI uses.
      //
      // Source: https://github.com/floating-ui/floating-ui/blob/cb3b6ab07f95275730d3e6e46c702f8d4908b55c/packages/dom/src/utils/getDocumentRect.ts#L31
      //
      // const isRtl = this.matches(':dir(rtl)')
      const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[
        placement.split('-')[0]
      ]!

      if (popup.value) {
        Object.assign(popup.value.style, {
          left: `${x}px`,
          top: `${y}px`
        })
      }

      if (props.arrow) {
        const arrowX = middlewareData.arrow!.x
        const arrowY = middlewareData.arrow!.y
        let top = ''
        let right = ''
        let bottom = ''
        let left = ''

        if (props.arrowPlacement === 'start') {
          // Start
          const value =
            typeof arrowX === 'number'
              ? `calc(${props.arrowPadding}px - var(--arrow-padding-offset))`
              : ''
          top =
            typeof arrowY === 'number'
              ? `calc(${props.arrowPadding}px - var(--arrow-padding-offset))`
              : ''
          right = ''
          left = value
        } else if (props.arrowPlacement === 'end') {
          // End
          const value =
            typeof arrowX === 'number'
              ? `calc(${props.arrowPadding}px - var(--arrow-padding-offset))`
              : ''
          right = ''
          left = value
          bottom =
            typeof arrowY === 'number'
              ? `calc(${props.arrowPadding}px - var(--arrow-padding-offset))`
              : ''
        } else if (props.arrowPlacement === 'center') {
          // Center
          left = typeof arrowX === 'number' ? `calc(50% - var(--arrow-size-diagonal))` : ''
          top = typeof arrowY === 'number' ? `calc(50% - var(--arrow-size-diagonal))` : ''
        } else {
          // Anchor (default)
          left = typeof arrowX === 'number' ? `${arrowX}px` : ''
          top = typeof arrowY === 'number' ? `${arrowY}px` : ''
        }

        if (arrowRef.value) {
          Object.assign(arrowRef.value.style, {
            top,
            right,
            bottom,
            left,
            [staticSide]: 'calc(var(--arrow-size-diagonal) * -1)'
          })
        }
      }
    })
  }
}

// onUpdated(() => start())

onMounted(() => {
  if (instance) {
    anchor.value = instance.subTree.el?.nextElementSibling
    start()
  }
})
</script>

<template>
  <slot name="anchor" />

  <div ref="popup" class="q-popup" :class="classes">
    <slot />
    <div ref="arrowRef" class="q-popup__arrow" v-if="props.arrow"></div>
  </div>
</template>

<style src="./QPopup.style.scss" lang="scss" scoped></style>

<script setup lang="ts">
import { computed } from 'vue'

const slots = defineSlots()

const classes = computed(() => {
  return [
    {
      'q-card--has-footer': slots.footer,
      'q-card--has-picture': slots.image,
      'q-card--has-header': slots.header
    }
  ]
})
</script>

<template>
  <div class="q-card" :class="classes">
    <picture class="q-card__picture" v-if="slots.image">
      <slot name="image" />
    </picture>
    <div class="q-card__header" v-if="slots.header">
      <slot name="header" />
    </div>
    <div class="q-card__body" v-if="slots.default">
      <slot />
    </div>
    <div class="q-card__footer" v-if="slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style src="./QCard.style.scss" lang="scss"></style>

<script setup lang="ts">
import { computed } from 'vue'

export interface QAvatarProps {
  image?: string
  label?: string
  loading?: 'eager' | 'loading'
  initials?: string
  shape?: 'circle' | 'square' | 'rounded'
}

const props = withDefaults(defineProps<QAvatarProps>(), {
  shape: 'circle',
  loading: 'eager'
})

const classes = computed(() => {
  const { shape } = props

  return [
    {
      'q-avatar--circle': shape === 'circle',
      'q-avatar--square': shape === 'square',
      'q-avatar--rounded': shape === 'rounded'
    }
  ]
})
</script>

<template>
  <div class="q-avatar" :class="classes" :aria-label="label">
    <img class="q-avatar__image" :src="image" alt="" v-if="image" />
    <div class="q-avatar__initials" v-else-if="!image && initials">{{ initials }}</div>
  </div>
</template>

<style src="./QAvatar.style.scss" lang="scss"></style>

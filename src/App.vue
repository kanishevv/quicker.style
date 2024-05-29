<script setup lang="ts">
import QCard from '@/components/Card/QCard'
</script>

<template>
  <q-card>
    <template #image>
      <img
        src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
        alt="A kitten sits patiently between a terracotta pot and decorative grasses."
      />
    </template>

    <strong>Mittens</strong><br />
    This kitten is as cute as he is playful. Bring him home today!<br />
    <small>6 weeks old</small>

    <template #footer> Footer </template>
  </q-card>
</template>

<style>
.box {
  width: 100px;
  height: 100px;
  margin: 10px;
}

.green {
  background-color: green;
}
</style>

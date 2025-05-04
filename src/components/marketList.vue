<template>
  <h2>Market</h2>
  <ul>
    <li v-for="item in items" :key="item.id">
      <span>{{ item.name }} - {{ item.type }} - {{ item.description }} </span>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const items = ref([])
const urlMarket = 'https://api-game.bloque.app/game/market'

onMounted(async () => {
  try {
    const response = await fetch(urlMarket)
    const data = await response.json()
    items.value = data.items
  } catch (error) {
    console.error('1: Error fetching market data:', error)
  }
})
</script>

<style lang="scss" scoped></style>

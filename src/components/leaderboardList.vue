<template>
  <div>
    <h2>Leaderboard</h2>
    <ul>
      <li v-for="player in players" :key="player.username">
        <span v-if="player.xp > 0">
          {{ player.rank }} - {{ player.level }} - {{ player.username }} - {{ player.xp }} -
          {{ player.gold }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const players = ref([])
const urlLeaderboard = 'https://api-game.bloque.app/game/leaderboard'

onMounted(async () => {
  try {
    const response = await fetch(urlLeaderboard)
    const data = await response.json()
    players.value = data.players
  } catch (error) {
    console.error('1: Error fetching leaderboard data:', error)
  }
})
</script>

<style lang="scss" scoped></style>

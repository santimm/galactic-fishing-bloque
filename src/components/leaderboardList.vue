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
import { fetchWithCache } from '@/services/apiCache'
import { ref, onMounted } from 'vue'

const players = ref([])
const urlLeaderboard = 'https://api-game.bloque.app/game/leaderboard'

onMounted(async () => {
  try {
    const data = await fetchWithCache(urlLeaderboard, 'leaderboardCache')
    players.value = data?.players || []
  } catch (error) {
    console.error('1: Error fetching leaderboard data:', error)
  }
})
</script>

<style lang="scss" scoped></style>

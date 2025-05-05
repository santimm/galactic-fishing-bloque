<template>
  <div class="market">
    <h2 class="market__title">Market</h2>
    <ul class="market__list">
      <li
        class="market__list-card"
        :class="'market__list-card--' + item.type"
        v-for="item in items"
        :key="item.id"
      >
        <h3 class="market__list-card--name">{{ item.name }}</h3>
        <img
          class="market__list-card--picture"
          :src="`/images/market/${item.type}.png`"
          :alt="item.name"
        />
        <p class="market__list-card--description">{{ item.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { fetchWithCache } from '@/services/apiCache'
import { ref, onMounted } from 'vue'

const items = ref([])
const urlMarket = 'https://api-game.bloque.app/game/market'

onMounted(async () => {
  try {
    const data = await fetchWithCache(urlMarket, 'marketCache')
    items.value = data?.items || []
  } catch (error) {
    console.error('1: Error fetching leaderboard data:', error)
  }
})
</script>

<style lang="less" scoped>
.market {
  padding: 0 16px;
  margin-top: 60px;

  &__title {
    font-weight: 500;
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  &__list {
    padding: 0;
    margin: 0;
    &-card {
      display: grid;
      justify-items: center;
      margin-bottom: 28px;
      padding: 12px;

      background-color: fade(@bg-light-green, 30%);
      border: 2px solid @ui-red;
      border-radius: 8px;
      box-shadow: 0 0 10px @ui-red;

      font-family: @font-mono;
      color: @ui-gold;
      text-align: center;
      &--name {
        margin-bottom: 30px;

        color: @ui-gold;
        font-weight: bold;
        font-size: 1.25rem;
      }
      &--description {
        padding-top: 20px;
        margin-bottom: 16px;
        font-size: 0.875rem;
        color: @ui-gold;
      }
    }
    &-card--fishing_rod {
      border: 2px solid @ui-blue;
      box-shadow: 0 0 10px @ui-blue;
    }
  }
}
</style>

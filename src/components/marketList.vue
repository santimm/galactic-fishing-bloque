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
          :src="resolveBasePath(`images/market/${item.type}.png`)"
          :alt="item.name"
        />
        <p class="market__list-card--description">{{ item.description }}</p>
        <p class="market__list-card--cost">{{ item.cost }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { fetchWithCache } from '@/services/apiCache'
import { resolveBasePath } from '@/utils/pathHelper'
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
  margin: 60px 0;

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
      &--cost {
        font-size: 1.2rem;
        font-weight: bold;
        color: @ui-gold;
        &::before {
          content: '';
          display: inline-block;
          width: 14px;
          height: 14px;
          background-color: #f5dc35;
          border-radius: 50%;
          margin-right: 8px;
        }
      }
    }
    &-card--fishing_rod {
      border: 2px solid @ui-blue;
      box-shadow: 0 0 10px @ui-blue;
    }
  }
}
@media screen and (min-width: @brakepoint-tablet) {
  .market {
    &__list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      &-card {
        margin-bottom: 0;
        padding: 16px;
        &--name {
          margin-bottom: 16px;
        }
        &--description {
          padding-top: 0;
          margin: 22px 0;
        }
      }
    }
  }
}
@media screen and (min-width: @brakepoint-desktop) {
  .market {
    padding: 0 64px;
    &__list {
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }
  }
}
@media screen and (min-width: @brakepoint-desktop-lg) {
  .market {
    padding: 0 128px;
    &__list {
      grid-template-columns: repeat(6, 1fr);
      gap: 60px;
    }
  }
}
</style>

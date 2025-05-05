<template>
  <div class="leaderboard">
    <h2 class="leaderboard__title">Leaderboard</h2>
    <ul class="leaderboard__list">
      <li
        class="leaderboard__list-card"
        :class="{ 'leaderboard__list-card--champ': player.rank < 4 }"
        v-for="player in players.filter((player) => player.xp > 0)"
        :key="player.username"
      >
        <p class="leaderboard__list-card--rank">
          <span class="icon"></span>{{ player.rank }}/{{ players.at(-1)?.rank || 'N/A' }}
        </p>
        <p class="leaderboard__list-card--username">{{ player.username }}</p>
        <p class="leaderboard__list-card--gold">{{ player.gold }}</p>
        <p class="leaderboard__list-card--xp"><sub>xp</sub> {{ player.xp }}</p>
        <p class="leaderboard__list-card--level"><sub>lvl</sub> {{ player.level }}</p>
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

<style lang="less" scoped>
.leaderboard {
  padding: 0 16px;
  &__title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  &__list {
    position: relative;
    padding: 16px;
    margin: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 80vh;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 90%, @bg-emerald-light 99%);

    &-card {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      row-gap: 2px;

      padding: 10px;
      margin-bottom: 1rem;
      background-color: fade(@bg-light-green, 30%);
      border-radius: 10px;
      box-shadow: -1px 1px 0px @bg-light-green;
      &--rank {
        .icon {
          position: relative;
          display: inline-block;
          vertical-align: top;
          width: 16px;
          height: 16px;
          margin-right: 6px;
          background-color: @bg-grey;
          border-radius: 50%;
          overflow: hidden;
          &::before {
            position: absolute;
            content: '';
            top: 4px;
            left: 0;
            right: 0;
            margin: auto;
            width: 6px;
            height: 6px;
            background-color: @bg-dark-green;
            border-radius: 50%;
          }
          &::after {
            position: absolute;
            content: '';
            bottom: -2px;
            left: 0;
            right: 0;
            margin: auto;
            width: 10px;
            height: 9px;
            background-color: @bg-dark-green;
            border-radius: 50%;
          }
        }
      }
      &--username {
        grid-column: 2 / -1;
        text-align: justify;

        font-weight: bold;
        font-size: 1.125rem;
      }
      &--gold {
        grid-column: 1 / 2;
        align-self: end;

        &::before {
          content: '';
          display: inline-block;
          width: 14px;
          height: 14px;
          background-color: @ui-yellow;
          border-radius: 50%;
          margin-right: 8px;
        }
      }
      &--xp {
        grid-column: 2 / 3;
        text-align: justify;
        align-self: end;

        color: fade(@bg-grey, 50%);

        sub {
          font-size: 0.75rem;
          vertical-align: baseline;
        }
      }
      &--level {
        grid-column: 3 / 3;
        place-self: end;

        font-size: 1.5rem;
        sub {
          font-size: 0.75rem;
          vertical-align: baseline;
        }
      }
    }
    &-card--champ {
      position: relative;
      height: 260px;
      margin-bottom: 60px;
      row-gap: 12px;
      .leaderboard__list-card--username {
        grid-column: 1 / 2;
        grid-row: 3 / 3;
      }
      .leaderboard__list-card--good {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
      }
      .leaderboard__list-card--xp {
        grid-column: 3 / 3;
        grid-row: 2 / 3;
        text-align: right;
      }
      .leaderboard__list-card--level {
        grid-column: 3 / 3;
        grid-row: 3 / 3;
      }
      &::before {
        content: '';
        position: absolute;
        background-repeat: no-repeat;
        background-size: contain;
        z-index: 0;
      }
      &:nth-child(1) {
        &::before {
          top: -20px;
          right: -20px;
          width: 320px;
          height: 100%;
          background-image: url(/images/leaderboard/StarDestroyer-opt.png);
        }
      }
      &:nth-child(2) {
        &::before {
          top: -40px;
          right: -30px;
          width: 286px;
          height: 100%;
          background-image: url(/images/leaderboard/darthVader-fighter-opt.png);
        }
      }
      &:nth-child(3) {
        &::before {
          top: -20px;
          right: 30px;
          width: 180px;
          height: 100%;
          background-image: url(/images/leaderboard/imperialShuttle-opt.png);
        }
      }
    }
  }
}
</style>

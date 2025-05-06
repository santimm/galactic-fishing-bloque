<template>
  <div class="leaderboard">
    <h2 class="leaderboard__title">Leaderboard</h2>
    <ul class="leaderboard__list">
      <li
        class="leaderboard__list-card leaderboard__list-card--champ"
        v-for="player in players.filter((player) => player.rank < 4)"
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
      <div class="leaderboard__list--non-champ-box">
        <li
          class="leaderboard__list-card"
          v-for="player in players.filter((player) => player.rank >= 4 && player.xp > 0)"
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
      </div>
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
    font-weight: 500;
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  &__list {
    position: relative;
    padding: 16px;
    margin: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 80vh;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 90%, @bg-emerald-light 99%);
    border-radius: 0 0 10px 10px;

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
          opacity: 0;
          animation:
            slideIn 0.5s 1s cubic-bezier(0.5, 0, 0, 1),
            opacity 1.5s 1s linear forwards;
        }
      }
      &:nth-child(2) {
        &::before {
          top: -40px;
          right: -30px;
          width: 286px;
          height: 100%;
          background-image: url(/images/leaderboard/darthVader-fighter-opt.png);
          opacity: 0;
          animation:
            slideIn 1s 1s cubic-bezier(0.5, 0, 0, 1),
            opacity 1.5s 1s linear forwards;
        }
      }
      &:nth-child(3) {
        &::before {
          top: -20px;
          right: 30px;
          width: 180px;
          height: 100%;
          background-image: url(/images/leaderboard/imperialShuttle-opt.png);
          opacity: 0;
          animation:
            slideIn 1.5s 1s cubic-bezier(0.5, 0, 0, 1),
            opacity 1.5s 1s linear forwards;
        }
      }
    }
  }
}
@media screen and (min-width: @brakepoint-tablet) {
  .leaderboard {
    &__list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      &--non-champ-box {
        display: grid;
        grid-column: 1 / -1;
        grid-template-columns: 1fr 1fr;
        column-gap: 16px;
      }
      &-card {
        padding: 16px;
      }
      &-card--champ {
        font-size: 1.4rem;
        margin-bottom: 18px;
        .leaderboard__list-card--rank {
          .icon {
            vertical-align: middle;
          }
        }
        &:nth-child(1) {
          grid-column: 1 / -1;
          &::before {
            top: -28px;
            right: -20px;
            width: 420px;
          }
        }
        &:nth-child(2) {
          margin-right: 9px;
        }
        &:nth-child(3) {
          margin-left: 9px;
        }
      }
    }
  }
}
@media screen and (min-width: @brakepoint-desktop) {
  .leaderboard {
    padding: 0 64px;
    &__list {
      &-card--champ {
        &:nth-child(1) {
          font-size: 2rem;
          .leaderboard__list-card--username,
          .leaderboard__list-card--level {
            font-size: 2rem;
          }
          &::before {
            top: -28px;
            right: 120px;
            width: 620px;
          }
        }
      }
    }
  }
}
@media screen and (min-width: @brakepoint-desktop-lg) {
  .leaderboard {
    padding: 0 128px;
    &__list {
      height: 800px;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, auto);
      gap: 40px;
      overflow: hidden;
      background: none;

      &--non-champ-box {
        display: initial;
        grid-column: 3 / 3;
        grid-row: 1 / -1;
        height: 610px;
        overflow-y: scroll;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 90%, @bg-emerald-light 99%);
        border-radius: 0 0 10px 10px;

        .leaderboard__list-card {
          margin-bottom: 20px;
        }
      }
      &-card {
        grid-column: 1 / 3;
        margin-bottom: 0;
        padding: 16px;
      }
      &-card:not(.leaderboard__list-card--champ) {
        grid-column: 3 / 4;
        overflow-y: auto;
        max-height: 300px;
      }
      &-card--champ {
        grid-column: 1 / 3;

        &:nth-child(1) {
          grid-column: 1 / 3;
          height: auto;
          &::before {
            right: 30%;
            width: 600px;
          }
        }
        &:nth-child(2) {
          grid-column: 1 / 2;
          grid-row: 2 / 2;
        }
        &:nth-child(3) {
          grid-column: 2 / 3;
          grid-row: 2 / 2;
        }
      }
    }
  }
}
@keyframes opacity {
  0% {
    opacity: 0;
    visibility: hidden;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
}
@keyframes slideIn {
  0% {
    transform: translateX(150%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>

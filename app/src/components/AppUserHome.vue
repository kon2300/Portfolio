<template>
  <div>
    <div v-if="profile">
      <div class="flex justify-center font-black text-4xl">
        {{ profile.name }}のHOME
      </div>
    </div>

    <div class="container mx-auto relative">
      <div class="grid h-screen my-2 sm:h-96 sm:grid-flow-col sm:grid-cols-2">
        <template v-if="!myArticles.length">
          <div class="text-4xl items-center grid">
            投稿するとチャートが表示されます
          </div>
        </template>
        <template v-if="myArticles.length">
          <div
            class="
              border-4 border-r-0 border-yellow-300
              grid
              items-center
              justify-center
            "
          >
            <canvas id="canvas1" class="bg-white"></canvas>
          </div>

          <div
            class="border-4 border-yellow-300 grid items-center justify-center"
          >
            <canvas id="canvas2" class="bg-white"></canvas>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, onUpdated } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { renderTotalSpending, renderMonthlySpending } from '@/include/chart'

const store = useStore()
const router = useRouter()
const route = useRoute()
const user = computed(() => store.state.auth.user)
const myArticles = computed(() => store.state.articles.article)
const profile = computed(() => store.state.profile.detail)

onMounted(async () => {
  await store.dispatch('showProfile')
  const doneCreateProfile = computed(() => store.state.profile.detail)
  if (!doneCreateProfile.value) {
    router.push({ name: 'create-profile', params: { id: route.params.id } })
  }
  await store.dispatch('showMyArticles', user.value)

  const totalSpendingData = Object.values(myArticles.value).reduce(
    (prev, current) => {
      return prev + current.total_expenses
    },
    0
  )
  if (myArticles.value.length) {
    console.log('my')
    renderTotalSpending('canvas1', totalSpendingData)
  }

  const monthlySpendingData = myArticles.value.map((article) => {
    return article.total_expenses
  })
  const monthlySpendingLabel = myArticles.value.map((article) => {
    return `${article.time.year}年${article.time.month}月`
  })
  if (myArticles.value.length) {
    renderMonthlySpending('canvas2', monthlySpendingData, monthlySpendingLabel)
  }
})
</script>

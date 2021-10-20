<template>
  <div>
    <div class="flex justify-center">HOME</div>

    <div class="container mx-auto relative">
      <div
        class="
          box-border
          border-4
          grid
          h-screen
          sm:h-96 sm:grid-flow-col sm:grid-cols-2
        "
      >
        <template v-if="!myArticles.length">
          <div class="text-4xl items-center grid">
            投稿するとチャートが表示されます
          </div>
        </template>
        <template v-if="myArticles.length">
          <div class="box-border border-4 grid items-center justify-center">
            <canvas :id="myArticles[0]" class="bg-white"></canvas>
          </div>

          <div class="box-border border-4 grid items-center justify-center">
            <canvas :id="myArticles[0] + 1" class="bg-white"></canvas>
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

onMounted(() => {
  store.dispatch('showProfile')
  const doneCreateProfile = computed(() => store.state.profile.detail)
  if (!doneCreateProfile.value) {
    router.push({ name: 'create-profile', params: { id: route.params.id } })
  }
  store.dispatch('showMyArticles', user.value)
})
const myArticles = computed(() => store.state.articles.myArticle)

onUpdated(() => {
  const totalSpendingData = Object.values(myArticles.value).reduce(
    (prev, current) => {
      return prev + current.total_expenses
    },
    0
  )
  if (myArticles.value.length) {
    renderTotalSpending(myArticles.value[0], totalSpendingData)
  }

  const monthlySpendingData = myArticles.value.map((article) => {
    return article.total_expenses
  })
  const monthlySpendingLabel = myArticles.value.map((article) => {
    return `${article.time.year}年${article.time.month}月`
  })
  if (myArticles.value.length) {
    renderMonthlySpending(
      myArticles.value[0] + 1,
      monthlySpendingData,
      monthlySpendingLabel
    )
  }
})
</script>

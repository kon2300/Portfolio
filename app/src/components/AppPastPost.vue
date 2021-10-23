<template>
  <div>
    <div class="p-3 flex justify-center text-3xl">過去の投稿</div>
    <div v-for="article in allArticle" :key="article.id">
      <div class="container mx-auto relative bg-yellow-100 mb-10">
        <div
          class="
            flex flex-col
            md:grid md:grid-flow-col md:grid-rows-3 md:grid-cols-4
          "
        >
          <div
            class="
              order-last
              row-span-2
              md:row-span-3 md:col-span-2 md:order-none
              box-border
              border-4
            "
          >
            <canvas :id="article.id" class="m-4 md:m-0"></canvas>
          </div>

          <div
            class="
              row-span-1
              md:col-span-2
              box-border
              border-4
              grid
              justify-items-center
              items-center
              font-bold
            "
          >
            <div class="box-border border-4">
              <span class="text-xl">{{ `${article.time.year}年` }} </span>
              <span class="text-xl"
                >{{ `${article.time.month}月の家計簿` }}
              </span>
            </div>
            <div class="box-border border-4">
              <span class="text-xl">{{ article.name }} </span>
              <span class="text-xs">@{{ article.user_id }}</span>
            </div>
            <div class="box-border border-4 flex">
              <span>月収:{{ article.annual_income }}</span>
            </div>
            <div class="flex">
              <div class="box-border border-4 flex">
                <span>世帯人数:{{ article.family_members }}</span>
              </div>
              <div class="box-border border-4 flex">
                <span>年齢:{{ article.age }}</span>
              </div>
            </div>
            <div class="box-border border-4 flex">
              <span>今月の合計支出</span>
            </div>
          </div>

          <div
            class="
              row-span-2
              md:col-span-2
              box-border
              border-4
              grid grid-flow-col grid-rows-5
              justify-items-center
              items-center
            "
          >
            <div class="box-boder border-4">
              家賃:￥{{ article.rent_expenses }}
            </div>
            <div class="box-boder border-4">
              食費:￥{{ article.food_expenses }}
            </div>
            <div class="box-boder border-4">
              日用品費:￥{{ article.householeditem_expenses }}
            </div>
            <div class="box-boder border-4">
              水道,光熱費:￥{{ article.utility_expenses }}
            </div>
            <div class="box-boder border-4">
              通信費:￥{{ article.internet_expenses }}
            </div>
            <div class="box-boder border-4">
              教育,教養費:￥{{ article.riberalarts_expenses }}
            </div>
            <div class="box-boder border-4">
              医療,保険費:￥{{ article.insurance_expenses }}
            </div>
            <div class="box-boder border-4">
              交際費:￥{{ article.entertainment_expenses }}
            </div>
            <div class="box-boder border-4">
              美容,娯楽,衣服費:￥{{ article.free_expenses }}
            </div>
            <div class="box-boder border-4">コメント:{{ article.comment }}</div>
          </div>

          <div v-if="user">
            <div v-if="article.user_id === user" class="absolute right-2 top-2">
              <div class="flex">
                <HeartIcon class="h-6 w-6 relative text-yellow-500" />
                {{ Object.keys(article.like).length }}
              </div>
            </div>

            <div
              v-if="article.user_id === user"
              class="absolute right-2 bottom-2"
            >
              <button @click="editArticle(article.id)">
                <PencilIcon class="h-6 w-6 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ThumbUpIcon, HeartIcon, PencilIcon } from '@heroicons/vue/solid'
import { onMounted, computed, onUpdated } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { renderChartDougnut } from '@/include/chart'
import router from '../router'

const store = useStore()
onMounted(() => {
  store.dispatch('showMyAllArticle', user.value)
})
onUpdated(() => {
  allArticle.value.forEach((article) => {
    const targetArticle = article.id
    const data = [
      {
        家賃: article.rent_expenses,
        食費: article.food_expenses,
        日用品費: article.householeditem_expenses,
        '水道,光熱費': article.utility_expenses,
        通信費: article.internet_expenses,
        '教育,教養費': article.riberalarts_expenses,
        '医療,保険費': article.insurance_expenses,
        交際費: article.entertainment_expenses,
        '美容,娯楽,医療費': article.free_expenses,
      },
    ]
    renderChartDougnut(targetArticle, data)
  })
})

const allArticle = computed(() => store.state.articles['myAllArticle'])
const user = computed(() => store.state.auth.user)

const editArticle = (article_id) => {
  router.push({ name: 'edit-article', params: { id: article_id } })
}
</script>

<style></style>

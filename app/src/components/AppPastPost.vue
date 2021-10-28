<template>
  <div>
    <div class="p-3 flex justify-center text-3xl">過去の投稿</div>
    <div v-for="article in allArticle" :key="article.id">
      <div
        class="
          container
          mx-auto
          relative
          bg-yellow-100
          mb-10
          rounded-3xl
          border-4 border-yellow-300
          lg:w-3/4
        "
      >
        <div
          class="
            flex flex-col
            md:grid md:grid-flow-col md:grid-rows-1 md:grid-cols-3
          "
        >
          <div
            class="md:col-span-2 md:grid grid-flow-col grid-rows-2 grid-cols-2"
          >
            <div
              class="
                row-span-1
                col-span-1
                grid
                justify-items-stretch
                text-center
                font-bold
                border-b-4 border-yellow-300
                divide-y-2 divide-yellow-200 divide-dashed
                md:col-span-1
              "
            >
              <div>
                <span class="text-xl">{{ `${article.time.year}年` }} </span>
                <span class="text-xl"
                  >{{ `${article.time.month}月の家計簿` }}
                </span>
              </div>
              <div>
                <span class="text-xl">{{ article.name }} </span>
                <span class="text-xs">@{{ article.user_id }}</span>
              </div>
              <div>
                <span>月収:{{ article.annual_income }}</span>
              </div>
              <div>
                <span>世帯人数:{{ article.family_members }}</span>
              </div>
              <div>
                <span>年齢:{{ article.age }}</span>
              </div>
            </div>

            <div
              class="
                row-span-1
                col-span-2
                grid grid-flow-col grid-rows-2
                gap-3
                m-1
              "
            >
              <div
                class="
                  rounded-full
                  border-red-300
                  p-2
                  border-4 border-opacity-80
                "
              >
                <p>家賃</p>
                <p>￥{{ article.rent_expenses }}</p>
              </div>
              <div
                class="
                  rounded-full
                  border-yellow-600
                  p-2
                  border-4 border-opacity-80
                "
              >
                <p>食費</p>
                <p>￥{{ article.food_expenses }}</p>
              </div>
              <div
                class="
                  rounded-full
                  border-green-300
                  p-2
                  border-4 border-opacity-80
                "
              >
                <p>日用品費</p>
                <p>￥{{ article.householeditem_expenses }}</p>
              </div>
              <div
                class="
                  rounded-full
                  border-blue-300
                  p-2
                  border-4 border-opacity-80
                "
              >
                <p>水道,光熱費</p>
                <p>￥{{ article.utility_expenses }}</p>
              </div>
              <div
                class="
                  rounded-full
                  border-pink-700
                  p-2
                  border-4 border-opacity-80
                "
              >
                <p>通信費</p>
                <p>￥{{ article.internet_expenses }}</p>
              </div>
              <div
                class="
                  rounded-full
                  border-green-100
                  p-2
                  border-4 border-opacity-80
                "
              >
                <p>教育,教養費</p>
                <p>￥{{ article.riberalarts_expenses }}</p>
              </div>
              <div
                class="
                  rounded-full
                  border-red-600
                  p-2
                  border-4 border-opacity-80
                "
              >
                <p>医療,保険費</p>
                <p>￥{{ article.insurance_expenses }}</p>
              </div>
              <div
                class="
                  rounded-full
                  border-purple-300
                  p-2
                  border-4 border-opacity-80
                "
              >
                <p>交際費</p>
                <p>￥{{ article.entertainment_expenses }}</p>
              </div>
              <div
                class="
                  rounded-full
                  border-indigo-800
                  p-2
                  border-4 border-opacity-80
                "
              >
                <p>美容,娯楽,衣服費</p>
                <p>￥{{ article.free_expenses }}</p>
              </div>
            </div>

            <div
              class="
                col-span-1
                row-span-1
                md:border-b-4 md:border-l-4 md:border-yellow-300
              "
            >
              <div class="p-2">
                <p>コメント:</p>
                <p class="font-mono">{{ article.comment }}</p>
              </div>
            </div>
          </div>

          <div
            class="
              row-span-2
              border-t-4 border-yellow-300
              md:border-t-0 md:border-l-4 md:row-span-1 md:col-span-1
              grid
              items-center
            "
          >
            <canvas :id="article.id" class="m-4 md:m-0"></canvas>
          </div>

          <div
            v-if="user"
            class="absolute group -right-0 md:-right-8 -bottom-10"
          >
            <InformationCircleIcon class="h-6 w-6 text-yellow-700" />
            <div
              class="
                invisible
                group-hover:visible
                bg-yellow-200
                h-16
                w-16
                rounded-3xl
              "
            >
              <div v-if="article.user_id === user">
                <div class="flex absolute right-4">
                  <HeartIcon class="h-6 w-6 text-yellow-500" />
                  {{ Object.keys(article.like).length }}
                </div>
              </div>

              <div
                v-if="article.user_id === user"
                class="absolute right-5 -bottom-1"
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
  </div>
</template>

<script setup>
import {
  InformationCircleIcon,
  ThumbUpIcon,
  HeartIcon,
  PencilIcon,
} from '@heroicons/vue/solid'
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

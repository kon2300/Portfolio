<template>
  <div>
    <div class="p-3 flex justify-center text-3xl">みんなの投稿</div>
    <div v-for="article in allArticle" :key="article.id">
      <div class="container mx-auto relative">
        <div
          class="
            box-border
            border-4
            grid grid-rows-5 grid-flow-col
            sm:grid-rows-3 sm:grid-cols-4
          "
        >
          <div
            class="
              order-last
              row-span-2
              sm:row-span-3 sm:col-span-2 sm:order-none
              box-border
              border-4
              grid
              items-center
              justify-center
            "
          >
            グラフ
          </div>

          <div
            class="
              row-span-1
              sm:col-span-2
              box-border
              border-4
              grid
              justify-items-center
              items-center
            "
          >
            <div class="box-border border-4 flex">
              <span>name</span>
            </div>
            <div class="box-border border-4 flex">
              <span>世帯人数</span>
            </div>
            <div class="box-border border-4 flex">
              <span>月収</span>
            </div>
            <div class="box-border border-4 flex">
              <span>今月の合計支出</span>
            </div>
          </div>

          <div
            class="
              row-span-2
              sm:col-span-2
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

          <div class="absolute right-2 top-2">
            <ThumbUpIcon class="h-6 w-6 text-white" />
          </div>
          <!-- <div class="absolute right-2 top-2">
          <HeartIcon class="h-6 w-6 text-red-500" />
        </div> -->
          <div class="absolute right-2 bottom-2">
            <PencilIcon class="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ThumbUpIcon, HeartIcon, PencilIcon } from '@heroicons/vue/solid'
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onMounted(() => {
  store.dispatch('showAllArticles')
})

const allArticle = computed(() => store.state.articles['allArticle'])
</script>

<style></style>

<template>
  <div class="flex justify-center items-center space-x-5 bg-yellow-200">
    <div class="relative">
      <ChevronLeftIcon class="h-8 w-8" aria-hidden="true" />
    </div>

    <div v-if="pageNumber !== 1">
      <router-link
        :to="{
          name: 'everybodys-posts',
          params: { pageNumber: pageNumber - 1 },
        }"
        class="font-bold text-3xl btn-action"
      >
        {{ pageNumber - 1 }}
      </router-link>
    </div>

    <router-link
      :to="{
        name: 'everybodys-posts',
        params: { pageNumber: pageNumber },
      }"
      class="font-bold text-3xl"
    >
      {{ pageNumber }}
    </router-link>

    <div v-if="pageNumber !== allArticleCount">
      <router-link
        :to="{
          name: 'everybodys-posts',
          params: { pageNumber: pageNumber + 1 },
        }"
        class="font-bold text-3xl btn-action"
      >
        {{ pageNumber + 1 }}
      </router-link>
    </div>

    <div class="relative">
      <ChevronRightIcon class="h-8 w-8" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import { computed } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()

const pageNumber = computed(() => Number(route.params.pageNumber))

const allArticleCount = computed(() => store.state.articles.allArticleCount)
</script>

<style></style>

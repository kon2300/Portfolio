<template>
  <div class="relative">
    <div
      v-if="user"
      class="absolute justify-end text-gray-700 top-3 right-3 sm:right-11"
    >
      <button class="btn btn-action" @click="searchModalToggle">検索</button>
    </div>
    <AppAllPost />
    <AppPaginationAllPost />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import AppAllPost from '@/components/AppAllPost.vue'
import AppPaginationAllPost from '@/components/AppPaginationAllPost.vue'
import { computed } from '@vue/reactivity'

const store = useStore()
const searchModalToggle = () => store.commit('SEARCH_MODAL_TOGGLE')
const user = computed(() => store.state.auth.user)
</script>

<style></style>

<template>
  <div class="flex justify-end text-white pr-5">
    <button class="btn hover:bg-yellow-400" @click="searchModalToggle">
      検索
    </button>
  </div>
  <AppModalSearch />
  <AppAllPost />
</template>

<script setup>
import { useStore } from 'vuex'
import AppModalSearch from '../components/AppModalSearch.vue'
import AppAllPost from '../components/AppAllPost.vue'

const store = useStore()
const searchModalToggle = () => store.commit('SEARCH_MODAL_TOGGLE')
</script>

<style></style>

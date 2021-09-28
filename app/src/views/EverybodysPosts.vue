<template>
  <div class="relative">
    <div class="absolute justify-end text-gray-700 top-3 right-11">
      <button class="btn btn-action" @click="searchModalToggle">検索</button>
    </div>
    <AppAllPost />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import AppAllPost from '../components/AppAllPost.vue'

const store = useStore()
const searchModalToggle = () => store.commit('SEARCH_MODAL_TOGGLE')
</script>

<style></style>

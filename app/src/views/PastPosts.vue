<template>
  <div class="relative">
    <AppPastPost />
    <AppPaginationPastPost />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import AppPastPost from '@/components/AppPastPost.vue'
import AppPaginationPastPost from '@/components/AppPaginationPastPost.vue'

const store = useStore()
const searchModalToggle = () => store.commit('SEARCH_MODAL_TOGGLE')
</script>

<style></style>

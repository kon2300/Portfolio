<template>
  <div class="relative">
    <AppPastPost />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import AppPastPost from '@/components/AppPastPost.vue'

const store = useStore()
const searchModalToggle = () => store.commit('SEARCH_MODAL_TOGGLE')
</script>

<style></style>

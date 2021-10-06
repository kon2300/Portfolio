<template>
  <div class="container m-auto text-4xl">確認中です...少々お待ち下さい。</div>
</template>

<script setup>
import { onMounted } from '@vue/runtime-core'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  store.commit('SET_TOKEN', route.params.token)
  store.commit('SET_USER', route.params.id)
  store.dispatch('showProfile')
  router.push({ name: 'user-home', params: { id: route.params.id } })
})
</script>

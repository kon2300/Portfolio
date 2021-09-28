<template>
  <div class="container m-auto text-4xl">確認中です...少々お待ち下さい。</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()

onMounted(() => {
  store.commit('SET_TOKEN', route.params.token)
  store.commit('SET_USER', route.params.id)
  router.push({ name: 'user-home', params: { id: route.params.id } })
})
</script>

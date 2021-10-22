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
  store.dispatch('editArticle', route.params.id)
  router.push({ name: 'edit-article', params: { id: route.params.id } })
})
</script>

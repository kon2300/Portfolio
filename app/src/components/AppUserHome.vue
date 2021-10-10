<template>
  <div>
    <div class="flex justify-center">HOME</div>

    <div class="container mx-auto relative">
      <div
        class="
          box-border
          border-4
          grid
          h-screen
          sm:h-96 sm:grid-flow-col sm:grid-cols-2
        "
      >
        <div class="box-border border-4 grid items-center justify-center">
          円グラフ
        </div>

        <div class="box-border border-4 grid items-center justify-center">
          棒グラフ
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  store.dispatch('showProfile')
  const doneCreateProfile = computed(() => store.state.profile.detail)
  if (!doneCreateProfile.value) {
    router.push({ name: 'create-profile', params: { id: route.params.id } })
  }
})
</script>

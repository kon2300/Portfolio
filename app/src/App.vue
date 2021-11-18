<template>
  <TheHeader />

  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <AppModalSignUp class="absolute inset-10" />
  <AppModalSignIn class="absolute inset-10" />
  <AppModalOther class="absolute inset-10" />
  <AppModalSearch class="absolute inset-10" />

  <TheFooter />
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue'
import AppModalSignUp from '@/components/AppModalSignUp.vue'
import AppModalSignIn from '@/components/AppModalSignIn.vue'
import AppModalOther from '@/components/AppModalOther.vue'
import AppModalSearch from '@/components/AppModalSearch.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<style lang="postcss">
.route-enter-from {
  @apply opacity-0 transform translate-y-6;
}
.route-enter-active,
.route-leave-active {
  @apply transition duration-700;
}
.route-leave-to {
  @apply opacity-0  transform -translate-x-6;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;
}
.modal-enter-active,
.modal-leave-active {
  @apply transition duration-500;
}
</style>

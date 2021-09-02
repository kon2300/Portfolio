<template>
  <TheHeader />

  <AppModalSignUp />
  <AppModalSignIn />

  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <TheFooter />
</template>

<script setup>
import TheHeader from './components/TheHeader.vue'
import AppModalSignUp from './components/AppModalSignUp.vue'
import AppModalSignIn from './components/AppModalSignIn.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active,
.route-leave-active {
  transition: all 0.6s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
</style>

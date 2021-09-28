<template>
  <header v-if="!loginUser">
    <div
      class="
        border-b border-yellow-600
        h-32
        grid
        p-6
        justify-center
        text-gray-700
        relative
      "
    >
      <div class="text-6xl font-black transform -rotate-6 mix-blend-multiply">
        KAKE-BO
      </div>
      <div class="text-xl font-black transform -rotate-6 mix-blend-multiply">
        ~ 家計簿投稿アプリ ~
      </div>
      <nav class="absolute gap-3 flex right-7 bottom-3 sm:gap-10">
        <button class="btn btn-action" @click="signUpModalToggle">
          SIGN UP
        </button>
        <button class="btn btn-action" @click="signInModalToggle">
          LOG IN
        </button>
      </nav>
    </div>
  </header>

  <header v-if="loginUser">
    <div
      class="
        h-14
        p-2
        flex
        justify-center
        sm:justify-start sm:flex-none sm:relative sm:pl-10
        bg-gray-900
        border-b border-yellow-600
        text-white
      "
    >
      <div class="text-3xl font-extrabold transform -rotate-3">KAKE-BO</div>

      <nav class="absolute right-2 top-1 sm:hidden">
        <button class="btn-action" @click="otherModalToggle">
          <MenuIcon class="h-11 w-11 text-white" />
        </button>
      </nav>

      <nav
        class="
          hidden
          sm:my-2
          sm:space-x-5
          sm:flex
          sm:absolute
          sm:right-10
          sm:bottom-0
          sm:gap-10
        "
      >
        <router-link
          class="font-bold text-xl btn-action relative"
          :to="{ name: 'everybodys-posts' }"
          ><p>みんなの投稿</p>
          <UserGroupIcon class="h-6 w-6 text-white absolute top-0 -left-7" />
        </router-link>

        <router-link
          class="font-bold text-xl btn-action relative"
          :to="{ name: 'user-home', params: { id: loginUser } }"
          ><p>HOME</p>
          <HomeIcon class="h-6 w-6 text-white absolute top-0 -left-7"
        /></router-link>

        <button class="btn-action" @click="otherModalToggle">
          <DotsCircleHorizontalIcon class="h-8 w-8 text-white" />
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useStore } from 'vuex'
import {
  MenuIcon,
  UserGroupIcon,
  HomeIcon,
  DotsCircleHorizontalIcon,
} from '@heroicons/vue/solid'
import { computed } from 'vue'

const store = useStore()
const signUpModalToggle = () => store.commit('SIGN_UP_MODAL_TOGGLE')
const signInModalToggle = () => store.commit('SIGN_IN_MODAL_TOGGLE')
const otherModalToggle = () => store.commit('OTHER_MODAL_TOGGLE')
const loginUser = computed(() => store.state.auth.user)
</script>

<style></style>

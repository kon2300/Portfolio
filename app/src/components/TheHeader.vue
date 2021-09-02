<template>
  <header>
    <div
      class="
        border-solid border-b border-pink-200
        h-25
        mb-5
        py-2
        px-6
        grid
        justify-center
        text-white
        relative
      "
    >
      <div class="text-5xl">KAKE-BO</div>
      <div class="text-xl">~ 家計簿投稿アプリ ~</div>
      <nav class="my-2 flex sm:absolute sm:right-10 sm:bottom-3 gap-10">
        <button class="btn hover:bg-yellow-400" @click="signUpModalToggle">
          SIGN UP
        </button>
        <div>
          <button class="btn hover:bg-yellow-400" @click="signInModalToggle">
            LOG IN
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
const signUpModalToggle = () => store.commit('SIGN_UP_MODAL_TOGGLE')
const signInModalToggle = () => store.commit('SIGN_IN_MODAL_TOGGLE')
</script>

<style></style>

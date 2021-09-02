<template>
  <div v-if="signInModalState">
    <div
      class="absolute inset-0 bg-black opacity-25 z-40"
      @click.self="signInModalToggle"
    ></div>

    <div class="flex justify-center relative">
      <div
        class="
          grid
          bg-white
          p-6
          rounded-md
          shadow-2xl
          w-2/3
          md:w-1/2
          lg:w-1/3
          z-50
          relative
        "
      >
        <div class="font-mono text-2xl text-gray-600 flex justify-center pb-3">
          ログイン
        </div>
        <form class="space-y-6">
          <div class="relative">
            <label for="email" class="block text-sm font-bold text-gray-700">
              Email
            </label>
            <MailIcon class="h-6 w-6 text-gray-400 absolute right-2 bottom-1" />
            <input class="form" type="email" name="email" />
          </div>

          <div class="relative">
            <label for="password" class="block text-sm font-bold text-gray-700">
              Password
            </label>
            <KeyIcon class="h-6 w-6 text-gray-400 absolute right-2 bottom-1" />
            <input class="form" type="password" name="password" />
          </div>

          <div class="flex justify-center">
            <button class="btn">メールアドレスでログイン</button>
          </div>
        </form>
        <div class="flex justify-center mt-6">
          <router-link :to="{}">別アカウントでログイン</router-link>
        </div>
        <div class="absolute right-0 top-0" @click="signInModalToggle">
          <XCircleIcon class="h-6 w-6 text-pink-600" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { XCircleIcon, MailIcon, KeyIcon } from '@heroicons/vue/solid'

const store = useStore()
const signInModalState = computed(() => store.state.modal['signInModal'])
const signInModalToggle = () => store.commit('SIGN_IN_MODAL_TOGGLE')
</script>

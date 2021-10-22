<template>
  <transition name="modal">
    <div v-if="otherModalState">
      <div
        class="
          fixed
          inset-0
          bg-black bg-opacity-75
          overflow-y-auto
          h-full
          w-full
        "
        @click.self="otherModalToggle"
      ></div>

      <div class="flex justify-center">
        <div class="fixed bg-white p-6 rounded-md shadow-2xl w-96">
          <div class="font-black text-2xl flex justify-center pb-3">MENU</div>

          <div class="space-y-6 grid justify-items-center">
            <router-link
              class="md:hidden font-bold text-xl btn-action relative"
              :to="{ name: 'everybodys-posts' }"
              @click="otherModalToggle"
            >
              <p class="text-black">みんなの投稿</p>
              <UserGroupIcon
                class="h-6 w-6 text-black absolute top-0 -left-7"
              />
            </router-link>

            <router-link
              class="md:hidden font-bold text-xl btn-action relative"
              :to="{ name: 'post-article', params: { id: loginUser } }"
              @click="otherModalToggle"
              ><p class="text-black">投稿する</p>
              <PencilIcon class="h-6 w-6 text-black absolute top-0 -left-7" />
            </router-link>

            <router-link
              class="md:hidden font-bold text-xl btn-action relative"
              :to="{ name: 'user-home', params: { id: loginUser } }"
              @click="otherModalToggle"
              ><p class="text-black">ホーム</p>
              <HomeIcon class="h-6 w-6 text-black absolute top-0 -left-7"
            /></router-link>

            <router-link
              class="font-bold text-xl btn-action relative"
              :to="{ name: 'edit-profile', params: { id: loginUser } }"
              @click="otherModalToggle"
              ><p class="text-black">アカウント情報</p>
              <UserCircleIcon class="h-6 w-6 text-black absolute top-0 -left-7"
            /></router-link>

            <button class="btn btn-action" @click="logout">LOG OUT</button>
          </div>

          <button class="absolute right-0 top-0" @click="otherModalToggle">
            <XCircleIcon class="h-6 w-6 text-pink-600" />
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import {
  XCircleIcon,
  UserGroupIcon,
  PencilIcon,
  UserCircleIcon,
  HomeIcon,
} from '@heroicons/vue/outline'

const store = useStore()
const otherModalState = computed(() => store.state.modal['otherModal'])
const otherModalToggle = () => store.commit('OTHER_MODAL_TOGGLE')

const loginUser = computed(() => store.state.auth.user)

const logout = () => {
  store.dispatch('logout')
  store.commit('DESTROY_CHART')
  store.commit('OTHER_MODAL_TOGGLE')
}
</script>

<template>
  <div v-if="searchModalState">
    <div
      class="absolute inset-0 bg-black bg-repeat opacity-25 z-40"
      @click.self="searchModalToggle"
    ></div>

    <div class="flex justify-center">
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
          検索
        </div>
        <form class="space-y-6">
          <div>
            <label for="age" class="block text-sm font-bold text-gray-700">
              年齢
            </label>
            <input class="form" type="number" name="age" />
          </div>

          <div>
            <label
              for="familyMember"
              class="block text-sm font-bold text-gray-700"
            >
              家族構成
            </label>
            <input class="form" type="number" name="familyMember" />
          </div>

          <div>
            <label
              for="annualIncome"
              class="block text-sm font-bold text-gray-700"
            >
              年収
            </label>
            <input class="form" type="number" name="annualIncome" />
          </div>

          <div class="flex justify-center">
            <button class="btn">検索</button>
          </div>
        </form>
        <div class="absolute right-0 top-0" @click="searchModalToggle">
          <XCircleIcon class="h-6 w-6 text-pink-600" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { XCircleIcon } from '@heroicons/vue/solid'

const store = useStore()
const searchModalState = computed(() => store.state.modal['searchModal'])
const searchModalToggle = () => store.commit('SEARCH_MODAL_TOGGLE')
</script>

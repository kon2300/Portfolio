<template>
  <transition name="modal">
    <div v-if="searchModalState">
      <div
        class="
          fixed
          inset-0
          bg-black bg-opacity-75
          overflow-y-auto
          h-full
          w-full
          z-40
        "
        @click.self="searchModalToggle"
      ></div>

      <div class="flex justify-center">
        <div class="fixed grid bg-white p-6 rounded-md shadow-2xl w-96 z-50">
          <div class="font-mono text-2xl flex justify-center pb-3">検索</div>

          <form @submit="search" class="space-y-6">
            <div>
              <label for="annualIncome" class="block text-sm font-bold">
                年収
              </label>
              <input
                class="form"
                type="number"
                name="annualIncome"
                @change="annualIncomeHandle"
              />
            </div>

            <div>
              <label for="familyMembers" class="block text-sm font-bold">
                家族構成
              </label>
              <input
                class="form"
                type="number"
                name="familyMembers"
                @change="familyMembersHandle"
              />
            </div>

            <div class="flex justify-center">
              <button class="btn" :disabled="isSubmitting">検索開始</button>
            </div>
          </form>
          <button class="absolute right-0 top-0" @click="searchModalToggle">
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
import { XCircleIcon } from '@heroicons/vue/solid'
import { useField, useForm } from 'vee-validate'

const store = useStore()
const searchModalState = computed(() => store.state.modal['searchModal'])
const searchModalToggle = () => store.commit('SEARCH_MODAL_TOGGLE')

const { handleSubmit, isSubmitting } = useForm({
  initialValues: {
    annualIncome: '',
    familyMembers: '',
  },
})

const { handleChange: annualIncomeHandle } = useField('annualIncome')
const { handleChange: familyMembersHandle } = useField('familyMembers')

const search = handleSubmit((postData) => store.dispatch('', postData))
</script>

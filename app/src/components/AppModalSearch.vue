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

          <form @submit="searchArticles" class="space-y-6">
            <div>
              <label for="age" class="block text-sm font-bold text-gray-700"
                >年齢</label
              >
              <select
                class="form"
                name="age"
                v-model="values.age"
                @change="ageHandle"
              >
                <option value="" selected>すべて</option>
                <option
                  v-for="selectAge in selectAges"
                  :key="selectAge.id"
                  :value="selectAge.id"
                >
                  {{ selectAge.value }}
                </option>
              </select>
              <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
                {{ errors.age }}
              </p>
            </div>

            <div>
              <label
                for="annual_income"
                class="block text-sm font-bold text-gray-700"
                >世帯年収</label
              >
              <select
                class="form"
                name="annual_income"
                v-model="values.annual_income"
                @change="annualIncomeHandle"
              >
                <option value="" selected>すべて</option>
                <option
                  v-for="selectAnnualIncom in selectAnnualIncoms"
                  :key="selectAnnualIncom.id"
                  :value="selectAnnualIncom.id"
                >
                  {{ selectAnnualIncom.value }}
                </option>
              </select>
              <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
                {{ errors.annual_income }}
              </p>
            </div>

            <div>
              <label
                for="family_members"
                class="block text-sm font-bold text-gray-700"
                >家族構成</label
              >
              <select
                class="form"
                name="family_members"
                v-model="values.family_members"
                @change="familyMembersHandle"
              >
                <option value="" selected>すべて</option>
                <option
                  v-for="selectFamilyMember in selectFamilyMembers"
                  :key="selectFamilyMember.id"
                  :value="selectFamilyMember.id"
                >
                  {{ selectFamilyMember.value }}
                </option>
              </select>
              <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
                {{ errors.family_members }}
              </p>
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
import {
  selectAges,
  selectAnnualIncoms,
  selectFamilyMembers,
} from '@/include/selectValues'

const store = useStore()
const searchModalState = computed(() => store.state.modal['searchModal'])
const searchModalToggle = () => store.commit('SEARCH_MODAL_TOGGLE')

const { handleSubmit, isSubmitting, errors, values } = useForm({
  initialValues: {
    age: '',
    annual_income: '',
    family_members: '',
  },
})

const { handleChange: ageHandle } = useField('age')
const { handleChange: annualIncomeHandle } = useField('annual_income')
const { handleChange: familyMembersHandle } = useField('family_members')

const searchArticles = handleSubmit((postData) => {
  console.log(postData)
  store.commit('DESTROY_CHART')
  store.dispatch('searchArticles', postData)
  searchModalToggle()
})
</script>

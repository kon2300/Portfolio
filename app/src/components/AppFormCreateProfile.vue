<template>
  <div class="container mx-auto flex items-center justify-center relative">
    <div
      class="grid bg-white p-6 rounded-md shadow-2xl w-2/3 md:w-1/2 lg:w-1/3"
    >
      <div
        v-if="error"
        class="pl-1 font-bold text-white bg-pink-600 rounded-md"
      >
        {{ error }}
      </div>

      <div class="font-mono text-2xl text-gray-600 flex justify-center pb-3">
        アカウントの作成
      </div>
      <form @submit="createProfile" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-bold text-gray-700"
            >名前</label
          >
          <input class="form" type="text" name="name" @change="nameHandle" />
          <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
            {{ errors.name }}
          </p>
        </div>

        <div>
          <label for="age" class="block text-sm font-bold text-gray-700"
            >年齢</label
          >
          <select class="form" name="age" @change="ageHandle">
            <option value="">選択してください</option>
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
            @change="annualIncomeHandle"
          >
            <option value="">選択してください</option>
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
            @change="familyMembersHandle"
          >
            <option value="">選択してください</option>
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

        <div class="grid justify-items-center">
          <button class="btn btn-action mb-2" :disabled="isSubmitting">
            作成完了
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useField, useForm } from 'vee-validate'
import { userSchema } from '@/include/validation'
import {
  selectAges,
  selectAnnualIncoms,
  selectFamilyMembers,
} from '@/include/selectValues'
import {} from '@heroicons/vue/solid'
import { computed } from '@vue/reactivity'

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: userSchema,
})

const { handleChange: nameHandle } = useField('name')
const { handleChange: ageHandle } = useField('age')
const { handleChange: annualIncomeHandle } = useField('annual_income')
const { handleChange: familyMembersHandle } = useField('family_members')

const store = useStore()
const userId = computed(() => store.state.auth.user)
const createProfile = handleSubmit((postData) => {
  postData['user_id'] = userId.value
  store.dispatch('createProfile', postData)
})
const error = computed(() => store.state.auth.error)
</script>

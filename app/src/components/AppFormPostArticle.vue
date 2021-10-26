<template>
  <div class="container mx-auto flex items-center justify-center relative">
    <div
      class="grid bg-white p-6 rounded-md shadow-2xl w-2/3 md:w-1/2 lg:w-1/3"
    >
      <div class="font-mono text-2xl text-gray-600 flex justify-center pb-3">
        家計簿の投稿
      </div>
      <form @submit="postArticle" class="space-y-6">
        <div>
          <label for="time" class="block text-sm font-bold text-gray-700"
            >日付</label
          >
          <select class="form" name="time" @change="timeHandle">
            <option value="" disabled selected>選択してください</option>
            <option v-for="time in getTime" :key="time.id" :value="time.value">
              {{ `${time.value.year}年 / ${time.value.month}月` }}
            </option>
          </select>
          <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
            {{ errors.time }}
          </p>
          <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
            {{ error ? '日付を変更してください' : '' }}
          </p>
        </div>

        <div>
          <label
            for="rent_expenses"
            class="block text-sm font-bold text-gray-700"
            >家賃</label
          >
          <input
            class="form"
            type="number"
            min="0"
            step="1000"
            name="rent_expenses"
            v-model="values.rent_expenses"
            @change="rentExpensesHandle"
          />
          <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
            {{ errors.rent_expenses }}
          </p>
        </div>

        <div>
          <label
            for="food_expenses"
            class="block text-sm font-bold text-gray-700"
            >食費</label
          >
          <input
            class="form"
            type="number"
            min="0"
            step="1000"
            name="food_expenses"
            v-model="values.food_expenses"
            @change="foodExpensesHandle"
          />
          <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
            {{ errors.food_expenses }}
          </p>
        </div>

        <div>
          <label
            for="householeditem_expenses"
            class="block text-sm font-bold text-gray-700"
            >日用雑貨費</label
          >
          <input
            class="form"
            type="number"
            min="0"
            step="1000"
            name="householeditem_expenses"
            v-model="values.householeditem_expenses"
            @change="householeditemExpensesHandle"
          />
          <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
            {{ errors.householeditem_expenses }}
          </p>
        </div>

        <div>
          <label
            for="utility_expenses"
            class="block text-sm font-bold text-gray-700"
            >水道,光熱費</label
          >
          <input
            class="form"
            type="number"
            min="0"
            step="1000"
            name="utility_expenses"
            v-model="values.utility_expenses"
            @change="utilityExpensesHandle"
          />
          <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
            {{ errors.utility_expenses }}
          </p>
        </div>

        <div>
          <label
            for="internet_expenses"
            class="block text-sm font-bold text-gray-700"
            >通信費</label
          >
          <input
            class="form"
            type="number"
            min="0"
            step="1000"
            name="internet_expenses"
            v-model="values.internet_expenses"
            @change="internetExpensesHandle"
          />
          <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
            {{ errors.internet_expenses }}
          </p>
        </div>

        <div>
          <label
            for="riberalarts_expenses"
            class="block text-sm font-bold text-gray-700"
            >教育,教養費</label
          >
          <input
            class="form"
            type="number"
            min="0"
            step="1000"
            name="riberalarts_expenses"
            v-model="values.riberalarts_expenses"
            @change="riberalartsExpensesHandle"
          />
          <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
            {{ errors.riberalarts_expenses }}
          </p>
        </div>

        <div>
          <label
            for="insurance_expenses"
            class="block text-sm font-bold text-gray-700"
            >医療,保険費</label
          >
          <input
            class="form"
            type="number"
            min="0"
            step="1000"
            name="insurance_expenses"
            v-model="values.insurance_expenses"
            @change="insuranceExpensesHandle"
          />
          <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
            {{ errors.insurance_expenses }}
          </p>
        </div>

        <div>
          <label
            for="entertainment_expenses"
            class="block text-sm font-bold text-gray-700"
            >交際費</label
          >
          <input
            class="form"
            type="number"
            min="0"
            step="1000"
            name="entertainment_expenses"
            v-model="values.entertainment_expenses"
            @change="entertainmentExpensesHandle"
          />
          <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
            {{ errors.entertainment_expenses }}
          </p>
        </div>

        <div>
          <label
            for="free_expenses"
            class="block text-sm font-bold text-gray-700"
            >美容,娯楽,衣服費</label
          >
          <input
            class="form"
            type="number"
            min="0"
            step="1000"
            name="free_expenses"
            v-model="values.free_expenses"
            @change="freeExpensesHandle"
          />
          <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
            {{ errors.free_expenses }}
          </p>
        </div>

        <div>
          <label for="comment" class="block text-sm font-bold text-gray-700"
            >コメント</label
          >
          <textarea
            class="form"
            type="text"
            name="comment"
            @change="commentHandle"
          />
          <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
            {{ errors.comment }}
          </p>
        </div>

        <div class="grid justify-items-center">
          <button class="btn mb-2" :disabled="isSubmitting">投稿</button>
          <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
            {{ Object.keys(errors).length ? '入力に誤りがあります' : '' }}
          </p>
          <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
            {{ error }}
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useField, useForm } from 'vee-validate'
import { postEntrySchema } from '@/include/validation'
import { onMounted, computed } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { getNow } from '@/include/selectValues'

const { errors, handleSubmit, isSubmitting, values } = useForm({
  validationSchema: postEntrySchema,
  initialValues: {
    rent_expenses: '0',
    food_expenses: '0',
    householeditem_expenses: '0',
    utility_expenses: '0',
    riberalarts_expenses: '0',
    internet_expenses: '0',
    insurance_expenses: '0',
    entertainment_expenses: '0',
    free_expenses: '0',
    comment: ' ',
  },
})

const getTime = computed(() => {
  return getNow()
})

const { handleChange: timeHandle } = useField('time')
const { handleChange: rentExpensesHandle } = useField('rent_expenses')
const { handleChange: foodExpensesHandle } = useField('food_expenses')
const { handleChange: householeditemExpensesHandle } = useField(
  'householeditem_expenses'
)
const { handleChange: utilityExpensesHandle } = useField('utility_expenses')
const { handleChange: internetExpensesHandle } = useField('internet_expenses')
const { handleChange: riberalartsExpensesHandle } = useField(
  'riberalarts_expenses'
)
const { handleChange: insuranceExpensesHandle } = useField('insurance_expenses')
const { handleChange: entertainmentExpensesHandle } = useField(
  'entertainment_expenses'
)
const { handleChange: freeExpensesHandle } = useField('free_expenses')
const { handleChange: commentHandle } = useField('comment')

const store = useStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  store.dispatch('showProfile')
  const doneCreateProfile = computed(() => store.state.profile.detail)
  if (!doneCreateProfile.value) {
    router.push({ name: 'create-profile', params: { id: route.params.id } })
  }
})

const detail = computed(() => store.state.profile.detail)
const postArticle = handleSubmit((postData) => {
  postData['user_id'] = detail.value.user_id
  postData['name'] = detail.value.name
  postData['age'] = detail.value.age
  postData['annual_income'] = detail.value.annual_income
  postData['family_members'] = detail.value.family_members
  console.log(postData)
  store.dispatch('postArticle', postData)
})
const error = computed(() => store.state.auth['error'])
</script>

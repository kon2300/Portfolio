<template>
  <transition name="modal">
    <div v-if="signInModalState">
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
        @click.self="signInModalToggle"
      ></div>

      <div class="flex justify-center">
        <div class="fixed grid bg-white p-6 rounded-md shadow-2xl w-96 z-50">
          <div class="font-mono text-2xl flex justify-center pb-3">
            ログイン
          </div>

          <div class="space-y-6 mb-6">
            <div class="relative">
              <a
                :href="`${baseUrl}/auth/twitter`"
                class="
                  group
                  block
                  login-btn
                  from-white
                  to-blue-300
                  border-blue-500
                  hover:from-blue-300 hover:to-white
                  text-center
                  font-extrabold
                "
              >
                Twitterアカウントでログインする
                <span
                  class="
                    text-white
                    absolute
                    font-black
                    text-2xl
                    transform
                    group-hover:animate-bounce group-hover:text-black
                    w-10
                    top-2
                    left-1
                  "
                  >T</span
                >
                <ExternalLinkIcon
                  class="
                    h-6
                    w-6
                    text-blue-300
                    group-hover:text-indigo-600
                    absolute
                    right-1
                    top-2
                  "
                />
              </a>
            </div>

            <div class="relative">
              <a
                :href="`${baseUrl}/auth/github`"
                class="
                  group
                  block
                  login-btn
                  from-white
                  to-gray-300
                  border-gray-500
                  hover:from-gray-300 hover:to-white
                  text-center
                  font-extrabold
                "
              >
                Githubアカウントでログインする
                <span
                  class="
                    text-white
                    absolute
                    font-black
                    text-2xl
                    transform
                    group-hover:animate-bounce group-hover:text-black
                    w-10
                    top-2
                    left-1
                  "
                  >G</span
                >
                <ExternalLinkIcon
                  class="
                    h-6
                    w-6
                    text-gray-300
                    group-hover:text-indigo-600
                    absolute
                    right-1
                    top-2
                  "
                />
              </a>
            </div>

            <div class="relative">
              <a
                :href="`${baseUrl}/auth/google`"
                class="
                  group
                  block
                  login-btn
                  from-white
                  to-green-300
                  border-green-500
                  hover:from-green-300 hover:to-white
                  text-center
                  font-extrabold
                "
              >
                Googleアカウントでログインする
                <span
                  class="
                    text-white
                    absolute
                    font-black
                    text-2xl
                    transform
                    group-hover:animate-bounce group-hover:text-black
                    w-10
                    top-2
                    left-1
                  "
                  >G</span
                >
                <ExternalLinkIcon
                  class="
                    h-6
                    w-6
                    text-green-300
                    group-hover:text-indigo-600
                    absolute
                    right-1
                    top-2
                  "
                />
              </a>
            </div>
          </div>

          <div
            v-if="error && !isTooManyAttempts"
            class="pl-1 font-bold text-white bg-pink-600 rounded-md"
          >
            {{ error }}
          </div>
          <form
            v-if="!isTooManyAttempts"
            @submit="signInLocal"
            class="space-y-6"
          >
            <div class="relative">
              <label for="email" class="block text-sm font-bold"> Email </label>
              <MailIcon class="h-6 w-6 text-gray-400 absolute right-2 top-6" />
              <input
                class="form"
                type="email"
                name="email"
                @change="emailHandle"
              />
              <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
                {{ errors.email }}
              </p>
            </div>

            <div class="relative">
              <label for="password" class="block text-sm font-bold">
                Password
              </label>
              <KeyIcon class="h-6 w-6 text-gray-400 absolute right-2 top-6" />
              <input
                class="form"
                type="password"
                name="password"
                @change="passwordHandle"
              />
              <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
                {{ errors.password }}
              </p>
            </div>

            <div class="flex justify-center">
              <button class="btn btn-action" :disabled="isSubmitting">
                メールアドレスでログイン
              </button>
            </div>
          </form>
          <div v-else class="space-y-3">
            <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
              複数回失敗しました
            </p>
            <p class="pl-1 pr-1 font-bold text-white bg-pink-600 rounded-md">
              メールアドレスとパスワードを確認してください
            </p>
          </div>
          <button class="absolute right-0 top-0" @click="signInModalToggle">
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
  ExternalLinkIcon,
  MailIcon,
  KeyIcon,
} from '@heroicons/vue/solid'
import { useField, useForm } from 'vee-validate'
import { signInSchema } from '@/include/validation'

const store = useStore()
const signInModalState = computed(() => store.state.modal['signInModal'])
const signInModalToggle = () => store.commit('SIGN_IN_MODAL_TOGGLE')

const { errors, handleSubmit, isSubmitting, submitCount } = useForm({
  validationSchema: signInSchema,
  initialValues: {
    email: '',
    password: '',
  },
})

const { handleChange: emailHandle } = useField('email')
const { handleChange: passwordHandle } = useField('password')

const isTooManyAttempts = computed(() => {
  console.log(submitCount.value)
  return submitCount.value >= 3
})

const signInLocal = handleSubmit((postData) =>
  store.dispatch('signInLocal', postData)
)

const baseUrl = computed(() => import.meta.env.VITE_API_URL)

const error = computed(() => store.state.auth['error'])
</script>

<template>
  <transition name="modal">
    <div v-if="signUpModalState">
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
        @click.self="signUpModalToggle"
      ></div>

      <div class="flex justify-center">
        <div class="fixed grid bg-white p-6 rounded-md shadow-2xl w-96 z-50">
          <div class="font-mono text-2xl flex justify-center pb-3">
            新規登録
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
            v-if="error"
            class="pl-1 font-bold text-white bg-pink-600 rounded-md"
          >
            {{ error }}
          </div>
          <form @submit="signUpLocal" class="space-y-6">
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

            <div>
              <label for="passwordConfirmation" class="block text-sm font-bold">
                PasswordConfirmation
              </label>
              <input
                class="form"
                type="password"
                name="passwordConfirmation"
                @change="passwordConfirmationHandle"
              />
              <p class="pl-1 font-bold text-white bg-pink-600 rounded-md">
                {{ errors.passwordConfirmation }}
              </p>
            </div>

            <div class="flex justify-center">
              <button class="btn btn-action" :disabled="isSubmitting">
                メールアドレスで登録
              </button>
            </div>
          </form>
          <button class="absolute right-0 top-0" @click="signUpModalToggle">
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
import { signUpSchema } from '@/include/validation'

const store = useStore()
const signUpModalState = computed(() => store.state.modal['signUpModal'])
const signUpModalToggle = () => store.commit('SIGN_UP_MODAL_TOGGLE')

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: signUpSchema,
  initialValues: {
    email: '',
    password: '',
  },
})

const { handleChange: emailHandle } = useField('email')
const { handleChange: passwordHandle } = useField('password')
const { handleChange: passwordConfirmationHandle } = useField(
  'passwordConfirmation'
)

const signUpLocal = handleSubmit((postData) =>
  store.dispatch('signUpLocal', postData)
)

const baseUrl = computed(() => import.meta.env.VITE_API_URL)

const error = computed(() => store.state.auth['error'])
</script>

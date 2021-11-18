import store from '@/store'
import router from '@/router'

export default {
  state: {
    signInModal: false,
    signUpModal: false,
    searchModal: false,
    otherModal: false,
  },
  mutations: {
    SIGN_IN_MODAL_TOGGLE: (state) => {
      state.signInModal = !state.signInModal
      store.state.auth.error = undefined
    },
    SIGN_UP_MODAL_TOGGLE: (state) => {
      state.signUpModal = !state.signUpModal
      store.state.auth.error = undefined
    },
    SEARCH_MODAL_TOGGLE: (state) => {
      if (!state.searchModal) {
        router.replace({ name: 'everybodys-posts', params: { pageNumber: 1 } })
      }
      state.searchModal = !state.searchModal
    },
    OTHER_MODAL_TOGGLE: (state) => {
      state.otherModal = !state.otherModal
    },
  },
  getters: {},
}

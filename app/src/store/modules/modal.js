export default {
  state: {
    signInModal: false,
    signUpModal: false,
    searchModal: false,
  },
  mutations: {
    SIGN_IN_MODAL_TOGGLE: (state) => {
      state.signInModal = !state.signInModal
    },
    SIGN_UP_MODAL_TOGGLE: (state) => {
      state.signUpModal = !state.signUpModal
    },
    SEARCH_MODAL_TOGGLE: (state) => {
      state.searchModal = !state.searchModal
    },
  },
  getters: {},
}

import axios from 'axios'
import router from '@/router'
import store from '@/store'

export default {
  state: {
    jwtToken: undefined,
    user: {
      userid: undefined,
    },
    error: undefined,
  },
  mutations: {
    SET_TOKEN(state, value) {
      state.jwtToken = value
    },
    SET_USER(state, value) {
      state.user = value
    },
    SET_ERROR_MESSAGE(state, value) {
      state.error = value
    },
  },
  getters: {
    authenticated: (state) => state.user.userid,
    errorMessage: (state) => state.error,
  },
  actions: {
    signUpLocal: async ({ state, commit }, postData) => {
      try {
        const res = await axios.post('auth/signup', postData)
        commit('SET_ERROR_MESSAGE', res.data.error)
        if (state.error === undefined) {
          window.confirm(
            'メールを送信しました。\nメール内のURLをクリックし本登録を完了させてください。'
          )
          store.commit('SIGN_UP_MODAL_TOGGLE')
        }
      } catch (e) {
        commit('SET_TOKEN', '')
        commit('SET_USER', '')
      }
    },
    signInLocal: async ({ commit, dispatch }, postData) => {
      const res = await axios.post('auth/signIn', postData)
      commit('SET_ERROR_MESSAGE', res.data.error)
      try {
        dispatch('attempt', res.data.jwtToken)
        if (res.data.jwtToken) {
          store.commit('SIGN_IN_MODAL_TOGGLE')
          router.push({
            name: 'user-redirect',
            params: { token: res.data.jwtToken, id: res.data.userid },
          })
        }
      } catch (e) {
        commit('SET_TOKEN', '')
        commit('SET_USER', '')
      }
    },
    attempt: async ({ _, commit }, token) => {
      commit('SET_TOKEN', token)
      const res = await axios.get('auth/verify')

      try {
        commit('SET_USER', res.data.decoded.userid)
      } catch (e) {
        commit('SET_TOKEN', '')
        commit('SET_USER', '')
      }
    },
    logout: async ({ commit }) => {
      if (window.confirm('ログアウトしますか？')) {
        await axios.post('auth/logout')
        try {
          commit('SET_TOKEN', '')
          commit('SET_USER', '')
          store.commit('DESTROY_CHART')
          router.push({ name: 'top' })
        } catch (e) {
          console.log(e)
        }
      }
    },
  },
}

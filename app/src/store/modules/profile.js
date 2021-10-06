import axios from 'axios'
import router from '@/router'
import store from '@/store'

export default {
  state: {
    detail: [],
  },
  mutations: {
    SET_DETAIL(state, value) {
      state.detail = value
    },
  },
  getters: {},
  actions: {
    createProfile: async ({ commit }, postData) => {
      const res = await axios.post(`profile/${store.state.auth.user}`, postData)
      store.commit('SET_ERROR_MESSAGE', res.data.error)
      commit('SET_DETAIL', res.data)
      router.push({ name: 'user-home', params: { id: store.state.auth.user } })
    },
    updateProfile: async (_, postData) => {
      const res = await axios.put(`profile/${store.state.auth.user}`, postData)
      store.commit('SET_ERROR_MESSAGE', res.data.error)
      router.push({ name: 'user-home', params: { id: store.state.auth.user } })
    },
    showProfile: async ({ commit }) => {
      const res = await axios.get(`profile/${store.state.auth.user}`)
      try {
        commit('SET_DETAIL', res.data)
      } catch (e) {
        console.log(e)
      }
    },
  },
}

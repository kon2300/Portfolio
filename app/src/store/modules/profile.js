import axios from 'axios'
import router from '@/router'
import store from '@/store'

export default {
  state: {
    deteal: [],
  },
  mutations: {
    SET_DETEAl(state, value) {
      state.deteal = value
    },
  },
  getters: {},
  actions: {
    createProfile: async ({ commit }, postData) => {
      const res = await axios.post(`profile/${store.state.auth.user}`, postData)
      store.commit('SET_ERROR_MESSAGE', res.data.error)
      commit('SET_DETEAL', res.data)
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
        commit('SET_DETEAL', res.data)
      } catch (e) {
        console.log(e)
      }
    },
  },
}

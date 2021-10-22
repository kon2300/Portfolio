import axios from 'axios'
import router from '@/router'
import store from '@/store'

export default {
  state: {
    allArticle: [],
    myArticle: [],
    originalArticle: [],
  },
  mutations: {
    SET_ALL_ARTICLE(state, value) {
      state.allArticle = value
    },
    SET_ORIGINAL_ARTICLE(state, value) {
      state.originalArticle = value
    },
    SET_MY_ARTICLE(state, value) {
      state.myArticle = value
    },
  },
  getters: {},
  actions: {
    postArticle: async (_, postData) => {
      const res = await axios.post('articles/create', postData)
      store.commit('SET_ERROR_MESSAGE', res.data.error)
      if (!store.state.auth.error) {
        router.push({ name: 'everybodys-posts' })
      }
    },
    updateArticle: async ({ state }, postData) => {
      await axios.put(`articles/${state.originalArticle.id}`, postData)
      router.push({ name: 'everybodys-posts' })
    },
    showMyArticles: async ({ commit }, user_id) => {
      const res = await axios.get(`articles/showMyArticles/${user_id}`)
      console.log(res.data)
      commit('SET_MY_ARTICLE', res.data)
    },
    showAllArticles: async ({ commit }) => {
      const res = await axios.get('articles/showAllArticles')
      console.log(res.data)
      commit('SET_ALL_ARTICLE', res.data)
    },
    editArticle: async ({ commit }, article_id) => {
      const res = await axios.get(`articles/editArticle/${article_id}`)
      console.log(res.data)
      commit('SET_ORIGINAL_ARTICLE', res.data)
    },
    likeArticle: async ({ dispatch }, { article_id, user_id }) => {
      await axios.post(`articles/likeArticle/${article_id}/${user_id}`)
      dispatch('showAllArticles')
    },
    removeLikeArticle: async ({ dispatch }, { article_id, user_id }) => {
      await axios.delete(`articles/removeLikeArticle/${article_id}/${user_id}`)
      dispatch('showAllArticles')
    },
    removeArticle: async ({ state }) => {
      const res = await axios.delete(
        `articles/removeArticle/${state.originalArticle.id}`
      )
      console.log(res.data)
      router.push({ name: 'everybodys-posts' })
    },
  },
}

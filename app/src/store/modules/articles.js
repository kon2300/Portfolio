import axios from 'axios'
import router from '@/router'

export default {
  state: {
    allArticle: [],
    originalArticle: [],
  },
  mutations: {
    SET_ALL_ARTICLE(state, value) {
      state.allArticle = value
    },
    SET_ORIGINAL_ARTICLE(state, value) {
      state.originalArticle = value
    },
  },
  getters: {},
  actions: {
    postArticle: async (_, postData) => {
      await axios.post('articles/create', postData)
      router.push({ name: 'everybodys-posts' })
    },
    updateArticle: async ({ state }, postData) => {
      await axios.put(
        `articles/updateArticle/${state.originalArticle.id}`,
        postData
      )
      router.push({ name: 'everybodys-posts' })
    },
    showAllArticles: async ({ commit }) => {
      const res = await axios.get('articles/showAllArticles')
      console.log(res.data)
      commit('SET_ALL_ARTICLE', res.data)
    },
    editArticle: async ({ commit }, article_id) => {
      const res = await axios.get(`articles/editArticle/${article_id}`)
      commit('SET_ORIGINAL_ARTICLE', res.data.article)
    },
    likeArticle: async ({ dispatch }, { article_id, user_id }) => {
      await axios.post(`articles/likeArticle/${article_id}/${user_id}`)
      dispatch('showArticles')
    },
    removeLikeArticle: async ({ dispatch }, { article_id, user_id }) => {
      await axios.delete(`articles/removeLikeArticle/${article_id}/${user_id}`)
      dispatch('showArticles')
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

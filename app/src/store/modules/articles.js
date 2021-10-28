import axios from 'axios'
import router from '@/router'
import store from '@/store'

export default {
  state: {
    allArticle: [],
    myAllArticle: [],
    article: [],
  },
  mutations: {
    SET_ALL_ARTICLE(state, value) {
      state.allArticle = value
    },
    SET_MY_ALL_ARTICLE(state, value) {
      state.myAllArticle = value
    },
    SET_ARTICLE(state, value) {
      state.article = value
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
      await axios.put(`articles/${state.article.id}`, postData)
      router.push({ name: 'everybodys-posts' })
    },
    showMyArticles: async ({ commit }, user_id) => {
      const res = await axios.get(`articles/showMyArticles/${user_id}`)
      console.log(res.data)
      commit('SET_ARTICLE', res.data)
    },
    showMyAllArticle: async ({ commit }, user_id) => {
      const res = await axios.get(`articles/showMyAllArticles/${user_id}`)
      console.log(res.data)
      commit('SET_MY_ALL_ARTICLE', res.data)
    },
    showAllArticles: async ({ commit }) => {
      const res = await axios.get('articles/showAllArticles')
      console.log(res.data)
      commit('SET_ALL_ARTICLE', res.data)
    },
    searchArticles: async ({ commit }, postData) => {
      const res = await axios.post('articles/searchArticles', postData)
      console.log(res.data)
      commit('SET_ALL_ARTICLE', res.data)
    },
    editArticle: async ({ commit }, article_id) => {
      const res = await axios.get(`articles/editArticle/${article_id}`)
      console.log(res.data)
      commit('SET_ARTICLE', res.data)
    },
    likeArticle: async ({ dispatch }, { article_id, user_id }) => {
      await axios.post(`articles/likeArticle/${article_id}/${user_id}`)
      dispatch('showAllArticles')
    },
    removeLikeArticle: async ({ dispatch }, { article_id, user_id }) => {
      await axios.delete(`articles/removeLikeArticle/${article_id}/${user_id}`)
      dispatch('showAllArticles')
    },
    removeArticle: async (_, article_id) => {
      if (window.confirm('投稿した記事を削除しますか？')) {
        const res = await axios.delete(`articles/removeArticle/${article_id}`)
        console.log(res.data)
        router.push({ name: 'everybodys-posts' })
      } else {
        window.alert('キャンセルしました。')
      }
    },
  },
}

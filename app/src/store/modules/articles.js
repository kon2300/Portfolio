import axios from 'axios'
import router from '@/router'
import store from '@/store'

export default {
  state: {
    allArticle: [],
    allArticleCount: undefined,
    myAllArticle: [],
    myAllArticleCount: undefined,
    article: [],
    searchValues: [],
  },
  mutations: {
    SET_ALL_ARTICLE(state, value) {
      state.allArticle = value
    },
    SET_ALL_ARTICLE_COUNT(state, value) {
      state.allArticleCount = value
    },
    SET_MY_ALL_ARTICLE(state, value) {
      state.myAllArticle = value
    },
    SET_MY_ALL_ARTICLE_COUNT(state, value) {
      state.myAllArticleCount = value
    },
    SET_ARTICLE(state, value) {
      state.article = value
    },
    SET_SEARCH_VALUES(state, value) {
      state.searchValues = value
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
    showMyAllArticle: async ({ commit }, postData) => {
      const res = await axios.post('articles/showMyAllArticles', postData)
      console.log(res.data)
      commit('SET_MY_ALL_ARTICLE', res.data.rows)
      commit('SET_MY_ALL_ARTICLE_COUNT', res.data.count)
    },
    showAllArticles: async ({ commit }, postData) => {
      const res = await axios.post('articles/showAllArticles', postData)
      console.log(res.data)
      commit('SET_SEARCH_VALUES', postData)
      commit('SET_ALL_ARTICLE', res.data.rows)
      commit('SET_ALL_ARTICLE_COUNT', res.data.count)
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

export default {
  state: {
    allChart: [],
  },
  mutations: {
    SET_CHART(state, value) {
      state.allChart.push(value)
    },
    DESTROY_CHART(state) {
      if (state.allChart) {
        state.allChart.forEach((chart) => {
          return chart.destroy()
        })
      }
      state.allChart = []
    },
  },
  getters: {},
  actions: {},
}

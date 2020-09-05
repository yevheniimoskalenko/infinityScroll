export const state = () => ({
  error: null
})
export const getters = {}
export const mutations = {
  setError({ state }, payload) {
    state.error = payload
  }
}
export const actions = {
  async loadPage({ commit }, payload) {
    try {
      payload++
      return await this.$axios.$get(`/api/pagination/${payload}`)
    } catch (e) {}
  }
}

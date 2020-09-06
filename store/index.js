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
      return await this.$axios.$get(
        `/api/pagination/${payload.page}/${payload.input}/${payload.lang}`
      )
    } catch (e) {}
  }
}

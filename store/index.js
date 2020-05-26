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
  async tickets({ commit }, payload) {
    try {
      /* eslint-disable no-console */
      return await this.$axios.$get(`/api/pagination/${payload.id}`)
    } catch (e) {}
  }
}

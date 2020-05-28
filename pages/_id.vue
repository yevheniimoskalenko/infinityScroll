<template>
  <div>
    <el-card class="box-card">
      <div v-infinite-scroll="load" style="overflow:auto" class="tickets">
        <div v-for="(ticket, index) in tickets" :key="index" class="ticket">
          {{ ticket.number_tikets }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  async asyncData({ store, params }) {
    const tickets = await store.dispatch('tickets', params)
    return { tickets }
  },
  data() {
    return {
      loading: true
    }
  },
  methods: {
    async load() {
      /* eslint-disable no-console */
      try {
        this.loading = true
        const load = await this.$store.dispatch('load', this.$route.params)
        this.tickets = this.tickets.concat(load)
      } catch (e) {
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
infinite-list-wrapper {
  height: 500px;
}
</style>

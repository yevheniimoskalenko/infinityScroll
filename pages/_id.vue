<template>
  <div>
    <el-row>
      <el-col>
        <div class="tickets">
          <div v-for="(ticket, index) in tickets" :key="index" class="ticket">
            {{ ticket }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  async asyncData({ store, params }) {
    const tickets = await store.dispatch('tickets', params)
    return { tickets }
  }
}
</script>

<template>
  <div>
    <el-row>
      <el-col> {{ tickets }}</el-col>
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

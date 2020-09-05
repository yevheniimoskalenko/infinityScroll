<template>
  <div v-loading="loading" class="page">
    <div>
      <div v-for="(image, index) in images" :key="index" class="image">
        <el-card> <el-image :src="image.webformatURL"/></el-card>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      page: 1,
      loading: true,
      images: []
    }
  },
  mounted() {
    this.fetch()
    const eventHandler = () => {
      const scrollTop = document.documentElement.scrollTop
      const viewPortHeight = window.innerHeight

      const totalHeight = document.documentElement.offsetHeight
      const atTheBottom = scrollTop + viewPortHeight === totalHeight

      if (atTheBottom) {
        this.fetch(this.page)
      }
      const deleyHendler = _.debounce(eventHandler, 400)
    }
    window.addEventListener('scroll', eventHandler)
  },
  methods: {
    async fetch(page = 0) {
      try {
        this.loading = true
        const data = await this.$store.dispatch('loadPage', page)
        this.images = await this.images.concat(data.hits)
        this.page++
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.image {
  margin: 20px;
}
.el-input {
  .el-input__inner {
    border: none;
  }
  .input__inner:focus {
    border: none;
  }
}
</style>

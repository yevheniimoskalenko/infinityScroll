<template>
  <div v-loading="loading" class="page">
    <div class="list">
      <h2>{{ data.q }}</h2>
      <div v-for="(image, index) in images" :key="index" class="image">
        <el-card>
          <el-image :src="image.webformatURL" lazy>
            <div slot="placeholder" class="image-slot">
              Loading<span class="dot">...</span>
            </div></el-image
          ></el-card
        >
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
      images: [],
      data: {
        q: 'Hérissonne'
      }
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
  },
  head: {
    title: 'Hérissonne'
  }
}
</script>
<style lang="scss" scoped>
.image-slot {
  width: 517px;
  height: 345px;
  display: flex;
  justify-content: center;
  align-items: center;
}
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
.list {
  .form-query {
    padding: 20px;
  }
  h2 {
    text-align: center;
  }
}
</style>

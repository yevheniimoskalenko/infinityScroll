<template>
  <div class="page">
    <div class="list">
      <h2>{{ data.q }}</h2>
      <div class="form-search">
        <el-card>
          <el-form ref="form" :model="data" :rules="rules">
            <el-row :gutter="10">
              <el-col :span="20" :sm="20" :md="20" :xs="20" :lg="20">
                <el-form-item prop="q">
                  <el-input
                    v-model="data.q"
                    v-loading.fullscreen.lock="fullscreenLoading"
                    placeholder="Search"
                    @keyup.native.enter="onSearch($event)"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="4" :md="4" :xs="4" :lg="4">
                <el-form-item>
                  <el-select
                    v-model="data.lang"
                    placeholder="Select"
                    @input.native.enter="onSearch($event)"
                  >
                    <el-option label="fr" value="fr"></el-option>
                    <el-option label="en" value="en"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div v-for="(image, index) in images" :key="index" class="image">
        <el-card>
          <el-image :src="image.webformatURL" lazy>
            <div slot="placeholder" class="image-slot">
              Loading
              <span class="dot">...</span>
            </div>
          </el-image>
        </el-card>
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
      images: [],
      fullscreenLoading: false,
      data: {
        q: 'Hedgehog',
        lang: 'en'
      },
      rules: {
        q: [{ required: true }, { min: 3 }]
      }
    }
  },
  mounted() {
    const eventHandler = () => {
      const scrollTop = document.documentElement.scrollTop
      const viewPortHeight = window.innerHeight

      const totalHeight = document.documentElement.offsetHeight
      const atTheBottom = scrollTop + viewPortHeight === totalHeight

      if (atTheBottom) {
        this.fetch()
      }
    }

    const deleyHendler = _.debounce(eventHandler, 400)
    window.addEventListener('scroll', deleyHendler)

    this.fetch()
  },

  methods: {
    onSearch(event) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true
          _.debounce(async () => {
            try {
              const formData = {
                page: 1,
                input: this.data.q,
                lang: this.data.lang
              }
              const data = await this.$store.dispatch('loadPage', formData)
              this.images = data.hits
              this.page = 2
              this.fullscreenLoading = false
              if (data.total === 0) {
                this.$message({
                  message: 'is not found',
                  type: 'error'
                })
              }
            } catch (e) {
            } finally {
              this.fullscreenLoading = false
            }
          }, 700)()
        }
      })
    },
    async fetch() {
      try {
        this.fullscreenLoading = true

        const formData = {
          page: this.page,
          input: this.data.q || 'Hedgehog',
          lang: this.data.lang || 'en'
        }
        const data = await this.$store.dispatch('loadPage', formData)
        this.images = await this.images.concat(data.hits)
        this.page++
        if (data.total === 0) {
          this.$message({
            message: 'is not found',
            type: 'error'
          })
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.fullscreenLoading = false
      }
    }
  },
  head() {
    return {
      title: `${this.data.q}`
    }
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
  margin: 20px 0;
}
.form-search {
  margin: 20px 0;
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
  h2 {
    text-align: center;
  }
}
</style>

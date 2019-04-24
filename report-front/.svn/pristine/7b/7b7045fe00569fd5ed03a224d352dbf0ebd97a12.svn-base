<template>
  <div class="content-wrapper" style="min-height: 700px;margin-bottom: 50px;padding:0 15px;">
      <div v-if="develop">正在开发ing</div>
  </div>
</template>

<script>
    export default {
      name: 'developing',
      data () {
      },
      created () {
        if (this.timeOut) {
          clearTimeout(this.timeOut)
        }
        this.getListIng()
      },
      computed: {
        timeOut: {
          set (val) {
            this.$store.state.timeout.compileTimeout = val
          },
          get () {
            return this.$store.state.timeout.compileTimeout
          }
        }
      },
      methods: {
        getListIng () {
          let _this = this
          this.timeOut = setTimeout(() => {
            _this.getListIng()
          }, 5000)
        }
      }
    }
</script>

<style scoped>

</style>

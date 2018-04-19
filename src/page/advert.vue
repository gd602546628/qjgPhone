<template>
  <div class="advert" v-html="content"></div>
</template>
<script>
  import Api from '../api/api'
  export default{
    components: {},
    data(){
      return {
        content: ''
      }
    },
    computed: {},
    created(){
      this.getAdvert()
    },
    methods: {
      async getAdvert(){
        let data = await Api.getAdvert({id: parseInt(this.$route.params.id)})
        if (data.data.url) {
          window.location.replace(data.data.url)
          return
        }
        this.content = data.data.content
      }
    }
  }
</script>
<style lang='scss' type="text/scss" rel='stylesheet/scss'>
  .advert {
    img {
      max-width: 100%;
    }
  }
</style>

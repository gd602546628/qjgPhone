<template>
  <div class="hello" style="height: 100%">
    <g-krpano :data="krpanoData" v-if="showKrpano"></g-krpano>
  </div>
</template>
<script>
  import gKrpano from '@/components/krpano.vue'
  import Api from '@/api/api'
  import wxService from '@/service/wxService'
  import {filePre} from '@/config/config'
  import util from '@/service/util'
  export default {
    name: 'HelloWorld',
    components: {
      gKrpano
    },
    data () {
      return {
        krpanoData: null,
        showKrpano: false
      }
    },
    async created(){
      let data = await Api.getScene({id: this.$route.params.id})
      /**
       * 设置微信分享
       * **/
      if(util.browser.isWeixin){
        wxService.shareAll({
          url: window.location.href, // 分享链接
          title: data.data.name, // 标题
          description: data.data.name, //描述
          img_url: `${filePre}${data.data.shadeImg}`, // 图片链接
          img_title: data.data.name, // 图片标题
          to_app: '',
          cus_txt: '',
          type: 'weixin',// 分享至 cqq  qzone  weixin
        })
      }
      this.krpanoData = data
      this.showKrpano = true
    },
    methods: {}
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped></style>

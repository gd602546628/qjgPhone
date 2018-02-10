<template>
  <krpano :xml='xml'
          :hooks="hooks"
          :debug="true"
          @panoCreated="start"
          class="krpano"
          :mwheel="true"
          :basepath="basepath">
  </krpano>
</template>
<script>
  import animation from '@/service/animation/animationForKrpano'
  import {filePre} from '@/config/config'
  import ShareService from '@/service/shareService/shareService'
  export default{
    props: {
      data: {
        type: Object
      }
    },
    data(){
      return {
        xml: './static/tour.xml',
        basepath: './static/',
        hooks: {
          hotAnimation: function (item) {
            let setFunction = function (ath, atv) {
              this.krpano.set(`hotspot[${item}].ath`, ath)
              this.krpano.set(`hotspot[${item}].atv`, atv)
            }.bind(this)
            let ath = parseFloat(this.krpano.get(`hotspot[${item}].ath`))
            let atv = parseFloat(this.krpano.get(`hotspot[${item}].atv`))
            let animation1 = function () {
              animation(setFunction, {ath: ath, atv: atv - 2}, {ath: ath, atv: atv}, 1000, 'Linear', animation2)
            }
            let animation2 = function () {
              animation(setFunction, {ath: ath, atv: atv}, {ath: ath, atv: atv - 2}, 1000, 'Linear', animation1)
            }
            animation1()
          }.bind(this),
          weixinShare: function () {
            ShareService.share({
              url: window.location.href, // 分享链接
              title: '百度', // 标题
              description: '百度官网', //描述
              img_url: `${filePre}${this.data.data.shadeImg}`, // 图片链接
              img_title: '呵呵', // 图片标题
              to_app: '',
              cus_txt: '',
              type: 'weixin',// 分享至 cqq  qzone  weixin
            })
          }
        },
        hotList: [],
        krpano: null
      }
    },
    methods: {
      async start(krpano){
        this.krpano = krpano
        let sceneList = this.data.data.sceneList
        sceneList.forEach(item => {
          let scene = this.getSence(item)
          krpano.call(`loadxml(${scene});`)
        })
        krpano.call("startup()")
        krpano.call("set(layer[skin_num].html,点击量:" + this.data.data.hits + ")")
        if (this.data.data.webchatImg != "" && this.data.data.webchatImg != null) {
          krpano.call("set(layer[skin_btn_webchat].img," + this.data.data.webchatImg + ")")
        }

      },
      getSence(item){
        let source = item.source
        let haveBg = (source.bgsnd != null && source.bgsnd != "")
        let bgOnstart = haveBg ? `playsound(bgsnd,${filePre + source.bgsnd},0);set(layer[skin_btn_sound].alpha,1);set(layer[skin_btn_sound].ox,0);set(layer[skin_btn_sound].crop,64|704|64|64);` : ''
        let hots = this.getHotSpot(item.hotspots)
        let scene = `<scene   name="scene_${source.id}"
                              title="${source.name}"
                              havevrimage="true"
                              thumburl="${filePre + source.url}"
                              lat="0"
                              lng="0"
                              onstart="${bgOnstart}"
                              >
                             <preview url="${filePre + source.url}"/>
                             <view hlookat="0.0" vlookat="0.0" fovtype="MFOV" fov="120" maxpixelzoom="2.0" fovmin="70" fovmax="140" limitview="auto"/>
                             <image type="sphere" multires="true" tilesize="512" if="!webvr.isenabled">
                                 <level tiledimagewidth="768" tiledimageheight="768">
                                     <sphere url="${filePre + source.url}" />
                                 </level>
                             </image>
                             <image if="webvr.isenabled"><sphere url="${filePre + source.url}" /></image>
                             ${hots}
                       </scene>`
        return scene
      },
      getHotSpot(hotList){
        let result = ''
        hotList.forEach(item => {
          let linkedscene = ''
          if (item.type === 2) {
            linkedscene = `linkedscene="scene_${item.sceneId}"`
          }
          /* clickMap 0文本 1url 2场景 3 img 4video  */
          let onclickMap = [``,
            `onclick="openurl(${item.url})"`,
            ``,
            `onclick="showImg(${filePre + item.image})"`,
            `onclick="looktohotspot(get(name),90);videoplayer_open(${item.video})"`,
          ]
          let click = onclickMap[item.type]
          this.hotList.push(`hotspot_${item.id}`)
          let hot = `<hotspot
                               name="hotspot_${item.id}"
                               tooltip="${item.title}"
                               onloaded="add_all_the_time_tooltip();hotAnimation(hotspot_${item.id})"
                               handcursor="true"
                               style="skin_hotspotstyle"
                               ath="${item.ath}"
                               atv="${item.atv}"
                               url="${filePre + item.icon}"
                               ${click}
                               ${linkedscene}
                               />`
          result += hot
        })
        return result
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .krpano {
    width: 100%;
    height: 100%;
  }
</style>

/**
 * Created by gd on 2018/1/22/022.
 */

class Util {
  constructor() {
    this.browser = function () {
      let u = navigator.userAgent, app = navigator.appVersion
      return {//移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        isQQBrowser: u.indexOf('QQ') !== -1,//判断是不是qq浏览器
        isUCBrowser: u.indexOf("UCBrowser") !== -1,//判断是不是UC 浏览器
        isWeixin: u.toLowerCase().indexOf("micromessenger") !== -1
      }
    }()
  }
  urlEncode(url, params) {
    var result = url + '?'
    for (var key in params) {
      result += key + '=' + params[key] + '&'
    }
    return encodeURI(result.substring(0, result.length - 1))
  }
}
export default new Util()

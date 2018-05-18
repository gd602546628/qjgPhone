/**
 * Created by gd on 2017/12/29/029.
 */
import axios from 'axios'
import Util from '@/service/util'
import store from '@/store/index'
import {code} from '@/config/config'
import router from '@/router/index'
import {MessageBox } from 'mint-ui';
import {isTest} from '../config/config'

class Http {
  constructor() {
  }

  async post(url, params) {
    let resultUrl = `${url};JSESSIONID=${store.getters.JSESSIONID}`
    let data = await axios.post(resultUrl, params)
    if (isTest) {
      if (data.data.code === code.NO_AUTHORITY) { // 无权限访问
        await MessageBox .alert('登录已失效，请重新登录')
        store.dispatch({type: 'logoutAction'})
        router.push({
          name: 'login'
        })
        throw new Error()
      }
    }
    return data.data
  }

  async formPost(url, params, sessionId) {
    let headerOption = {
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      }
    }
    if (sessionId) {
      url += ';' + sessionId
    }
    let resultUrl = Util.urlEncode(url, params)
    let data = await axios({
      url: resultUrl,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data.data
  }
}

export default new Http()

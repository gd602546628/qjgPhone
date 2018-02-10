/**
 * Created by gd on 2018/1/12/012.
 */
import httpService from '../service/httpService'
import {urlPre} from '../config/config'
let api = {
  async getScene(params){
    let data = await httpService.post(`${urlPre}api/source/getSceneById`, params)
    return data.data
  },
  async getWxConfig(params){
    let data = await httpService.post(`${urlPre}api/source/getWxJsApi`, params)
    return data.data
  }
}

export default api

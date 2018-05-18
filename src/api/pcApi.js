import http from '../service/pcHttpService'
import {urlPre} from '../config/config'

class pcApi {
  constructor() {
    this.loginUrl = `${urlPre}public/login`
    this.getValidateCodeCode = `${urlPre}public/getValidateCode`
    this.getCardUrl = `${urlPre}card/getCard`
    this.useCardUrl = `${urlPre}card/userCard`
  }

  async login(params = {}, sessionId) {
    let data = await http.formPost(this.loginUrl, params, sessionId)
    return data
  }

  async getValidateCode(params = {}) {
    let data = await http.post(this.getValidateCodeCode, params)
    return data
  }

  async getCard(params = {}) {
    let data = await http.post(this.getCardUrl, params)
    return data
  }

  async useCard(params = {}) {
    let data = await http.post(this.useCardUrl, params)
    return data
  }
}

export default new pcApi()

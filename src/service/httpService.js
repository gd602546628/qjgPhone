/**
 * Created by gd on 2018/1/12/012.
 */

import axios from 'axios'
class Http {
  constructor() {
  }

  async post(url, params) {
    let data = await axios.post(url, params)
    return data
  }
}

export default new Http()

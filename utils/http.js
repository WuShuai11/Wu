import {
  config
} from '/pages/config.js'

class HTTP {
  request(params) {
    if (!params.method) {
      params.method = "GET"
    }
    wx.request({
      url: config.url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json'
      }
    })
  }
}
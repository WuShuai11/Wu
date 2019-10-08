//logs.js
const mta = require('../mta_analysis/mta_analysis.js')

Page({
  properties: {
    index: {
      type: Number,
      observer: function (pv, uv, iv) {
        con
      }
    }
  },

  data: {

  },
  onLoad: function () {

    //请求接口
    wx.request({
      data: {

      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        console.log(res.data) // 服务器回包信息

      }
    })
  }

})
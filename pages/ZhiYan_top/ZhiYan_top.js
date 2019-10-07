//logs.js
// const util = require('../../utils/util.js')
const mta = require('../mta_analysis/mta_analysis.js')
const Time = require('../../utils/Time.js')
// const Sign = require('../../utils/sign.js')

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
    countpv: 0,
    countuv: 0,
    countiv: 0,
    countWeekPv: 0,
    countWeekUv: 0,
    countWeekIv: 0,
  },
  onLoad: function () {

    //请求接口
    wx.request({
      // url: 'https://openapi.mta.qq.com/wx/v1/analytics/real_time',
      // method: "GET",
      data: {
     
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        console.log(res.data) // 服务器回包信息
        if (res.statusCode == '200') {
          // 赋值
          obj.setData({
            result_list: res.data
          })
        } else {
          console.log("获取失败");
        }
      }
    })
  }

})
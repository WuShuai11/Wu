//app.js
App({

  onLaunch: function (options) {
    // 展示本地存储能力
    var mta = require('./pages/mta_analysis/mta_analysis.js')
    // var mta = require('path/to/mta_analysis.js')
    var logs = wx.getStorageSync('logs') || []
    // var Week = week.getStorageSync('week') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // Week.unshift(Date.now())
    // week.setStorageSync('week', Week)

    //输出状态值
    console.log(options);
    //初始化代码可在”应用管理”查看 
    mta.App.init({
      "appID": "500697111",
      // 高级功能-自定义事件统计 ID，配置开通后在初始化处填写     
      "eventID": "500697136",
      //渠道分析,需在 onLaunch 方法传入 options,如 onLaunch:function(options){...}
      "lauchOpts": options,
      // 使用分析-下拉刷新次数/人数，必须先开通自定义事件，并配置了合法的 eventID 
      "statPullDownFresh": true,
      // 使用分析-分享次数/人数，必须先开通自定义事件，并配置了合法的 eventID     
      "statShareApp": true,
      // 使用分析-页面触底次数/人数，必须先开通自定义事件，并配置了合法的 eventID     
      "statReachBottom": true,
      //开启自动上报     
      "autoReport": true,
      //每个页面均加入参数上报     
      "statParam": true,
      //statParam 为 true 时，如果不想上报的参数可配置忽略     
      "ignoreParams": ['test_adt']
    })

    /**
    autoReport值为false时，发起上报需在每个页面page.onload调用以下方法
    页面初始化
    **/
    // mta.Page.init();

    // 自定义事件上报
    // mta.Event.stat("ico_search", { "query": "特斯拉" });


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
    
  }
})
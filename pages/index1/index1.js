//index.js
var app = getApp();
const desCode = require('../../utils/Time.js');
// const mdCode = require('../../utils/md5.js');
// const api_js = require("../../utils/api.js");

Page({
  data: {
    videoPath: '',
    videoCover: '',
    videoTitle: '',
    albumCount: '',
    videoCount: '',
    menuList: [],
    swiperList: [],
    swiperCurrent: 0,
    newsList: [],
    physiciansList: [],
    goodsList: [],
    shareUserid: '',
  },
  onLoad(options) {
    console.log(options)
    if (options.shareuserid) {
      this.setData({
        shareUserid: options.shareuserid
      })
      this.sharingAction()
    }
  },
  onShow() {
    this.getData()
  },
  onUnload() {
    this.setData({
      shareUserid: ''
    })
  },
  onShareAppMessage() {
    this.sharingAction()
    return {
      title: "名仁医疗美容",
      path: '/pages/index/index?shareuserid=' + wx.getStorageSync("userid"),
      success: (res) => {
      }
    }
  },
  // 轮播图滑动
  swiperChange(e) {
    this.setData({
      swiperCurrent: e.detail.current
    });
  },
  // 打开地图
  openMap() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: 31.19917,
          longitude: 121.44035,
          name: "名仁医疗美容",
          scale: 16
        })
      },
      fail: (res) => {
        wx.showModal({
          title: '提示',
          content: '请允许授权',
          success(res) {
            if (res.confirm) {
              wx.openSetting({
                success: function (dataAu) {
                  if (dataAu.authSetting["scope.userLocation"] == true) {
                    wx.showToast({
                      title: '授权成功',
                      icon: 'success',
                      duration: 1000
                    })
                    //再次授权，调用getLocationt的API
                    wx.getLocation({
                      type: 'gcj02',
                      success: (res) => {
                        var latitude = res.latitude
                        var longitude = res.longitude
                        wx.openLocation({
                          latitude: 31.19917,
                          longitude: 121.44035,
                          name: "名仁医疗美容",
                          scale: 16
                        })
                      }
                    })
                  } else {
                    wx.showToast({
                      title: '授权失败',
                      icon: 'success',
                      duration: 1000
                    })
                  }
                }
              })

            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  // 拨打电话
  toCall() {
    wx.makePhoneCall({
      phoneNumber: '4009933222',
    })
  },
  // 前往其他页面
  goTo(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset['url']
    });
  },
  // 首页
  getData() {
    let wMsgID = desCode.wMsgID();
    // let wParam = desCode.to3des();
    let wParam = '';
    let md = mdCode.hexMD5('8888' + '1001' + wMsgID + wParam + 'q1w2e3r4t5y6');
    const data = {
      wAgent: 8888,
      wAction: 1001,
      wMsgID: wMsgID,
      wParam: wParam,
      wSign: md,
      wImei: 222,
      wVersion: 2,
      wRequestUserID: 4
    }
    api_js.postReq(data, (res) => {
      if (res.ReturnCode == 0) {
        if (res.Data.length > 0) {
          if (res.Data[0]) {
            if (res.Data[0].ListNews) {
              for (let i = 0; i < res.Data[0].ListNews.length; i++) {
                res.Data[0].ListNews[i].ReleaseTime1 = res.Data[0].ListNews[i].ReleaseTime.split(' ')[0]
                res.Data[0].ListNews[i].ReleaseTime2 = res.Data[0].ListNews[i].ReleaseTime.split(' ')[1]
              }
            }
            if (res.Data[0].ListCategory) {
              res.Data[0].ListCategory.forEach((item, idx) => {
                if (item.Name == '注射') {
                  item.url = '/pages/injection/injection'
                }
                if (item.Name == '仪器') {
                  item.url = '/pages/instrument/instrument'
                }
                if (item.Name == '手术') {
                  item.url = '/pages/operation/operation'
                }
                if (item.Name == '口腔') {
                  item.url = '/pages/oralCavity/oralCavity'
                }
                if (item.Name == '私密') {
                  item.url = '/pages/privatePlastic/privatePlastic'
                }
              });
            }
            if (res.Data[0].ListProject) {
              res.Data[0].ListProject.forEach((item, idx) => {
                let imageUrl = item.ImageUrl.split("$#")
                let imageUrlArray = []
                imageUrl.forEach((item2, idx2) => {
                  imageUrlArray.push(item2)
                  item.ImageUrl = imageUrlArray[0]
                });
              });
            }
            this.setData({
              videoPath: res.Data[0].Path,
              videoCover: res.Data[0].Cover,
              albumCount: res.Data[0].AlbumCout,
              videoCount: res.Data[0].VideoCout,
              swiperList: res.Data[0].ListBanenrs,
              newsList: res.Data[0].ListNews,
              physiciansList: res.Data[0].ListPhysicians,
              menuList: res.Data[0].ListCategory,
              goodsList: res.Data[0].ListProject
            })
          }
        }
      }
    })
  },
  onReachBottom() {
  },

  // 分享行为记录
  sharingAction() {
    let wMsgID = desCode.wMsgID();
    let wParam
    if (this.data.shareUserid == '') {
      wParam = desCode.to3des('actiontype=101_userid=' + wx.getStorageSync("userid") + '_typeid=1' + '_typename=首页_productid=0_productname=0');
    }
    else {
      wParam = desCode.to3des('actiontype=102_userid=' + this.data.shareUserid + '_onuserid=' + wx.getStorageSync("userid") + '_typeid=1' + '_typename=首页_productid=0_productname=0');
    }

    let md = mdCode.hexMD5('8888' + '6007' + wMsgID + wParam + 'q1w2e3r4t5y6');
    const data = {
      wAgent: 8888,
      wAction: 6007,
      wMsgID: wMsgID,
      wParam: wParam,
      wSign: md,
      wImei: 222,
      wVersion: 2,
      wRequestUserID: 4
    }
    api_js.postReq(data, (res) => {
      if (res.ReturnCode == 0) {
        if (res.Data.length > 0) {

        }
      }
    })
  }
})

import { HOST } from 'config/index.js'

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
    let userInfo;
    // 获取用户信息
    // wx.getUserInfo({
    //   success: res => {
    //     userInfo = res.userInfo
    //     // 用户登录获取用户
    //     wx.login({
    //       success: loginRes => {
    //         console.log(userInfo)
    //         if (loginRes.code) {
    //           // 获取code成功后传到后台
    //           wx.request({
    //             url: HOST + '/login',
    //             data: {
    //               code: loginRes.code,
    //               userInfo: res.userInfo
    //             },
    //             success: res => {
    //               // 后台返回用户信息存入本地缓存
    //               console.log(res)
    //             }
    //           })
    //         } else {
    //           console.log('获取用户登录态失败！' + res.errMsg)
    //         }
    //       }
    //     });
    //   }
    // })
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})
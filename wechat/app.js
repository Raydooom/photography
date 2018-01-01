import { HOST } from 'config/index.js'

App({

    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function () {
        let that = this;
        wx.getStorage({
            key: 'userId',
            success: (res) => {
                console.log(res)
            },
            fail: (res) => {
                console.log(res)
                that.getUserId();
                that.getCode();
            }
        })
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

    },
    getUserId: function () {
        let userInfo, that = this;
        // 获取用户信息
        wx.getUserInfo({
            success: res => {
                that.globalData.userInfo = res.userInfo
                // 用户登录获取用户
            }
        })
    },
    getCode: function () {
        let that = this;
        console.log(111)
        wx.login({
            success: loginRes => {
                let userInfo = that.globalData.userInfo;
                console.log(userInfo)
                if (loginRes.code) {
                    // 获取code成功后传到后台
                    wx.request({
                        url: HOST + '/wechat/login',
                        method: 'POST',
                        data: {
                            code: loginRes.code,
                            userInfo: userInfo
                        },
                        success: res => {
                            // 后台返回用户信息存入本地缓存
                            wx.setStorage({
                                key: "userId",
                                data: res.data.userId,
                                success: () => {

                                }
                            })
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }

        });
    },
    globalData: {
        userInfo: null
    }

})
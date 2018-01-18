// centerTools/weather/weather.js
import { HOST } from '../../config/index.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '正在获取',
        latitude: '',
        longitude: '',
        altitude: '',
        loading: true,
        lastTime:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // wx.showNavigationBarLoading();
        // wx.setNavigationBarTitle({
        //     title: this.data.title,
        // })
        this.getLocation();
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.getLocation();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '天冷了，你要多穿点衣服，别冻着我的全世界。',
            success: function (res) {
                
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    /**
     * 获取地理位置
     */
    getLocation: function () {
        let that = this;
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                console.log(res)
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    altitude: res.altitude ? res.altitude.toFixed(2) : ""
                })
                console.log(that.data)
                that.getWeather();
            },
            fail: function (err) {
                console.log(err)
                wx.showModal({
                    title: '提醒',
                    content: '获取地理位置失败',
                    showCancel: false,
                    confirmColor: '#a09fed',
                    success: function (res) {
                        wx.switchTab({
                            url: '/pages/center/center'
                        })
                    }
                })
            }
        })
    },
    /**
     * 获取天气信息
     */
    getWeather: function () {
        let that = this;
        wx.request({
            url: HOST + '/wechat/getWeather',
            data: {
                latitude: that.data.latitude,
                longitude: that.data.longitude
            },
            success: function (res) {
                if (res.data.msg == "ok") {
                    that.setData({
                        weatherData: res.data.result,
                        loading: false,
                        lastTime: res.data.result.updatetime.substring(11,16)
                    })
                    wx.hideNavigationBarLoading();
                    wx.setNavigationBarTitle({
                        title: "",
                    })
                } else {
                    wx.showModal({
                        title: '提醒',
                        content: '数据获取失败！',
                        showCancel: false,
                        confirmColor: '#a09fed',
                        success: function (res) {
                            wx.switchTab({
                                url: '/pages/center/center'
                            })
                        }
                    })
                }
            }
        })
    },
    /**
     * 手动刷新
     */
    update: function () {
        wx.showNavigationBarLoading();
        wx.setNavigationBarTitle({
            title: "正在获取",
        })
        this.getLocation();
    },
    /**
     * 返回首页
     */
    backIndex:function(){
        console.log(11)
        wx.switchTab({
            url: "../../pages/index/index",
        })
    }

})
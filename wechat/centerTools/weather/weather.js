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
        lastTime: '',
        windPower: '1',
        shareImg: '',
        shareText: [
            "不回你消息我不是高冷，我是手冷。",
            "有一种思念叫望穿秋水，有一种寒冷叫忘穿秋裤。",
            "天冷了，如果你不能给我个拥抱，那就给我买个外套。",
            "纯洁的冬天悄然流逝，多变的永远是天气，不变的永远是心情！",
            "俗话说，”人冻腿，猪冻嘴”，我已经把毛裤穿上了，你也赶紧买个口罩吧！"
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showNavigationBarLoading();
        wx.setNavigationBarTitle({
            title: "正在获取",
        })

        let nowHours = new Date().getHours();
        if (nowHours > 6 && nowHours < 18) {
            this.setData({
                shareImg: "../../assets/images/day.jpg"
            })
        } else {
            this.setData({
                shareImg: "../../assets/images/night.jpg"
            })
        }

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
        let random = Math.floor(Math.random() * 5);
        console.log(random)
        return {
            title: '您的好友，提醒您注意天气:  ' + this.data.shareText[random],
            imageUrl: this.data.shareImg,
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
                // console.log(res)
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    altitude: res.altitude ? res.altitude.toFixed(2) : ""
                })
                // console.log(that.data)
                that.getWeather();
            },
            fail: function (err) {
                // console.log(err)
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
                        lastTime: res.data.result.updatetime.substring(11, 16),
                        windPower: res.data.result.windpower.substring(0, 1)
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
    backIndex: function () {
        console.log(11)
        wx.switchTab({
            url: "../../pages/index/index",
        })
    }

})
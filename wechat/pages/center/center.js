import { HOST } from '../../config/index';
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: '',
        userInfo:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        let that = this;
        wx.getStorage({
            key: 'userId',
            success: (res) => {
                console.log(res)
                if (res.data) {
                    that.setData({
                        userId: res.data
                    })
                    this.getUserInfo();
                } else {
                    app.getUserId();
                    app.getCode();
                }
            },
            fail: (res) => {
                console.log(res)
                app.getUserId();
                app.getCode();
            }
        })
    },
    getUserInfo() {
        let that = this;
        wx.request({
            url: HOST + '/wechat/userInfo',
            data: {
                userId: that.data.userId
            },
            success: res => {
                that.setData({
                    userInfo:res.data
                })
            }
        })
    }
})
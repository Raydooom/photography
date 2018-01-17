// pages/saveCard/saveCard.js
import { HOST } from '../../config/index';
const app = getApp();

Page({
    data: {
        postcard: '',
        cardKey: '',
        file: ''
    },
    onLoad: function (options) {
        // console.log(options)
        this.setData({
            postcard: options.url
        })
        this.getCode()
    },
    //获取本次登录code
    getCode() {
        var that = this
        wx.login({
            success: function (res) {
                if (res.code) {
                    that.setData({
                        cardKey: res.code
                    })
                    that.uploadImg()
                } else {
                    wx.showToast({
                        title: '用户信息获取失败',
                        icon: 'success',
                        duration: 1500
                    })
                }
            }
        });
    },
    // 上传图片到服务器
    uploadImg() {
        let that = this
        // 下载图片
        // wx.downloadFile({
        //   url: that.data.postcard,
        //   success: function (res) {
        //     var file = res.tempFilePath
        //     that.setData({
        //       postcard: file
        //     })
        //     console.log('下载图片路径', file)
        // 上传服务器
        console.log(that.data.postcard)
        wx.uploadFile({
            url: HOST + '/uploadImg',
            filePath: that.data.postcard,
            name: 'img',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            success: function (res) {
                console.log(res);
                var img = res.data
                // 写入数据库
                wx.request({
                    url: HOST + '/wechat/postcardCreate',
                    data: {
                        userId: wx.getStorageSync('userId'),
                        key: that.data.cardKey,
                        card: img
                    },
                    success: function (res) {
                        console.log(res)
                    }
                })
            }
        })
        //   }
        // })
    },
    // 保存图片到相册
    save() {
        let that = this
        wx.saveImageToPhotosAlbum({
            filePath: that.data.postcard,
            success: function (res) {
                wx.showToast({
                    title: '保存成功！',
                    icon: 'success',
                    duration: 2000
                })
            }
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var that = this
        return {
            title: '你的好友给送了你一张明信片',
            path: '/centerTools/viewCard/viewCard?cardId=' + that.data.cardKey + '&userId=' + wx.getStorageSync('userId'),
            imageUrl: that.data.postcard,
            success: function (res) {
                wx.showToast({
                    title: '发送成功！',
                    icon: 'success',
                    duration: 1500
                })
            },
            fail: function (res) {
                console.log("转发失败", res)
            }
        }
    },
    backKind() {
        wx.switchTab({
            url: "../../pages/index/index",
        })
    }
})
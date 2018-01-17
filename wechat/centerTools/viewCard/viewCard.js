// pages/saveCard/saveCard.js
import { HOST } from '../../config/index';
const app = getApp();

Page({
    data: {
        postcard: ''
    },
    onLoad: function (option) {
        this.getData(option)
    },
    getData(option) {
        var that = this
        wx.request({
            url: HOST + "/wechat/postcardView",
            data: {
                cardId: option.cardId,
                userId: option.userId
            },
            success: function (res) {
                that.setData({
                    card: res.data.cardUrl
                })
                that.downloadImg()
            }
        })
    },
    downloadImg() {
        var that = this
        wx.downloadFile({
            url: that.data.card,
            success: function (res) {
                console.log(res)
                if (res.statusCode === 200) {
                    that.setData({
                        postcard: res.tempFilePath
                    })
                }
            },
            error(res) {
                wx.showModal({
                    title: '提醒',
                    cancel: false,
                    content: '图片下载错误！',
                })
            }
        })
    },
    saveImg() {
        var that = this
        // 下载图片到本地
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
    goToCreate() {
        // wx.redirectTo({
        //   url: '../postcard/postcard'
        // })
        wx.navigateTo({
            url: '../postcard/postcard'
        })
    }
})
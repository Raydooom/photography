//index.js
//获取应用实例
const app = getApp()
import { server } from '../../config/index.js'

Page({
    data: {
        defaultImg: '../../assets/images/default_main.jpg',
        selectShow: false,
        defaultList: [],
        isLocal: false
    },

    onLoad: function () {
        // this.getImg()  获取网络图片
    },
    // 获取预设图片
    getImg() {
        let that = this
        wx.request({
            url: server + "/postCard/getImg",
            success: (res) => {
                if (res.data.state == 1) {
                    that.setData({
                        defaultList: res.data.data
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '服务器连接失败！',
                    })
                }
            }
        })
    },
    // 点击选择图片按钮
    toSelect() {
        this.setData({
            selectShow: !this.data.selectShow,
            isLocal: false
        })
    },
    // 选择本地图片
    localSelect() {
        let that = this
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var tempFilePaths = res.tempFilePaths[0]
                that.setData({
                    defaultImg: tempFilePaths,
                    isLocal: true
                })
            }
        })
    },
    // 选择预设图片
    selectImg(e) {
        this.setData({
            defaultImg: e.target.dataset.url
        })
    },
    sureSelect() {
        this.setData({
            selectShow: false
        })
        wx.navigateTo({
            url: '../editText/editText?url=' + this.data.defaultImg + '&isLocal=' + this.data.isLocal,
        })
    }
})

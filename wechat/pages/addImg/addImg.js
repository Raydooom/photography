// pages/addImg/addImg.js
import { HOST } from '../../config/index.js'
const app = getApp()
console.log(app)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        text: '',
        imgArr: [],
        showLoc: false,
        locationName: '是否位置信息'
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     * 输入文字
     */
    titleInput(e) {
        this.setData({
            title: e.detail.value
        })
    },
    textInput(e) {
        this.setData({
            text: e.detail.value
        })
    },
    /**
     * 添加图片
     */
    addImg: function () {
        var that = this;
        wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
                let tempFilePaths = res.tempFilePaths
                that.setData({
                    imgArr: tempFilePaths
                })
            }
        })
    },
    /**
     * 是否显示地理位置
     */
    showLocation: function (e) {
        this.setData({
            showLoc: e.detail.value
        })
        this.getLocation();
    },
    /**
     * 获取地理位置信息
     */
    getLocation: function () {
        let that = this;
        if (that.data.showLoc) {
            wx.chooseLocation({
                success: res => {
                    console.log(res)
                    that.setData({
                        locationName: res.name
                    })
                }
            })
        } else {
            that.setData({
                locationName: "是否位置信息"
            })
        }
    },
    /**
     * 发布
     */
    release: function () {
        let info = this.data
        if (!info.text.trim()) {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '请输入照片描述',
                confirmColor: '#a09fed'
            })
        } else if (info.imgArr.length == 0) {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '请上传照片',
                confirmColor: '#a09fed'
            })
        } else {
            this.upLoad()
            wx.showLoading({
                mask: true,
                title: "正在发布..."
            })
        }
    },
    /**
     * 上传图片
     */
    upLoad: function () {
        let imgUrlArr = []
        let that = this
        let imgArr = that.data.imgArr
        for (let index in imgArr) {
            wx.uploadFile({
                url: HOST + '/uploadImg',
                filePath: imgArr[index],
                name: 'img',
                success: res => {
                    imgUrlArr.push(HOST + res.data)
                    if (index == imgArr.length - 1) {
                        that.submitInfo(imgUrlArr)
                    }
                }
            })
        }
    },
    /**
     * 信息提交
     */
    submitInfo: function (imgUrlArr) {
        let info = this.data
        wx.request({
            url: HOST + '/wechat/release',
            data: {
                title: info.title,
                description: info.text,
                userId: app.userId,
                imgArr: imgUrlArr.toString(),
                location: info.showLoc ? info.locationName : ''
            },
            success: res => {
                console.log(res)
                if (res.data.state == 1) {
                    wx.hideLoading()
                    wx.showModal({
                        title: '提示',
                        showCancel: false,
                        content: '恭喜您，发布成功！',
                        confirmColor: '#a09fed'
                    })
                }
            }
        })
    }
})
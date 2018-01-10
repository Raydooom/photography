// pages/addImg/addImg.js
import { HOST } from '../../config/index.js'
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        text: '',
        imgArr: [],
        imgUrl: [],
        showLoc: false,
        locationName: '是否位置信息',
        userId: '',
        formId: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (options) {
        let that = this;
        wx.getStorage({
            key: 'userId',
            success: (res) => {
                console.log(res)
                if (res.data) {
                    that.setData({
                        userId: res.data
                    })
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
                    // console.log(res)
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

    // 生成formId
    formSubmit: function (e) {
        this.setData({
            formId: e.detail.formId
        })
        this.release();
    },
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
        console.log("选择图片", imgArr)
        for (let i = 0; i < imgArr.length; i++) {
            wx.uploadFile({
                url: HOST + '/uploadImg',
                filePath: imgArr[i],
                name: 'img',
                success: res => {
                    // console.log("单张图片url", HOST + res.data)
                    imgUrlArr.push(HOST + res.data)
                    that.setData({
                        imgUrl: imgUrlArr
                    })
                    that.submitInfo();
                }
            })

        }

    },
    /**
     * 信息提交
     */
    submitInfo: function (imgUrlArr) {
        let that = this;
        if (that.data.userId) {
            if (that.data.imgUrl.length == that.data.imgArr.length) {
                let info = this.data
                wx.request({
                    url: HOST + '/wechat/release',
                    data: {
                        title: info.title,
                        description: info.text,
                        userId: that.data.userId,
                        imgArr: that.data.imgUrl.toString(),
                        location: info.showLoc ? info.locationName : '',
                        formId: that.data.formId
                    },
                    success: res => {
                        // console.log(res)
                        if (res.data.state == 1) {
                            wx.hideLoading()
                            wx.showModal({
                                title: '提示',
                                showCancel: false,
                                content: '恭喜您，发布成功！',
                                confirmColor: '#a09fed',
                                success: function (res) {
                                    that.setData({
                                        title: '',
                                        text: '',
                                        imgArr: [],
                                        imgUrl: [],
                                        showLoc: false,
                                        locationName: '是否位置信息',
                                        userId: ''
                                    })
                                    wx.switchTab({
                                        url: '../newest/newest'
                                    })
                                }
                            })
                        }
                    }
                })
            }

        } else {
            wx.hideLoading();
            wx.showModal({
                title: '错误信息',
                showCancel: false,
                content: '获取用户信息失败！',
                confirmColor: '#a09fed'
            })
        }
    },

})
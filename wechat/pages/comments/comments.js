// pages/albumComment/albumComment.js
import { HOST } from '../../config/index';
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        focus: false,
        placeHolder: '发表评论',
        reply: false,
        msgId: '',
        msg: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
        this.getComments();
        var that = this;

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // console.log(2)
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.getComments();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    /**
     * 获取相册评论
     */
    getComments: function () {
        var that = this;
        wx.request({
            url: server + "/albumComments",
            data: { id: that.data.id },
            success: function (res) {
                that.setData({
                    commentsData: res.data,
                    comments: res.data.comments.length
                })
                wx.stopPullDownRefresh();
                // 设置标题
                wx.setNavigationBarTitle({
                    title: "评论（" + that.data.comments + "）"
                });
            }
        })
    },
    /**
     * 输入评论内容
     */
    sendComment: function (msg) {
        var that = this;
        if (msg.detail.value != "") {
            if (!that.data.reply) {
                // 发布留言
                wx.request({
                    url: server + "/sendComments",
                    data: {
                        albumId: that.data.id,
                        userInfo: that.data.userInfo,
                        msg: msg.detail.value
                    },
                    success: function (res) {
                        that.getComments();  // 重新获取留言内容
                        that.setData({
                            msg: ''
                        })
                        wx.showToast({
                            title: '留言成功',
                            icon: 'success',
                            duration: 2000
                        })
                        wx.pageScrollTo({
                            scrollTop: 0
                        })
                    }
                })
            } else {
                // 回复某人留言
                wx.request({
                    url: "https://api.raydom.wang/replyMsg",
                    data: {
                        msgId: that.data.msgId,
                        userInfo: that.data.userInfo,
                        msg: msg.detail.value
                    },
                    success: function (res) {
                        that.getComments(); // 刷新数据
                        that.setData({
                            msg: ''
                        })
                        wx.showToast({
                            title: '回复成功',
                            icon: 'success',
                            duration: 2000
                        })
                    }
                })
            }
        } else {
            wx.showModal({
                title: '提示',
                content: '评论不能为空',
                showCancel: false
            })
        }
    },
    /**
     * 回复留言
     */
    reply: function (e) {
        this.setData({
            msgId: e.currentTarget.dataset.msgid,
            placeHolder: '回复 ' + e.currentTarget.dataset.user,
            focus: true,
            reply: true
        })
    },
    /**
     * 失去焦点
     */
    inputBlur: function () {
        this.setData({
            placeHolder: '发表评论',
            reply: false,
            focus: false,
        })
    },
})
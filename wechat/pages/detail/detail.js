// pages/detail/detail.js
import { HOST } from '../../config/index';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailId: '',  // 详情id
        userInfo: '',   // 发布者信息
        detailPraise: 0,
        detailShare: 0,
        detailInfo: '',
        imgArr: [],
        commentList: [],
        loading: true,
        userId: '',
        active: '',
        focus: false,
        placeHolder: '请输入评论内容',
        msg: '',
        isReply: false,
        replyCommentId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // let id = 7;
        console.log(options)
        this.setData({
            detailId: options.id
        })
        this.getData(this.data.detailId);
        // 获取用户信息
        let that = this;
        wx.getStorage({
            key: 'userId',
            success: function (res) {
                that.setData({
                    userId: res.data
                })
            },
        })
    },

    onPullDownRefresh: function () {
        this.getData(this.data.detailId);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        let that = this;
        return {
            success: function (res) {
                wx.request({
                    url: HOST + '/wechat/detailShare',
                    data: {
                        shares: that.data.detailShare + 1,
                        detailId: that.data.detailId
                    },
                    success: res => {
                        that.getData(that.data.detailId);
                    }
                });

            },
            fail: function (res) {
                // 转发失败
            }
        }
    },

    /**
     * 获取条目消息
     */
    getData: function (id) {
        // console.log(id)
        let that = this;
        wx.request({
            url: HOST + '/wechat/detail',
            data: {
                id: id
            },
            success: res => {
                console.log(res);
                if (res.data.state == 1) {
                    that.setData({
                        userInfo: res.data.userInfo,
                        detailInfo: res.data.detail,
                        imgArr: res.data.img,
                        detailPraise: res.data.detail.praises,
                        detailShare: res.data.detail.shares,
                        loading: false
                    })

                    // 统计浏览量
                    that.addViews(id, res.data.detail.views);
                    // 获取评论
                    that.getComments(id);
                } else {
                    console.log("数据查询错误！");
                }
            }
        })
    },
    /**
     * 浏览量统计
     */
    addViews: function (id, views) {
        let that = this;
        wx.request({
            url: HOST + '/wechat/views',
            data: {
                id: id,
                views: views + 1
            },
            success: (res) => {
                console.log(res)
            }
        })
    },
    /**
     * 获取评论列表
     */
    getComments: function (id) {
        let that = this;
        wx.request({
            url: HOST + '/wechat/getComment',
            data: {
                id: id
            },
            success: res => {
                console.log(res);
                if (res.data.state == 1) {
                    that.setData({
                        commentList: res.data.data
                    })

                    // 停止下拉刷新
                    wx.stopPullDownRefresh();
                } else {
                    console.log("数据查询错误！");
                }
            }
        })
    },
    /**
     * 预览图片
     */
    viewImg: function (e) {
        let data = e.target.dataset;
        let that = this;
        wx.previewImage({
            current: data.current, // 当前显示图片的http链接
            urls: data.imgarr// 需要预览的图片http链接列表
        })
    },
    /**
    * 内容点赞
    */
    praise: function (e) {
        let data = e.currentTarget.dataset;
        let that = this;
        that.setData({
            detailPraise: that.data.detailPraise + 1
        })
        wx.request({
            url: HOST + '/wechat/praises',
            data: {
                id: that.data.detailId,
                praises: data.praises + 1,
                userId: that.data.userId
            },
            success: (res) => {
                console.log("点赞成功");
            }
        })
    },

    /**
     * 评论点赞
     */
    commentPraise: function (e) {
        let data = e.currentTarget.dataset;
        let that = this;
        wx.request({
            url: HOST + '/wechat/commentPraise',
            data: {
                commentId: data.commentId,
                praise: data.praise + 1
            },
            success: (res) => {
                that.setData({
                    msg: ''
                })
                that.getComments(that.data.detailId);
            }
        })
    },

    /**
     * 弹出评论框
     */
    comment: function () {
        this.setData({
            active: 'active',
            focus: true,
            msg: '',
            placeHolder: '请输入评论内容',
            isReply: false
        })
    },
    /**
     * 弹出回复框
     */
    reply: function (e) {
        let commentId = e.currentTarget.dataset.commentId;
        let user = e.currentTarget.dataset.user;
        if (this.data.focus){
            this.setData({
                active: 'active',
                focus: false,
            })
        }else{
            this.setData({
                replyCommentId: commentId,
                active: 'active',
                focus: true,
                placeHolder: '回复 ' + user + ' :',
                isReply: true,
                msg: ''
            })
        }
        
    },
    /**
     * 失去焦点
     */
    inputBlur: function () {
        this.setData({
            focus: false,
            active: '',
        })
    },
    /**
     * 提交评论
     */
    sendComment: function (e) {
        let text = e.detail.value;
        let that = this;
        // 评论内容
        if (!that.data.isReply) {
            wx.request({
                url: HOST + '/wechat/addComment',
                data: {
                    id: that.data.detailId,
                    userId: that.data.userId,
                    text: text
                },
                success: (res => {
                    that.getComments(that.data.detailId);
                    that.setData({
                        msg: '',
                        active: '',
                    })
                    console.log(res);
                })
            })
        } else {
            // 回复评论
            wx.request({
                url: HOST + '/wechat/commentReply',
                data: {
                    commentId: that.data.replyCommentId,
                    userId: that.data.userId,
                    text: text
                },
                success: (res => {
                    that.getComments(that.data.detailId);
                    that.setData({
                        msg: '',
                        active: '',
                        placeHolder: '请输入评论内容',
                        isReply: false
                    })
                    console.log(res);
                })
            })
        }

    },

})
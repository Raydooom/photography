// pages/detail/detail.js
import { HOST } from '../../config/index';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailId: '',  // 详情id
        detail: {},  // 页面数据
        view: 0,  // 浏览数
        praise: 0, // 点赞数
        share: 0  // 分享数
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: options.title
        })
        this.setData({
            detailId: options.id
        })
        this.getData();
        // 获取用户信息
        let that = this;
    },
    onShow: function () {
        this.getData();
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        let that = this;
        return {
            success: function (res) {
                that.setData({
                    share: that.data.share + 1
                })
                wx.request({
                    url: HOST + '/wechat/specialShare',
                    data: {
                        share: that.data.share,
                        id: that.data.detailId
                    },
                    success: res => {
                        // that.getData(that.data.detailId);
                    }
                });

            },
            fail: function (res) {
                // 转发失败
            }
        }
    },

    /**
     * 获取详情内容
     */
    getData: function () {
        let that = this;
        wx.request({
            url: HOST + '/wechat/specialDetail',
            method: "POST",
            data: {
                id: that.data.detailId
            },
            success: res => {
                console.log(res);
                if (res.data.state == 1) {
                    that.setData({
                        detail: res.data.detail,
                        loading: false,
                        view: res.data.detail.view + 1,
                        praise: res.data.detail.praise,
                        share: res.data.detail.share
                    })
                    // 统计浏览量
                    that.addViews(that.data.detailId, that.data.view);
                } else {
                    console.log("数据查询错误！");
                }
            }
        })
    },
    /**
     * 浏览量统计
     */
    addViews: function (id, view) {
        let that = this;
        wx.request({
            url: HOST + '/wechat/specialView',
            data: {
                id: id,
                view: view
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
    * 内容点赞
    */
    praise: function (e) {
        let that = this;
        that.setData({
            praise: that.data.praise + 1
        })
        wx.request({
            url: HOST + '/wechat/specialPraise',
            data: {
                id: that.data.detailId,
                praise: that.data.praise
            },
            success: (res) => {
                console.log("点赞成功");
            }
        })
    }
})
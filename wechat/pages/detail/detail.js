// pages/detail/detail.js
import { HOST } from '../../config/index';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: '',
        detailInfo: '',
        imgArr: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = 7;
        this.getData(id);
    },

    onPullDownRefresh: function () {

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

    },

    /**
     * 获取条目消息
     */
    getData: function (id) {
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

                    })
                    // 获取评论
                    that.getComments(id);
                } else {
                    console.log("数据查询错误！");
                }
            }
        })
    },
    getComments: function (id) {

    }
})
import { HOST } from '../../config/index'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotList: [],
        loading: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        this.getData();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    getData: function () {
        let that = this;
        wx.request({
            url: HOST + '/wechat/hot',
            method: 'POST',
            success: res => {
                if (res.data.state == 1) {
                    that.setData({
                        hotList: res.data.data,
                        loading: false
                    })
                    console.log(res.data.data)
                    console.log(res.data.data[1].content.img.split(','))
                    // 停止下拉刷新
                    wx.stopPullDownRefresh()
                } else {
                    console.log("数据查询错误！")
                }
            }
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.getData()
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
    login: () => {

    }
})
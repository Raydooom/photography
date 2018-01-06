import { HOST } from '../../config/index';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        specialList: [],
        page: 0,
        loading: true,
        pageSize: 8,
        end: false,
        backTopShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getData()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.getData();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.setData({
            page: this.data.page + 1
        })
        if (!this.data.end) {
            this.getData();
        }
    },
    /**
     * 获取列表数据
     */
    getData() {
        let that = this;
        wx.request({
            url: HOST + '/wechat/special',
            data: {
                page: that.data.page,
                pageSize: that.data.pageSize
            },
            method: 'POST',
            success: res => {
                if (res.data.state == 1) {
                    that.setData({
                        specialList: res.data.data,
                        loading: false
                    });
                    console.log(res.data.data)
                    console.log(res.data)
                    if (res.data.length == res.data.data.length) {
                        that.setData({
                            end: true
                        })
                    }
                    // 停止下拉刷新
                    wx.stopPullDownRefresh();
                } else {
                    console.log("数据查询错误！");
                }
            }

        })
    }
})
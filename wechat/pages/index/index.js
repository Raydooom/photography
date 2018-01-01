import { HOST } from '../../config/index'
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotList: [],
        loading: true,
        userId: '',
        page: 0,
        pageSize: 8,
        end: false,
        backTopShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
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
    onShow: function () {
        this.getData();
    },
    getData: function () {
        let that = this;
        wx.request({
            url: HOST + '/wechat/hot',
            data: {
                page: that.data.page,  // 起始页
                pageSize: that.data.pageSize  // 一页数据条数
            },
            method: 'POST',
            success: res => {
                if (res.data.state == 1) {
                    that.setData({
                        hotList: res.data.data,
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

    onPageScroll: function (e) {
        if (e.scrollTop > 1500) {
            this.setData({
                backTopShow: true
            })
        }else{
            this.setData({
                backTopShow: false
            })
        }
    },
    /**
     * 返回顶部
     */
    backTop: function () {
        wx.pageScrollTo({
            scrollTop: 0
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

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

        // 浏览量统计 （每点一次图片）
        wx.request({
            url: HOST + '/wechat/views',
            data: {
                id: data.id,
                views: data.views + 1
            },
            success: (res) => {
                that.getData();
            }
        })
    },
    /**
     * 点赞
     */
    praise: function (e) {
        let data = e.target.dataset;
        console.log(data)
        let that = this;
        wx.request({
            url: HOST + '/wechat/praises',
            data: {
                id: data.id,
                praises: data.praises + 1,
                userId: that.data.userId
            },
            success: (res) => {
                that.getData();
            }
        })
    }

})
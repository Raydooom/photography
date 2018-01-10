import { HOST } from '../../config/index';

Page({
    onLoad: function () {
        wx.setStorage({
            key: "key",
            data: "value",
            success: () => {
                console.log("1")
            }
        })
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e)
        wx.request({
            url: HOST + '/wechat/message',
            data: {
                formId: e.detail.formId
            },
            success: res => {
                console.log(res)
            }
        })
    },
})
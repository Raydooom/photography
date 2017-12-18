Page({
    onLoad: function () {
        wx.setStorage({
            key: "key",
            data: "value",
            success: () => {
                console.log("1")
            }
        })
    }
})
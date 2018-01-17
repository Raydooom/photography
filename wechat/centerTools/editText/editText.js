Page({
    data: {
        windowWidth: '',
        title: '黄金时代',
        text: '那一年我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。',
        fromName: '王小波',
        times: 0,
        editTimes: 0,
        done: true,
        createImg: '../../assets/images/default.jpg',
        over: false
    },
    onLoad(option) {
        var that = this
        // if (option.isLocal) {
        that.setData({
            mainImg: option.url
        })
        // } else {
        //   wx.downloadFile({
        //     url: option.url,
        //     success: function (res) {
        //       setTimeout(function(){
        //         var file = res.tempFilePath
        //         that.setData({
        //           mainImg: file
        //         })
        //       },10)

        //     }
        //   })
        // }
        this.getSystemWidth();
    },
    // 获取屏幕尺寸
    getSystemWidth() {
        var that = this
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowWidth: res.windowWidth
                })
            }
        })
    },
    // 点击编辑文字按钮弹出表单
    toSelect() {
        var that = this
        wx.getUserInfo({
            success: function (res) {
                console.log(res)
                that.setData({
                    fromName: res.userInfo.nickName
                })
            }
        })
        if (this.data.editTimes == 0) {
            this.setData({
                done: false,
                // title: '',
                // text: '',
                editTimes: 1
            })
        } else {
            this.setData({
                done: false
            })
        }
    },
    titleBlur(e) {
        this.setData({
            title: e.detail.value
        })
    },
    textBlur(e) {
        this.setData({
            text: e.detail.value == "" ? this.data.text : e.detail.value
        })
    },
    nameBlur(e) {
        this.setData({
            fromName: e.detail.value
        })
    },
    // 关闭编辑
    closeEdit(e) {
        console.log(e)
        this.setData({
            done: true
        })
    },
    // 完成编辑
    endEdit() {
        var that = this
        if (this.data.fromName.trim()) {
            that.drawImg()
        } else {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '发送人不能为空',
            })
        }
    },
    // 用canvas生成图片
    drawImg() {
        var rootWidth = this.data.windowWidth
        const ctx = wx.createCanvasContext('canvas')
        ctx.setFillStyle('#ffffff')
        ctx.fillRect(0, 0, 750, 900)
        ctx.drawImage(this.data.mainImg, 15, 15, rootWidth - 30, (rootWidth - 30) * 2 / 3)
        // 标题文字
        ctx.setFontSize(18)
        ctx.setTextBaseline("middle")
        ctx.setTextAlign("left")
        ctx.setFillStyle('#111111')
        ctx.fillText(this.data.title, 15, (rootWidth - 30) * 2 / 3 + 40, 'UTF-8')

        // 编辑内容
        var longText = this.data.text
        function writeTextOnCanvas(ctx_2d, lineheight, bytelength, text, startleft, starttop) {
            function getTrueLength(str) {//获取字符串的真实长度（字节长度）  
                var len = str.length, truelen = 0;
                for (var x = 0; x < len; x++) {
                    if (str.charCodeAt(x) > 128) {
                        truelen += 2;
                    } else {
                        truelen += 1;
                    }
                }
                return truelen;
            }
            function cutString(str, leng) {//按字节长度截取字符串，返回substr截取位置  
                var len = str.length, tlen = len, nlen = 0;
                for (var x = 0; x < len; x++) {
                    if (str.charCodeAt(x) > 128) {
                        if (nlen + 2 < leng) {
                            nlen += 2;
                        } else {
                            tlen = x;
                            break;
                        }
                    } else {
                        if (nlen + 1 < leng) {
                            nlen += 1;
                        } else {
                            tlen = x;
                            break;
                        }
                    }
                }
                return tlen;
            }
            for (var i = 1; getTrueLength(text) > 0; i++) {
                var tl = cutString(text, bytelength);
                ctx_2d.fillText(text.substr(0, tl).replace(/^\s+|\s+$/, ""), startleft, (i - 1) * lineheight + starttop);
                text = text.substr(tl);
            }
        }
        ctx.setFontSize(14)
        ctx.setFillStyle('#666666')
        writeTextOnCanvas(ctx, 22, 50, longText, 15, (rootWidth - 30) * 2 / 3 + 80, )

        // 署名
        ctx.fillText('—— ' + this.data.fromName, 20, (rootWidth - 30) * 2 / 3 + 160, 'UTF-8')
        // 二位码
        // ctx.drawImage("../../assets/images/code.png", 15, (rootWidth - 30) * 2 / 3 + 150, 100, 110)
        ctx.draw()
        this.createImg()
    },
    // canvas 生成图片
    createImg() {
        var rootWidth = this.data.windowWidth
        var that = this;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: rootWidth * 2,
            height: 900,
            destWidth: rootWidth * 2,
            destHeight: 900,
            canvasId: 'canvas',
            success: function (res) {
                console.log(res)
                that.setData({
                    createImg: res.tempFilePath,
                    times: that.data.times + 1,
                    done: true,
                    over: true
                })
                // 解决canvas第一次生成图片为白色问题
                if (that.data.times == 1) {
                    that.drawImg()
                    that.setData({
                        over: true
                    })
                }
            },
            fail: function (err) {
                console.log(err)
            }
        })
    },
    nextStep() {
        // console.log(this.data.createImg)
        if (this.data.over) {
            wx.navigateTo({
                url: '../saveCard/saveCard?url=' + this.data.createImg,
            })
        } else {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '您尚未编辑明信片内容',
            })
        }

    }
})
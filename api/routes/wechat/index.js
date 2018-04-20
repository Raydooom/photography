const router = require('koa-router')()
/*
微信小程序接口
 */
const login = require('./login')
const wechatIndex = require('./home')
const wechatSpecial = require('./special')
const wechatTools = require('./tools')

module.exports = (app) => {
    // wechat路由
    app.use(login.routes(), login.allowedMethods())
    app.use(wechatIndex.routes(), wechatIndex.allowedMethods())
    app.use(wechatSpecial.routes(), wechatSpecial.allowedMethods())
    app.use(wechatTools.routes(), wechatTools.allowedMethods())
}
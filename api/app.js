const Koa = require('koa')
const app = new Koa()
const middleware = require('./middleware')

const common = require('./routes/common')
const wechat = require('./routes/wechat')
const mobile = require('./routes/mobile')

// 中间件
middleware(app)

// 公用模块路由
common(app)
// 微信端路由定义
wechat(app)
// mobile路由
mobile(app)

module.exports = app

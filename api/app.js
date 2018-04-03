const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')


const test = require('./routes/index')
const users = require('./routes/users')

/**
 * 公用模块
 */
const uploadImg = require('./routes/common/uploadImg')

/*
微信小程序接口
 */
const login = require('./routes/wechat/login')
const wechatIndex = require('./routes/wechat/index')
const wechatSpecial= require('./routes/wechat/special')
const wechatTools= require('./routes/wechat/tools')

//  mobile端接口
// const mobileIndex = require('./routes/mobile/index')

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

// error handler
onerror(app)
app.use(async (ctx, next) => {
    // 允许来自所有域名请求
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
    ctx.set("Content-Type", "application/json;charset=utf-8");
    ctx.set("Access-Control-Allow-Credentials", true);
    ctx.set("Access-Control-Max-Age", 300);
    await next();
})
// 测试页面
app.use(users.routes(), users.allowedMethods())

// commom路由
app.use(uploadImg.routes(), uploadImg.allowedMethods())

// wechat路由
app.use(login.routes(), login.allowedMethods())
app.use(wechatIndex.routes(), wechatIndex.allowedMethods())
app.use(wechatSpecial.routes(), wechatSpecial.allowedMethods())
app.use(wechatTools.routes(), wechatTools.allowedMethods())

// mobile
// app.use(mobileIndex.routes(), mobileIndex.allowedMethods())

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// })) 

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

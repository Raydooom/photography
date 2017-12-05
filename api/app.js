const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')


const index = require('./routes/index')
const users = require('./routes/users')

/**
 * 公用模块
 */
const uploadImg = require('./routes/common/uploadImg')

/*
微信小程序接口
 */
const wechat = require('./routes/wechat/login')
const wechatArticle = require('./routes/wechat/index')

// error handler
onerror(app)

// commom路由
app.use(uploadImg.routes(), uploadImg.allowedMethods())

// wechat路由
app.use(wechat.routes(), wechat.allowedMethods())
app.use(wechatArticle.routes(), wechatArticle.allowedMethods())

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
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

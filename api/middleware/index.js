const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')


module.exports = (app) => {

    // middlewares
    app.use(bodyparser({
        enableTypes: ['json', 'form', 'text']
    }))

    // error handler
    onerror(app)
    app.use(async(ctx, next) => {
        // 允许来自所有域名请求
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
        ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
        ctx.set("Content-Type", "application/json;charset=utf-8");
        ctx.set("Access-Control-Allow-Credentials", true);
        ctx.set("Access-Control-Max-Age", 300);
        await next();
    })

    app.use(json())
    app.use(logger())
    app.use(require('koa-static')(__dirname + '/public'))

    // app.use(views(__dirname + '/views', {
    //   extension: 'pug'
    // })) 

    // logger
    app.use(async(ctx, next) => {
        const start = new Date()
        await next()
        const ms = new Date() - start
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })


    // error-handling
    app.on('error', (err, ctx) => {
        console.error('server error', err, ctx)
    });
}
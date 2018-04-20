const router = require('koa-router')()

const home = require('./home')

module.exports = (app) => {
    app.use(home.routes(), home.allowedMethods())
}
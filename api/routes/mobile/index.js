const router = require('koa-router')()

const home = require('./home')
const login = require('./login')


module.exports = (app) => {
    app.use(home.routes(), home.allowedMethods())
    app.use(login.routes(), login.allowedMethods())
}
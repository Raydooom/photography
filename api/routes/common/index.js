const router = require('koa-router')()

const uploadImg = require('./uploadImg')

module.exports = (app) => {
    app.use(uploadImg.routes(), uploadImg.allowedMethods())
}
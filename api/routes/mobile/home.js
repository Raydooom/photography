const router = require('koa-router')()

router.prefix('/mobile')

router.get("/a", async(ctx, next) => {
    ctx.body = "a页面";
})

module.exports = router
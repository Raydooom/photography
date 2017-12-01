const router = require('koa-router')()

router.get('/', async(ctx, next) => {
    ctx.body = { state: 1, name: '111' }
})

router.get('/page', async(ctx, next) => {
    await ctx.render('index',{
      title : 'Koa2 Te111st!'
    });
})

router.get('/json', async(ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

module.exports = router

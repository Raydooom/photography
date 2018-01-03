const router = require('koa-router')()
    // 数据库配置
const sql = require('../config/db.config.js')
    // 时间格式化中间件
const moment = require('moment')

router.prefix('/wechat')

router.post('/special', async(ctx, next) => {
	var page = parseInt(ctx.request.body.page) || 0;
    var pageSize = parseInt(ctx.request.body.pageSize) || 2;
    var length = 0,
        list;
    await sql.query("SELECT * FROM special_article")
        .then(res=>{
            length = res.length
        })
        .catch(err => {
            console.log(err)
        })
	await sql.query("SELECT * FROM special_article ORDER BY date desc limit 0," + ( page + 1 ) * pageSize)
        .then(res => {
            list = res
        })
        .catch(err => {
            console.log(err)
        })
    ctx.body = {
        state: 1,
        data: list,
        length: length
    };

})




module.exports = router;
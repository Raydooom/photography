const router = require('koa-router')()
    // node环境请求模块
const superagent = require('superagent')
    // 数据库配置
const sql = require('../config/db.config.js')
    // node自带加密模块
const crypto = require('crypto')
    // 时间格式化中间件
const moment = require('moment')

router.prefix('/wechat')

/**
 * 热门列表数据接口
 * @param  {[type]} '/hot'     [description]
 * @param  {[type]} async(ctx, next          [description]
 * @return {[json]}            [description]
 */
router.post('/hot', async(ctx, next) => {
    var data = [],
        list;
    // 查询列表页
    await sql.query("SELECT * FROM message_list ORDER BY date desc")
        .then(res => {
            list = res
        })
        .catch(err => {
            console.log(err)
        })
    for (let index in list) {
        let authorInfo;
        // 查询用户信息
        await sql.query("SELECT * FROM user WHERE id = " + list[index].author_id + " ORDER BY date")
            .then(result => {
                authorInfo = {
                    userId: result[0].id,
                    nickname: result[0].nickname,
                    avatarUrl: result[0].avatar_url
                }
            }).catch(error => {
                console.log(error);
            })
            // 查询评论信息
        await sql.query("SELECT * FROM comments WHERE id = " + list[index].comment_id)
            .then(result => {
                data[index] = {
                    comments: result,
                    authorInfo: authorInfo,
                    content: list[index],
                    img: list[index].img.split(',')
                }
            }).catch(error => {
                console.log(error);
            })
    }
    ctx.body = {
        state: 1,
        data: data,
    };
})

/**
 * 发布图片接口
 * @param  {[type]} '/release' [description]
 * @param  {[json]} async(ctx, next          [description]
 * @return {[type]}            [description]
 */
router.get('/release', async(ctx, next) => {
    console.log(ctx.query)
    let data = ctx.query
    let date = moment().format("YYYY-MM-DD HH:mm:ss")
    console.log(date)
    sql.query("INSERT INTO message_list ( title, description, img, date, location) VALUES ('" + data.title + "','" + data.description + "','" + data.imgArr + "','" + date + "','" + data.location + "') ")
    ctx.body = {
        state: 1,

    }
})


module.exports = router

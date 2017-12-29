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
    await sql.query("SELECT * FROM message_list ORDER BY views desc")
        .then(res => {
            list = res
        })
        .catch(err => {
            console.log(err)
        })
    for (let index in list) {
        let authorInfo;
        // 查询用户信息
        await sql.query("SELECT * FROM user WHERE user_id = '" + list[index].author_id + "'")
            .then(result => {
                // console.log(result)
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
 * 内容浏览量统计
 * @param  {[type]} '/' [description]
 * @param  {[json]} async(ctx, next          [description]
 * @return {[type]}            [description]
 */
router.get('/views', async(ctx, next) => {
    console.log(ctx.query)
    let data = ctx.query
    await sql.query("UPDATE message_list SET views = '" + data.views + "' WHERE id = " + data.id)
        .then(result => {
            console.log("浏览量统计成功！")
        }).catch(error => {
            console.log(error);
        })
    ctx.body = {
        state: 1,
    }
})

/**
 * 点赞接口
 */
router.get('/praises', async(ctx, next) => {
    console.log(ctx.query)
    let data = ctx.query
    await sql.query("UPDATE message_list SET praises = '" + data.praises + "' WHERE id = " + data.id)
        .then(result => {
            console.log("点赞成功！")
        }).catch(error => {
            console.log(error);
        })
    ctx.body = {
        state: 1,
    }
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
    await sql.query("INSERT INTO message_list ( title, description, author_id, img, date, location) VALUES ('" + data.title + "','" + data.description + "','" + data.userId + "','" + data.imgArr + "','" + date + "','" + data.location + "') ")
        .then(result => {
            console.log("发布成功！");
        }).catch(error => {
            console.log(error);
        })
    ctx.body = {
        state: 1,

    }
})

/**
 * [列表详情接口]
 * @param  {[int]}    [列表id]
 * @return {[json]}   [详情数据]
 */
router.get('/detail', async(ctx, next) => {
    console.log(ctx.query)
    let data = {};
    await sql.query("SELECT * FROM message_list WHERE id = " + ctx.query.id)
        .then(result => {
            data = {
                detail: result[0],
                img: result[0].img.split(',')
            }
        }).catch(error => {
            console.log(error);
        })
    await sql.query("SELECT * FROM user WHERE user_id ='" + data.detail.author_id + "'")
        .then(result => {
            ctx.body = {
                state: 1,
                detail: data.detail,
                img: data.img,
                userInfo: {
                    userId: result[0].id,
                    nickname: result[0].nickname,
                    avatarUrl: result[0].avatar_url
                }
            }
        }).catch(error => {
            console.log(error);
        })
})


/**
 * [详情评论接口]
 * @param  {[int]}  [列表id]
 * @return {[json]}  [评论及评论用户]
 */
router.get('/comment', async(ctx, next) => {
    console.log(ctx.query)
    let data = [],
        list;
    await sql.query("SELECT * FROM message_list WHERE id = " + ctx.query.id)
        .then(result => {
            list = result;
        }).catch(error => {
            console.log(error);
        })
    for (let index in list) {
        // 查询用户信息
        await sql.query("SELECT * FROM user WHERE user_id = '" + list[index].author_id + "'")
            .then(result => {
                data[index].userInfo = {
                    userId: result[0].id,
                    nickname: result[0].nickname,
                    avatarUrl: result[0].avatar_url
                }
            }).catch(error => {
                console.log(error);
            })
    };
    ctx.body = {
        state: 1,
        data: data,
    };
})



module.exports = router

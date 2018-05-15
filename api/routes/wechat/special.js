const router = require('koa-router')()
    // 数据库配置
const sql = require('../config/db.config.js')
    // 时间格式化中间件
const moment = require('moment')

router.prefix('/wechat')

/**
 * 专题列表数据接口
 * @param  {[init,init]} [页码，每页可显示多少条数据]
 * @return {[json]}      [description]
 */
router.post('/special', async(ctx, next) => {
	var page = parseInt(ctx.request.body.page) || 0;
    var pageSize = parseInt(ctx.request.body.pageSize) || 5;
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


/**
 * 专题详情数据接口
 * @param  {[init]}      [专题id]
 * @return {[json]}      [description]
 */
router.post('/specialDetail', async(ctx, next) => {
    console.log(ctx)
    let id = parseInt(ctx.request.body.id);
    await sql.query("SELECT * FROM special_article WHERE id = " + id)
        .then(res => {
            ctx.body = {
                state:1,
                detail: res[0]
            }
        })
        .catch(err => {
            console.log(err)
        })
})

/**
 * 专题浏览量统计接口
 * @param  {[init]}      [专题id,浏览数]
 * @return {[json]}      [description]
 */

router.get('/specialView', async(ctx, next) => {
    console.log(ctx.query)
    let data = ctx.query
    await sql.query("UPDATE special_article SET view = '" + data.view + "' WHERE id = '" + data.id + "'")
        .then(result => {
            console.log("专题浏览统计成功！")
        }).catch(error => {
            console.log(error);
        })
    ctx.body = {
        state: 1,
    }
})


/**
 * 专题点赞接口
 * @param  {[init]}      [专题id,点赞数]
 * @return {[json]}      [description]
 */
router.get('/specialPraise', async(ctx, next) => {
    console.log(ctx.query)
    let data = ctx.query
    await sql.query("UPDATE special_article SET praise = '" + data.praise + "' WHERE id = '" + data.id + "'")
        .then(result => {
            console.log("专题点赞成功！")
        }).catch(error => {
            console.log(error);
        })
    ctx.body = {
        state: 1,
    }
})


/**
 * [专题详情分享接口]
 * @param  {[int]}    [详情]
 * @param  {[int]}    [分享数]
 * @return {[json]}   [结果]
 */
router.get('/specialShare', async(ctx, next) => {
    console.log(ctx.query)
    let data = ctx.query;
    await sql.query("UPDATE special_article SET share = '" + data.share + "' WHERE id = " + data.id)
        .then(result => {
            console.log("专题分享统计成功！")
        }).catch(error => {
            console.log(error);
        })
    ctx.body = {
        state: 1,
    }
})


/**
 * [获取专题详情评论接口]
 * @param  {[int]}  [列表id]
 * @return {[json]}  [评论、评论用户、评论回复、回复用户信息]
 */
router.get('/specialComment', async(ctx, next) => {
    console.log(ctx.query)
    let data = [],
        list;
    await sql.query("SELECT * FROM special_comment WHERE special_id = " + ctx.query.id +" ORDER BY id desc")
        .then(result => {
            list = result;
        }).catch(error => {
            console.log(error);
        })
    for (let index in list) {
        // 查询用户信息
        let userInfo;
        await sql.query("SELECT * FROM user WHERE user_id = '" + list[index].user_id + "'")
            .then(result => {
                userInfo = {
                    userId: result[0].id,
                    nickname: result[0].nickname,
                    avatarUrl: result[0].avatar_url,
                    level:result[0].level
                };
            }).catch(error => {
                console.log(error);
            })

        // 查询回复列表
        let reply = [],
            replyList;
        await sql.query("SELECT * FROM reply_special_comments WHERE comment_id = " + list[index].id)
            .then(result=>{
                console.log("回复",list[index].id)
                replyList = result
            }).catch(error => {
                console.log(error);
            })
        for (let i in replyList) {
            // 查询回复每条的用户信息
            let userInfo;
            await sql.query("SELECT * FROM user WHERE user_id = '" + replyList[i].user_id + "'")
                .then(result => {
                    reply[i]={
                        replyMsg:replyList[i],
                        replyUser:{
                            userId: result[0].id,
                            nickname: result[0].nickname,
                            avatarUrl: result[0].avatar_url
                        }
                    }
                }).catch(error => {
                    console.log(error);
                })
        }

        let item = {
            comment:list[index],
            userInfo:userInfo,
            reply:reply
        }

        data.push(item);
    };
    ctx.body = {
        state: 1,
        data: data,
    };
})

/**
 * [评论点赞接口]
 * @param  {[int]}  [评论id]
 * @param  {[int]}  [当前点赞数]
 * @return {[json]}  [成功信息]
 */
router.get('/specialCommentPraise', async(ctx, next) => {
    console.log(ctx.query)
    let data = ctx.query
    await sql.query("UPDATE special_comment SET praise = '" + data.praise + "' WHERE id = '" + data.id + "'")
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
 * [专题评论列表接口]
 * @param  {[int]}    [列表id]
 * @param  {[string]} [user_id]
 * @return {[json]}   [结果]
 */
router.get('/addSpecialComment', async(ctx, next) => {
    console.log(ctx.query)
    let date = moment().format("YYYY-MM-DD HH:mm:ss");
    await sql.query("INSERT INTO special_comment (special_id, user_id, comment, date) VALUES ('"+ctx.query.id+"', '"+ctx.query.userId+"', '"+ctx.query.text+"', '"+date+"')")
        .then(result => {
                ctx.body={
                    state:1,
                    info:"评论成功"
                }
        }).catch(error => {
            console.log(error);
        })
    let length = 0;
    await sql.query("SELECT * FROM special_comment WHERE special_id =" + ctx.query.id)
        .then(res=>{
            length = res.length;
        })
    await sql.query("UPDATE special_article SET comment = '" + length + "' WHERE id = '" + ctx.query.id + "'")
        .then(result => {
            console.log("点赞成功！")
        }).catch(error => {
            console.log(error);
        })
})

/**
 * [专题回复评论接口]
 * @param  {[int]}  [评论id]
 * @param  {[string]}  [user_id]
 * @return {[json]}  [成功信息]
 */
router.get('/commentSpecialReply', async(ctx, next) => {
    console.log(ctx.query)
    let data = ctx.query
    let date = moment().format("YYYY-MM-DD HH:mm:ss");
    await sql.query("INSERT INTO reply_special_comments (comment_id, user_id, text, date) VALUES ('"+ctx.query.commentId+"', '"+ctx.query.userId+"', '"+ctx.query.text+"', '"+date+"')")
        .then(result => {
                ctx.body={
                    state:1,
                    info:"回复成功"
                }
        }).catch(error => {
            console.log(error);
        })
})


module.exports = router;
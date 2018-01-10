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
 * 登录换取openid等信息
 */
router.post('/login', async(ctx, next) => {
    var js_code = ctx.request.body.code;
    var userInfo = ctx.request.body.userInfo;
    var openid, userId;
    await superagent
        .get('https://api.weixin.qq.com/sns/jscode2session')
        .query({
            appid: 'wx2984c3354dfc51d6',
            secret: 'f53591699cf22b3ff462c610af28953b',
            js_code: js_code,
            grant_type: 'authorization_code'
        })
        .then(function(res) {
            let jsonRes = JSON.parse(res.res.text);
            console.log(jsonRes);
            let md5 = crypto.createHash('md5')
            md5.update(jsonRes.openid); // 对session_key进行md5加密
            openid = jsonRes.openid;
            userId = md5.digest('hex'); // 将md5加密后作为用户id
        })
        .catch(error => {
            console.log(error)
        });
    // 查询用户信息
    await sql.query("SELECT * FROM user WHERE openid = '" + openid + "'")
        .then(result => {
            let date = moment().format('YYYY-MM-DD HH:mm:ss');
            if (!result.length) {
                // 新用户存入数据库返回userid,sessionKey到前台
                sql.query("INSERT INTO user ( user_id, openid, nickname, gender, avatar_url, country, province, city, date ) VALUES ('" + userId + "','" + openid + "','" + userInfo.nickName + "','" + userInfo.gender + "','" + userInfo.avatarUrl + "','" + userInfo.country + "','" + userInfo.province + "','" + userInfo.city + "','" + date + "')")
                    .then(res => {
                        console.log("新用户登录")
                        ctx.body = {
                            state: 1,
                            info: '新用户创建成功！',
                            userId: userId
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                // 老用户直接返回userid,sessionKey到前台
                console.log("老用户登录")
                ctx.body = {
                    state: 1,
                    info: '老用户登录成功！',
                    userId: result[0].id,
                    userId: userId
                }
            }
        }).catch(error => {
            console.log(error)
        })
})

/**
 * [用户基本信息查询]
 * @param  {[string]}  [user_id]
 */
router.get('/userInfo', async(ctx, next) => {
    console.log("查询用户信息获取", ctx.query)
    await sql.query("SELECT * FROM user WHERE user_id ='" + ctx.query.userId + "'")
        .then(res => {
            ctx.body = {
                state: 1,
                nickname: res[0].nickname,
                avatar: res[0].avatar_url,
                gender: res[0].gender,
                country: res[0].country,
                integral: res[0].integral,
                level: res[0].level,
                push: res[0].push,
                date: res[0].date
            }
        }).catch(error => {
            console.log(error)
        })
})


/**
 * [用户文章信息]
 * @param  {[string]}  [user_id]
 */
router.post('/articleInfo', async(ctx, next) => {
    console.log("查询用户文章信息获取", ctx.request.body.userId)
    let release;
    // 查询发布的文章
    await sql.query("SELECT * FROM message_list WHERE author_id ='" + ctx.request.body.userId + "'")
        .then(res => {
            release = res
        }).catch(error => {
            console.log(error)
        })

    // 查询评论过的文章
    let commentList;
    await sql.query("SELECT * FROM comments WHERE user_id ='" + ctx.request.body.userId + "'")
        .then(res => {
            commentList = res
        }).catch(error => {
            console.log(error)
        })

    // 临时数组
    let articleArr = [];
    for (let i in commentList) {
        if (articleArr.indexOf(commentList[i].message_id) == '-1') {
            articleArr.push(commentList[i].message_id);
        }

    }
    console.log(articleArr.length)
    ctx.body = {
        state: 1,
        release: release.length,
        comment: articleArr.length
    }
})


/**
 * [推送设置]
 * @param  {[type]} async(ctx, next          [description]
 * @return {[type]}            [description]
 */
router.get('/pushSet', async(ctx, next) => {
    console.log(ctx.query)
    let pushState = ctx.query.pushState == 'true' ? "1" : "0";
    console.log(pushState)
    await sql.query("UPDATE user SET push = '" + pushState + "' WHERE user_id ='" + ctx.query.user_id + "'")
        .then(res => {
            ctx.body = {
                state: 1,
                info: '设置成功！'
            }
        }).catch(error => {
            console.log(error)
        })
})


module.exports = router;

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


router.get('/login', async(ctx, next) => {
    var js_code = ctx.query.code;
    var userInfo = JSON.parse(ctx.query.userInfo);
    var openid, userId;
    await superagent
        .get('https://api.weixin.qq.com/sns/jscode2session')
        .query({
            appid: 'wx2984c3354dfc51d6',
            secret: '586d3d6ccac49d3229ec03040d958c4b',
            js_code: js_code,
            grant_type: 'authorization_code'
        })
        .then(function(res) {
            let jsonRes = JSON.parse(res.res.text);
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

module.exports = router;

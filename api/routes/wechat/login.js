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
    var openid, sessionKey;
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
            md5.update(jsonRes.session_key); // 对session_key进行md5加密
            sessionKey = md5.digest('hex'); // 加密后的值d
            openid = jsonRes.openid;
        });

    console.log(moment())
        // 查询用户信息
    await sql.query("SELECT * FROM user WHERE openid = '" + openid + "'")
        .then(result => {
            let date = moment().format('YYYY-MM-DD HH:mm:ss');
            if (!result.length) {
                // 新用户存入数据库返回userid,sessionKey到前台
                sql.query("INSERT INTO user ( openid, nickname, gender, avatar_url, country, province, city, date ) VALUES ('" + openid + "','" + userInfo.nickName + "','" + userInfo.gender + "','" + userInfo.avatarUrl + "','" + userInfo.country + "','" + userInfo.province + "','" + userInfo.city + "','" + date + "')")
                    .then(res => {
                        console.log(1)
                        ctx.body = {
                            state: 1,
                            info: '新用户创建成功！',
                            sessionKey: sessionKey
                        }
                    })
            } else {
                // 老用户直接返回userid,sessionKey到前台
                console.log(2)
                ctx.body = {
                    state: 1,
                    info: '老用户登录成功！',
                    userId: result[0].id,
                    sessionKey: sessionKey
                }
            }
        }).catch(error => {
            console.log(error)
        })
})

module.exports = router;

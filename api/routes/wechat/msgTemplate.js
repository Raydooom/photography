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

const appid = "wx2984c3354dfc51d6";
const secret = "f53591699cf22b3ff462c610af28953b";


router.get('/message', async(ctx, next) => {
    console.log(ctx.query)
    let date = moment().format("YYYY-MM-DD HH:mm:ss")

    // 请求ACCESS_TOKEN
    let ACCESS_TOKEN;
    await superagent
        .get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + secret)
        .then(res => {
            ACCESS_TOKEN = res.body.access_token;
        })
        console.log(ctx.query.formId);

    // 使用模板消息
    await superagent
        .post("https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + ACCESS_TOKEN)
        .send({
            "touser": "otvsK0cR45_mL-BKResOj9p2JtGc",
            "template_id": "fM5HLPJUqp6pJLnMCFomxi7xNUDObKa8hn-tdQA2xig",
            "page": "index",
            "form_id": ctx.query.formId,
            "data": {
                "keyword1": {
                    "value": "下班喽！",
                    "color": "#173177"
                },
                "keyword2": {
                    "value": date,
                    "color": "#173177"
                },
                "keyword3": {
                    "value": "粤海喜来登酒店",
                    "color": "#173177"
                },
                "keyword4": {
                    "value": "广州市天河区天河路208号",
                    "color": "#173177"
                }
            },
            "emphasis_keyword": "keyword1.DATA"
        })
        .then(res => {
            console.log('模板调用', res.body)
        })
})






module.exports = router;

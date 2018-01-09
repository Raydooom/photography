// node环境请求模块
const superagent = require('superagent')
    // 数据库配置
const sql = require('../config/db.config.js')
    // 时间格式化中间件
const moment = require('moment')

const appid = "wx2984c3354dfc51d6";
const secret = "f53591699cf22b3ff462c610af28953b";

/**
 * [MsgTemplate 消息模板]
 * @type {Object}
 */
const MsgTemplate = {
    // 评论消息模板
    sendCommentMsg: function(msgId, formId, authorId, title, text) {
        let openId, pushState;
        // console.log(msgId, formId, authorId, title, text)
        sql.query("SELECT * FROM user WHERE user_id ='" + authorId + "'")
            .then(res => {
                openId = res[0].openid; // openid
                pushState = res[0].push; // 获取推送状态
                if (pushState) {
                    selectTmpl(openId)
                }
            }).catch(error => {
                console.log(error)
            })

        // 请求ACCESS_TOKEN
        function selectTmpl(openId) {
            superagent
                .get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + secret)
                .then(res => {
                    let ACCESS_TOKEN = res.body.access_token;
                    sendMsg(ACCESS_TOKEN, openId)
                })

            let date = moment().format("YYYY-MM-DD HH:mm:ss");
        }

        function sendMsg(ACCESS_TOKEN, openId) {
            let date = moment().format("YYYY-MM-DD HH:mm:ss");
            superagent
                .post("https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + ACCESS_TOKEN)
                .send({
                    "touser": openId,
                    "template_id": "fM5HLPJUqp6pJLnMCFomxi7xNUDObKa8hn-tdQA2xig",
                    "page": "pages/detail/detail?id=" + msgId,
                    "form_id": formId,
                    "data": {
                        "keyword1": {
                            "value": "有人评论了您的作品",
                            "color": "#173177"
                        },
                        "keyword2": {
                            "value": date,
                            "color": "#173177"
                        },
                        "keyword3": {
                            "value": text,
                            "color": "#173177"
                        },
                        "keyword4": {
                            "value": title,
                            "color": "#173177"
                        }
                    }
                })
                .then(res => {
                    console.log('模板调用', res.body)
                })
        }
    }
}

module.exports = MsgTemplate;

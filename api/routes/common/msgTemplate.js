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
    publishMsg: function(lastId, integral, formId, openId, nickname, msgTitle) {
        // 请求ACCESS_TOKEN
        superagent
            .get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + secret)
            .then(res => {
                let ACCESS_TOKEN = res.body.access_token;
                sendMsg(ACCESS_TOKEN, openId)
            })

        let date = moment().format("YYYY-MM-DD HH:mm:ss");

        function sendMsg(ACCESS_TOKEN, openId) {
            let date = moment().format("YYYY-MM-DD HH:mm:ss");
            superagent
                .post("https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + ACCESS_TOKEN)
                .send({
                    "touser": openId,
                    "template_id": "MQzayzKk7LpfrecqxXWX3mmE8zZZCEdGWqRQFgWPfg4",
                    "page": "pages/detail/detail?id=" + lastId,
                    "form_id": formId,
                    "data": {
                        "keyword1": {
                            "value": msgTitle,
                            "color": "#173177"
                        },
                        "keyword2": {
                            "value": nickname,
                            "color": "#173177"
                        },
                        "keyword3": {
                            "value": date,
                            "color": "#173177"
                        },
                        "keyword4": {
                            "value": "积分+5，目前积分" + integral,
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

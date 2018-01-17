const router = require('koa-router')()
    // 数据库配置
const sql = require('../config/db.config.js')
    // node环境请求模块
const superagent = require('superagent')
    // 时间格式化中间件
const moment = require('moment')

const path = require("path")
    // 图片处理组件
const gm = require('gm')

router.prefix('/wechat')

// 京东appkey
const appkey = "214e5eae2b58697d95e44c708b5b7cdb";

router.get('/newsList', async(ctx, next) => {
    await superagent
        .get("https://way.jd.com/jisuapi/astro?astroid=1&date=2016-11-08&appkey=214e5eae2b58697d95e44c708b5b7cdb")
        .then(res => {
            console.log(res.body);
            ctx.body = res.body
        }).catch(err => {
            console.log(err)
        })
})



/**
 * [明信片语录接口]
 * @param  {[type]} "/postcardCreate" [description]
 * @param  {[type]} async(ctx,        next          [description]
 * @return {[type]}                   [description]
 */
router.get("/postcardText", async(ctx, next) => {
    await sql.query("SELECT * FROM postcard_text")
        .then(res=>{
            ctx.body={
                state:1,
                text:res
            }
        }).catch(err => {
            console.log(err)
        })
})


/**
 * [明信片生成接口]
 * @param  {[type]} "/postcardCreate" [description]
 * @param  {[type]} async(ctx,        next          [description]
 * @return {[type]}                   [description]
 */
router.get("/postcardCreate", async(ctx, next) => {
    let request = ctx.query;

    // 图片压缩
    gm(process.cwd() + "/public" + request.card)
        // .resize(600,0)     //设置压缩后的w/h
        .setFormat('JPEG')
        .quality(70)       //设置压缩质量: 0-100
        .strip()
        .autoOrient()
        .write(process.cwd() + "/public/" + request.card, 
        function(err){
            console.log("err: " + err);
    })

    console.log(request);
    await sql.query("INSERT INTO postcard (user_id, card_id, card_url) VALUES ('" + request.userId + "','" + request.key + "','https://api.raydom.wang" + request.card + "')")
        .then(res => {
            ctx.body = {
                state: 1,
                info: '存入数据库成功！'
            }
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
})

/**
 * [查询明信片接口]
 * @param  {[userId:string]}  [userId]
 * @param  {[cardId:string]}  [明信片id]
 */
router.get("/postcardView", async(ctx, next) => {
    let request = ctx.query;
    console.log(request);
    await sql.query("SELECT * FROM postcard WHERE user_id = '" + request.userId + "' AND card_id = '" + request.cardId + "'")
        .then(res => {
            ctx.body = {
                state: 1,
                cardUrl: res[0].card_url
            }
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
})


module.exports = router;

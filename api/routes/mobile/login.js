const router = require('koa-router')()
const sql = require('../config/db.config.js')
    // node自带加密模块
const crypto = require('crypto')
    // 时间格式化中间件
const moment = require('moment')
    // md5加密工具
const Utils = require('../utils/')

router.prefix('/mobile')

/**
 * 账号注册接口
 */
router.get("/register", async(ctx, next) => {
    console.log(ctx.query)
    let [account, password] = [ctx.query.account, ctx.query.password];
    let isExist;
    await sql.query("SELECT * From user WHERE user_account = '" + account + "'")
        .then(res => {
            isExist = res.length > 0 ? true : false;
        })

    if (isExist) {
        ctx.body = { state: 0, msg: "账号已存在" }
    } else {
        let user_id = Utils.md5Encrypt(account);
        let date = moment().format('YYYY-MM-DD HH:mm:ss');
        await sql.query("INSERT INTO user (user_account,user_password,user_id,nickname,date) VALUES ('" + account + "','" + password + "','" + user_id + "','" + account + "','" + date + "')")
            .then(res => {
                ctx.body = {
                    state: 1,
                    msg: "注册成功",
                    userId: user_id,
                    nickname: account
                }
            })
    }

})

/**
 * 登录接口
 */
router.get("/login", async(ctx, next) => {
    let [account, password] = [ctx.query.account, ctx.query.password];
    await sql.query("SELECT * From user WHERE user_account = '" + account + "' AND user_password = '" + password + "'")
        .then(res => {
            console.log(res)
            if (res.length == 0) {
                ctx.body = {
                    state: 0,
                    msg: '账号不存在'
                }
            } else {
                ctx.body = {
                    state: 1,
                    msg: '登录成功',
                    userInfo: {
                        id: res[0].id,
                        userAccount: res[0].user_account,
                        userId: res[0].user_id,
                        nickname: res[0].nickname,
                        gender: res[0].gender,
                        avatarUrl: res[0].avatar_url,
                        country: res[0].country,
                        province: res[0].province,
                        city: res[0].city,
                        registerDate: res[0].date,
                        integral: res[0].integral,
                        level: res[0].level
                    }
                }
            }
        })
})

/**
 * 获取登录以后的用户信息
 */
router.get("/userInfo", async(ctx, next) => {
    let userId = ctx.query.userId;
    console.log(userId)
    await sql.query("SELECT * From user WHERE user_id = '" + userId + "'")
        .then(res => {
            console.log(res)
            if (res.length == 0) {
                ctx.body = {
                    state: 0,
                    msg: '用户不存在'
                }
            } else {
                ctx.body = {
                    state: 1,
                    msg: '获取用户信息成功',
                    userInfo: {
                        id: res[0].id,
                        userAccount: res[0].user_account,
                        userId: res[0].user_id,
                        nickname: res[0].nickname,
                        gender: res[0].gender,
                        avatarUrl: res[0].avatar_url,
                        country: res[0].country,
                        province: res[0].province,
                        city: res[0].city,
                        registerDate: res[0].date,
                        integral: res[0].integral,
                        level: res[0].level
                    }
                }
            }
        })
})




module.exports = router

const router = require('koa-router')()
const sql = require('../config/db.config.js')

router.prefix('/mobile')

router.get("/register", async(ctx, next) => {
    console.log(ctx.query)
    let [account, password] = [ctx.query.account, ctx.query.password];
    let isExist;
    await sql.query("SELECT * From user WHERE user_account = '" + account + "'")
        .then(res => {
            isExist = res.length > 0 ? true : false;
        })
    console.log(isExist)
    if (isExist) {
        ctx.body = { state: 0, msg: "账号已存在" }
    } else {
        await sql.query("INSERT INTO user (user_account,user_password) VALUES ('" + account + "','" + password + "')")
            .then(res => {
                ctx.body = { state: 1, msg: "注册成功" }
            })
    }

})

module.exports = router

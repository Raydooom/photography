const router = require('koa-router')()
const sql = require('../config/db.config.js')

router.prefix('/mobile')

router.get("/test", async(ctx, next) => {
    ctx.body = false;
})



router.get("/list", async(ctx, next) => {
    /**
     * [热门和最新数据列表]
     * @param {[init]} [type] [为1时是热门数据，为2时最新数据]
     * @param {[init]} [page] [页码]
     * @param {[init]} [pageSize] [一页的数据条数]
     */
    let type = ctx.query.type == 1 ? "views" : "date";
    let page = parseInt(ctx.query.page) || 0;
    let pageSize = parseInt(ctx.query.pageSize) || 4;
    let userId = ctx.query.userId || "";
    let data = [],
        length = 0,
        list;
    await sql.query("SELECT * FROM message_list")
        .then(res => {
            length = res.length
        })
        .catch(err => {
            console.log(err)
        })
        // 查询列表页
    await sql.query("SELECT * FROM message_list ORDER BY " + type + " desc limit " + page * pageSize + "," + pageSize)
        .then(res => {
            list = res
        })
        .catch(err => {
            console.log(err)
        })
    for (let index in list) {
        let authorInfo;
        // 查询用户信息
        await sql.query("SELECT * FROM user WHERE user_id = '" + list[index].author_id + "'")
            .then(result => {
                // console.log(result)
                authorInfo = {
                    userId: result[0].id,
                    nickname: result[0].nickname,
                    avatarUrl: result[0].avatar_url,
                    level: result[0].level
                }
            }).catch(error => {
                console.log(error);
            })

        // 查询是否点赞
        // console.log(list[index].id,userId)
        let isPraise = false;
        // 有userId说明已经登录
        if (userId) {
            await sql.query("SELECT * FROM message_praise WHERE user_id = '" + userId + "' AND message_id = '" + list[index].id + "'")
                .then(res => {
                    console.log(res.length)
                    if (res.length != 0) {
                        isPraise = true;
                    }
                }).catch(error => {
                    console.log(error);
                })
        }

        // 查询评论信息
        await sql.query("SELECT * FROM comments WHERE message_id = " + list[index].id)
            .then(comments => {
                data[index] = {
                    comments: comments,
                    authorInfo: authorInfo,
                    content: list[index],
                    img: list[index].img.split(','),
                    isPraise: isPraise
                }
            }).catch(error => {
                console.log(error);
            })
    }
    ctx.body = {
        state: 1,
        data: data,
        length: length
    };
})

/**
 * 发布接口
 */
router.post("/publish", async(ctx, next) => {

})






module.exports = router

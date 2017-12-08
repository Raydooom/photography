const router = require('koa-router')()
    // 数据库配置
const sql = require('../config/db.config.js')
    // 图片上传中间件
const multer = require('koa-multer')

var storage = multer.diskStorage({
        //文件保存路径  
    destination: function(req, file, cb) {
        cb(null, 'public/uploadImg/')
    },
    //修改文件名称  
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
    //加载配置  
var upload = multer({ storage: storage });
//路由  
router.post('/uploadImg', upload.single('img'), async(ctx, next) => {
    console.log(ctx.req.file.filename)
    ctx.body = '/uploadImg/' + ctx.req.file.filename //返回文件名
})

module.exports = router

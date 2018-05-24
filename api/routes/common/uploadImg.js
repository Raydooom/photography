const router = require('koa-router')()
    // 数据库配置
const sql = require('../config/db.config.js')
    // 图片上传中间件
const multer = require('koa-multer')
    // 图片压缩
const gm = require('gm')

var storage = multer.diskStorage({
        //文件保存路径  
        destination: function(req, file, cb) {
            cb(null, 'public/test/')
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

    // 图片压缩
    let filename = ctx.req.file.filename;
    gm(process.cwd() + "/public/test/" + filename)
        .resize(1000, 1000, '>') //设置压缩后的w/h
        .setFormat('JPEG')
        .quality(70) //设置压缩质量: 0-100
        .strip()
        .autoOrient()
        .write(process.cwd() + "/public/test/" + filename,
            function(err) {
                console.log("压缩失败", err)
            })

    ctx.body = '/test/' + filename //返回文件名
})

module.exports = router

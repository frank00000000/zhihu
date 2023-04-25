const router = require('express').Router();

// 引入 upload 
const uploadControl = require("../controller/upload")

// 引入 multer 文件上传插件
const multer = require("multer")

const storage = multer.diskStorage({
    //  上传文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/upload')
    },
    // 保存在 destination 中的文件名
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})
/* 
  storage 参数是 Multer 模块中的一个可选参数，用于指定使用哪种云存储服务。
  在这个示例中，我们使用了 multer-disk 存储引擎，它支持多种云存储服务，包括 Amazon S3、Google Cloud Storage、Microsoft Azure Blob Storage 等。

  storage 参数的作用是告诉 Multer 模块使用哪种云存储服务来存储上传的文件。
*/
const upload = multer({ storage: storage })

//  post 请求
router.post("/", upload.single("file"), uploadControl.upload)

module.exports = router
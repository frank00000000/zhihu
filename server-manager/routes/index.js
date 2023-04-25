const router = require('express').Router();

// 用户接口
router.use("/user",require('./user'))

// 用户登录接口
router.use("/auth", require("./auth"))

// 上传文件接口
router.use("/upload", require("./upload"))


module.exports = router


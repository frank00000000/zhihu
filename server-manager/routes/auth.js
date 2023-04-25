// 登录页面
const router = require("express").Router()
// 登录控制层
const auth = require('../controller/auth')
// 引入数据校验
const validator = require("../middleware/validate")
// 引入数据库
const {userValidator} = require("../model/user")
// 登录接口
router.post("/",validator(userValidator),auth.login)

module.exports = router
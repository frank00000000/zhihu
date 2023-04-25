const router = require('express').Router();
// 引入 User 数据库校验
const { userValidator } = require("../model/user")
// 引入校验中间件
const validator = require("../middleware/validate")
// 引入用户操作
const user = require("../controller/user")
// 引入auth
const authMid = require("../middleware/auth")

// 注册用户 validator(userValidator) 数据校验
router.post("/", validator(userValidator), user.register)
// 获取所有用户
router.get("/", user.getUserList)
// 获取指定用户
router.get("/:id", user.getUser)
// 编辑/修改指定用户
router.patch("/:id", [authMid, validator(userValidator)], user.updateUser)
// 删除指定用户
router.delete("/:id", [authMid, validator(userValidator)], user.deleteUser)
// 获取关注列表
router.get("/:id/following",user.listFollowing)
//关注
router.put("/following/:id",authMid,user.follow)
//取消关注
router.delete("/following/:id",user.unfollow)


module.exports = router
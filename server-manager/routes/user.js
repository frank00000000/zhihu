const router = require('express').Router();
// 引入 User 数据库校验
const { userValidator } = require("../model/user")
// 引入校验中间件
const validator = require("../middleware/validate")
// 引入用户操作
const user = require("../controller/user")
// 引入auth jwt 验证中间件(是否携带jwt)
const authMid = require("../middleware/auth")
// 引入check User的id是否存在
const checkUseExited = require("../middleware/checkUseExited")
// 引入check  Topic的id是否存在
const checkTopicExited = require('../middleware/checkTopicExited');

// 引入check  checkAnswerer鉴权 
const checkAnswerer = require('../middleware/checkAnswerer')
// 引入check  checkAnswerer的答案是否存在
const checkAnswerExist = require('../middleware/checkAnswerExist');

// 注册用户 validator(userValidator) 数据校验
router.post("/", validator(userValidator), user.register)
// 获取所有用户
router.get("/", user.getUserList)
// 获取指定用户
router.get("/:id", checkUseExited, user.getUser)
// 编辑/修改指定用户
router.patch("/:id", [authMid, validator(userValidator), checkUseExited], user.updateUser)
// 删除指定用户
router.delete("/:id", [authMid, validator(userValidator), checkUseExited], user.deleteUser)
// 获取关注列表
router.get("/:id/following", user.listFollowing)
//关注
router.put("/following/:id", [authMid, checkUseExited], user.follow)
//取消关注
router.delete("/following/:id", [authMid, checkUseExited], user.unfollow)
// 获取某用户的粉丝
router.get("/:id/followers", user.listFollowers)
// 关注话题
router.put("/followingTopic/:id", [authMid, checkTopicExited], user.followTopic)
// 取消关注话题
router.delete("/followingTopic/:id", [authMid, checkTopicExited],user.unfollowTopic)
// 获取用户关注话题的列表
router.get("/:id/followingTopicList",user.followersList)
// 用户的问题列表
router.get("/:id/questionsList",user.listQuestions)
// 用户点赞
router.put("/likingAnswers/:id",[authMid,checkAnswerExist],user.likeAnswer,user.dislikeAnswer)
// 取消点赞
router.delete("/likingAnswers/:id",[authMid,checkAnswerExist],user.unlikeAnswer)
// 点赞列表
router.get("/:id/likingAnswers",user.likeAnswerList)
// 用户点踩
router.put("/dislikingAnswers/:id",[authMid,checkAnswerExist],user.dislikeAnswer,user.unlikeAnswer)
// 取消点踩
router.delete("/dislikingAnswers/:id",[authMid,checkAnswerExist],user.unDisLikeAnswer)
// 点踩列表
router.get("/:id/dislikingAnswers",user.disLikeAnswerList)

module.exports = router
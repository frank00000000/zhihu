const router = require('express').Router();
// 引入话题操作
const topic = require('../controller/topics')
// 校验 token 中间件
const auth = require("../middleware/auth")
// 引入校验
const validator = require("../middleware/validate")
const {topicValidator} = require("../model/topics")

// 获取话题列表
router.get('/',topic.getTopicsList)
// 获取指定话题
router.get('/:id', topic.getTopic)
// 新增话题
router.post("/",[auth, validator(topicValidator)],topic.createTopic)
// 修改话题
router.patch("/:id",[auth,validator(topicValidator)],topic.updateTopic)

module.exports = router
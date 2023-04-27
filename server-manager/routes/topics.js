const router = require('express').Router();
// 引入话题操作
const topic = require('../controller/topics')
// 校验 token 中间件
const auth = require("../middleware/auth")
// 引入 db 数据校验
const validator = require("../middleware/validate")
const { topicValidator } = require("../model/topics")

// check中间件 查询id在 topic 表中是否存在
const checkTopicExited = require("../middleware/checkTopicExited")


// 获取话题列表
router.get('/', topic.getTopicsList)
// 获取指定话题
router.get('/:id', topic.getTopic)
// 新增话题
router.post("/", [auth, validator(topicValidator)], topic.createTopic)
// 修改话题
router.patch("/:id", [auth, validator(topicValidator)], topic.updateTopic)
// 粉丝话题模块
router.get("/:id/followers", topic.listTopicFollowers)
module.exports = router
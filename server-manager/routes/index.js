const router = require('express').Router();

// 用户接口
router.use("/user",require('./user'))

// 用户登录接口
router.use("/auth", require("./auth"))

// 上传文件接口
router.use("/upload", require("./upload"))

// 话题模块接口
router.use("/topics", require("./topics"))

// 问题模块接口
router.use("/questions",require("./questions"))

// 答案模块接口
router.use("/questions/:questionId/answers",require("./answer"))

// 评论模块接口
router.use("/questions/:questionId/answers/:answerId/comments",require("./comments"))

// 分类模块接口
router.use("/categories",require("./categories"))

// 文章接口
router.use("/articles",require("./articles"))

module.exports = router


const auth = require("../middleware/auth")
// 引入校验
const { commentValidator } = require("../model/comments")
const validator = require("../middleware/validate")
const checkComment = require("../middleware/checkComment")
const checkCommentExist = require("../middleware/checkCommentExist")
// 引入路由
const comment = require("../controller/comments")
// 创建router
const router = require("express").Router()

// 获取评论列表
router.get("/", comment.getCommentsList)
// 获取指定评论
router.get("/:id", comment.getComment)
// 新增评论
router.post("/", [auth, validator(commentValidator)], comment.createComment)
// 修改评论
router.patch("/:id",[auth,checkComment,checkCommentExist], comment.updateComment)
// 删除评论
router.delete("/:id",[auth, checkComment,checkCommentExist], comment.deleteComment)


module.exports = router


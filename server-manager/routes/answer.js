const router = require('express').Router()
// token验证
const auth = require("../middleware/auth")

// 引入校验
const checkAnswerer = require("../middleware/checkAnswerer")
const checkAnswerExist = require('../middleware/checkAnswerExist');
const { answersValidator } = require("../model/answers")
const validator = require("../middleware/validate")

// 引入路由接口
const answer = require("../controller/answers")



// 获取答案列表
router.get("/", answer.getAnswersList)
// 获取指定答案
router.get("/:id", answer.getAnswer)
// 新增答案
router.post("/", [auth, validator(answersValidator)], answer.createAnswer)
// 修改答案
router.patch("/:id",[auth,checkAnswerer,checkAnswerExist], answer.updateAnswer)
// 删除答案
router.delete("/:id",[auth, checkAnswerer,checkAnswerExist], answer.deleteAnswer)


module.exports = router


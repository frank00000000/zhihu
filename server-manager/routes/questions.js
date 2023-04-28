const router = require("express").Router()
// jwt中间件 登录校验
const auth = require('../middleware/auth')
// 问题模块中间件。检测 问题 是否是存在
const checkQuestionsExited = require('../middleware/checkQuestionsExited')
// 鉴权 检测 id 是否和 token 一致
const checkQuestioner = require('../middleware/checkQuestioner')

// 获取校验
const { QuestionValidator } = require("../model/questions")
const validator = require("../middleware/validate")
// 引入question路由方法
const question = require("../controller/questions")

// 获取问题列表
router.get("/", question.getQuestionsList)
// 获取指定问题
router.get("/:id", checkQuestionsExited, question.getQuestion)
// 新增问题
router.post("/", [auth, validator(QuestionValidator)], question.createQuestion)
// 修改问题
router.patch("/:id", [auth, validator(QuestionValidator), checkQuestionsExited, checkQuestioner], question.updateQuestion)
// 删除问题
router.delete("/:id", [auth, validator(QuestionValidator),checkQuestioner, checkQuestionsExited], question.deleteQuestion)


module.exports = router
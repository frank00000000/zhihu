const router = require("express").Router()

const { articleValidator } = require("../model/articles")
const validator = require("../middleware/validate")

const articles = require("../controller/articles")

const auth = require("../middleware/auth")

// 获取文章
router.get("/",  articles.getArticlesList)

// 获取指定文章
router.get("/:id",  articles.getArticle)

// 新增文章
router.post("/", [auth, validator(articleValidator)], articles.createArticle)

// 编辑文章
router.patch("/:id", [auth, validator(articleValidator)], articles.updateArticle)

// 删除文章
router.delete("/:id", auth,  articles.deleteArticle)

module.exports = router

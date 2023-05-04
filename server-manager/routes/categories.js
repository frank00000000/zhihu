const router = require('express').Router()
// token验证
const auth = require("../middleware/auth")
// 引入校验
const { categoryValidator } = require("../model/categories")
const validator = require("../middleware/validate")
// 引入路由接口
const category = require("../controller/categories")

// 获取分类列表
router.get("/", category.getCategoryList)
// 获取指定分类
router.get("/:id", category.getCategory)
// 新增分类
router.post("/", [auth, validator(categoryValidator)], category.createCategory)
// 修改分类
router.patch("/:id",[auth,validator(categoryValidator)], category.updateCategoryList)
// 删除分类
router.delete("/:id",[auth], category.deleCategory)


module.exports = router


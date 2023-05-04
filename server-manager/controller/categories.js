const { CategoryModel } = require("../model/categories")

// 获取分类列表
exports.getCategoryList = async (req, res, next) => {
    try {
        // 当前是第几页
        const page = Math.max(req.query.page * 1, 1) - 1

        // 每页有几条数据
        const { PageSize = 10 } = req.query
        const page_size = Math.max(Math.floor(PageSize * 1), 1)

        // 模糊查询
        const keyword = new RegExp(req.query.keyword)

        const data = await CategoryModel.find({
            name: keyword
        }).limit(page_size).skip(page * page_size)

        if (!data) return res.status(400).json({
            code: 400,
            msg: "查询失败"
        })

        res.status(200).json({
            code: 200,
            msg: "查询列表成功",
            data
        })

    } catch (error) {
        next(error)
    }

}
// 获取单个分类

exports.getCategory = async (req, res, next) => {

    try {
        // 检测分类是否存在
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                code: 400,
                msg: "请传入分类的 id"
            })
        }

        // 获取分类
        const data = await CategoryModel.findById(id)

        // 检测
        if (!data) {
            return res.status(400).json({
                code: 400,
                msg: "获取信息失败，请稍后在试",
                value: {
                    id
                }
            })
        }
        res.status(200).json({
            code: 200,
            msg: "获取成功",
            data
        })
    } catch (error) {

        next(error)
    }
}


// 添加分类
exports.createCategory = async (req, res, next) => {

    try {
        // 1 . 检测分类是否已经存在
        const body = req.body
        let cate = await CategoryModel.findOne(body)
        // 2.若分类信息已存在
        if (cate) {
            return res.status(400).json({
                code: 400,
                msg: "分类信息已存在"
            })
        }

        const data = new CategoryModel(body)
        await data.save()

        res.status(200).json({
            code: 200,
            msg: "分类添加成功"
        })
    } catch (error) {

        next(error)
    }
}

// 更新分类
exports.updateCategoryList = async (req, res, next) => {

    try {
        // 1.检测id信息
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                code: 400,
                msg: "请传入id"
            })
        }

        // 2.更新
        const update = await CategoryModel.findByIdAndUpdate(id, req.body, { new: true })

        // 3.检测是否成功
        if (!update) {
            return res.status(400).json({
                msg: "编辑分类失败",
                code: 400,
                value: req.body
            })
        }

        res.status(200).json({
            msg: "编辑分类成功",
            code: 200,
            value: req.body
        })


    } catch (error) {
        next(error)

    }
}


// 删除分类
exports.deleCategory = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await CategoryModel.findByIdAndDelete(id)
        if (!data) {
            return res.status(400).json({
                code: 400,
                msg: "查询不存在",
                value: {
                    id
                }
            })
        }

        res.status(200).json({
            code: 200,
            msg: "删除分类成功",
            data

        })

    } catch (error) {
        next(error)
    }
}


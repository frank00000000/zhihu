const { QuestionModel } = require('../model/questions');

// 获取问题列表
exports.getQuestionsList = async (req, res, next) => {
    // 分页器功能实现 
    //  1.获取当前页数,转换成number类型.当前页数最小为 0
    const currentPage = Math.max(Math.floor(req.query.currentPage * 1), 1) - 1

    // 2.每条页面的有几条数据,不传每页条数默认为 5 
    const { PageSize = 10 } = req.query
    const page_size = Math.max(Math.floor(PageSize * 1), 1)

    try {
        // 模块功能的实现
        // 模糊查询功能
        const keyword = new RegExp(req.query.keyword)

        //1.查询所有话题列表 limit:显示条数 skip：跳过条数
        const questionsList = await QuestionModel.find(
            {
                $or: [{ title: keyword }, { description: keyword }]
            }
        ).limit(PageSize).skip(currentPage * page_size)
        // 2.获取长度为空 返回失败
        if (!questionsList.length) return res.status(400).json({
            code: 400,
            msg: "获取问题列表失败"
        })
        //3.获取话题返回成功
        res.status(200).json({
            code: 200,
            msg: "获取问题列表成功",
            data: questionsList
        })
    } catch (error) {
        next(error)
    }
}

// 获取指定问题
exports.getQuestion = async (req, res, next) => {
    //1.获取指定查询 话题名字
    const { fields = "" } = req.query

    const selectFields = fields.split(";").filter(field => field).map(field => ` +${field}`).join("")
    try {
        // 1.获取指定话题传入的id，显示 selectFields 话题id ，携带作者 questioner
        const question = await QuestionModel.findById(req.params.id).select(selectFields).populate("questioner topics")
        if (!question) {
            return res.status(400).json({
                code: 400,
                msg: "获取指定问题失败"
            })
        }

        res.status(200).json({
            code: 200,
            msg: "获取指定问题成功",
            data: question
        })
    } catch (error) {
        next(error)
    }
}

// 新增问题
exports.createQuestion = async (req, res, next) => {
    try {

        // 创建数据并且返回响应
        const question = new QuestionModel({ ...req.body, questioner: req.userData._id })
        await question.save()
        res.status(200).json({
            code: 200,
            msg: "问题添加成功",
            data: question
        })

    } catch (error) {
        next(error)
    }
}
// 更新问题
exports.updateQuestion = async (req, res, next) => {
    // 1.获取传入的 questionId
    let questionId = req.params.id
    try {
        //2.查询数据 question 表，questionId是否存在 =》 存在将body传入进去
        const data = await QuestionModel.findByIdAndUpdate(questionId, req.body)
        //3.话题更新失败的回调
        if (!data) return res.status(400).json({
            code: 400,
            msg: "更新问题失败",
            value: data
        })
        // 4.更新话题成功返回成功的回调
        res.status(200).json({
            code: 200,
            msg: "更新问题成功",
            data: req.body
        })

    } catch (err) {
        next(err)
    }
}
// 删除问题
exports.deleteQuestion = async (req, res, next) => {
    try {
        // 用户传入id，根据id查询
        const data = await QuestionModel.findByIdAndDelete(req.params.id)
        if (!data) return res.status(400).json({
            code: 400,
            msg: "删除失败，问题不存在"
        })
        res.status(200).json({
            code: 200,
            msg: "删除成功",
            data
        })

    } catch (error) {

    }
}



const { answersModel } = require("../model/answers")


// 获取答案列表
exports.getAnswersList = async (req, res, next) => {
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
        const answersList = await answersModel.find(
            {
                content: keyword, questionId: req.params.questionId
            }
        ).limit(PageSize).skip(currentPage * page_size)
        // 2.获取长度为空 返回失败
        if (!answersList.length) return res.status(400).json({
            code: 400,
            msg: "获取答案列表失败"
        })
        //3.获取话题返回成功
        res.status(200).json({
            code: 200,
            msg: "获取答案列表成功",
            data: answersList
        })
    } catch (error) {
        next(error)
    }
}

// 获取指定答案
exports.getAnswer = async (req, res, next) => {
    //1.获取指定查询 答案名字
    const { fields = "" } = req.query

    const selectFields = fields.split(";").filter(field => field).map(field => ` +${field}`).join("")
    try {
        // 1.获取指定答案传入的id，显示 selectFields 答案id ，携带作者 questioner
        const answer = await answersModel.findById(req.params.id).select(selectFields).populate("answerer")
        if (!answer) {
            return res.status(400).json({
                code: 400,
                msg: "获取指定答案失败"
            })
        }

        res.status(200).json({
            code: 200,
            msg: "获取指定答案成功",
            data: answer
        })
    } catch (error) {
        next(error)
    }
}

// 新增答案
exports.createAnswer = async (req, res, next) => {
    try {

        // 创建数据并且返回响应
        const answer = new answersModel({ ...req.body, answerer: req.userData._id, questionId: req.params.id })
        await answer.save()

        res.status(200).json({
            code: 200,
            msg: "答案添加成功",
            data: answer
        })

    } catch (error) {
        next(error)
    }
}
// 更新答案
exports.updateAnswer = async (req, res, next) => {
    // 1.获取传入的 questionId
    let answerId = req.params.id
    try {
        //2.查询数据 question 表，questionId是否存在 =》 存在将body传入进去
        const data = await answersModel.findByIdAndUpdate(answerId, req.body)
        //3.答案更新失败的回调
        if (!data) return res.status(400).json({
            code: 400,
            msg: "更新答案失败",
            value: data
        })
        // 4.更新答案成功返回成功的回调
        res.status(200).json({
            code: 200,
            msg: "更新答案成功",
            data: req.body
        })

    } catch (err) {
        next(err)
    }
}
// 删除答案
exports.deleteAnswer = async (req, res, next) => {
    try {
        // 用户传入id，根据id查询
        const data = await answersModel.findByIdAndDelete(req.params.id)
        if (!data) return res.status(400).json({
            code: 400,
            msg: "删除失败，答案不存在"
        })
        res.status(200).json({
            code: 200,
            msg: "删除答案成功",
            data
        })

    } catch (error) {
        next(error)
    }
}



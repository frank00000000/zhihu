const { CommentModel } = require("../model/comments")


// 获取评论列表
exports.getCommentsList = async (req, res, next) => {
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
        const { questionId, answerId } = req.params
        const { rootCommentId } = req.query
        //1.查询所有评论列表 limit:显示条数 skip：跳过条数
        const commentList = await CommentModel.find(
            {
                content: keyword, questionId, answerId, rootCommentId
            }
        ).limit(PageSize).skip(currentPage * page_size).populate("commentator replyTo")
        // 2.获取长度为空 返回失败
        if (!commentList.length) return res.status(400).json({
            code: 400,
            msg: "获取答案列表失败"
        })
        //3.获取评论返回成功
        res.status(200).json({
            code: 200,
            msg: "获取答案列表成功",
            data: commentList
        })
    } catch (error) {
        next(error)
    }
}

// 获取指定评论
exports.getComment = async (req, res, next) => {
    //1.获取指定查询 答案名字
    const { fields = "" } = req.query

    const selectFields = fields.split(";").filter(field => field).map(field => ` +${field}`).join("")
    try {
        // 1.获取指定答案传入的id，显示 selectFields 答案id ，携带作者 questioner
        const comment = await CommentModel.findById(req.params.id).select(selectFields).populate("commentator")
        if (!comment) {
            return res.status(400).json({
                code: 400,
                msg: "获取指定评论失败"
            })
        }

        res.status(200).json({
            code: 200,
            msg: "获取指定评论成功",
            data: comment
        })
    } catch (error) {
        next(error)
    }
}

// 新增评论
exports.createComment = async (req, res, next) => {
    try {
        const { questionId, answerId } = req.params

        // 创建数据并且返回响应
        const comment = new CommentModel({ ...req.body, answerer: req.userData._id, commentator: req.userData._id, questionId, answerId })
        await comment.save()
        res.status(200).json({
            code: 200,
            msg: "评论成功",
            data: comment
        })

    } catch (error) {
        next(error)
    }
}
// 更新评论
exports.updateComment = async (req, res, next) => {
    // 1.获取传入的 questionId
    let commentId = req.params.id
    try {
        const { content } = req.body
        //2.查询数据 question 表，questionId是否存在 =》 存在将body传入进去
        const data = await CommentModel.findByIdAndUpdate(commentId, { content })
        //3.答案更新失败的回调
        if (!data) return res.status(400).json({
            code: 400,
            msg: "更新评论失败",
            value: data
        })
        // 4.更新答案成功返回成功的回调
        res.status(200).json({
            code: 200,
            msg: "更新评论成功",
            data: req.body
        })

    } catch (err) {
        next(err)
    }
}
// 删除评论
exports.deleteComment = async (req, res, next) => {
    try {
        // 用户传入id，根据id查询
        const data = await CommentModel.findByIdAndDelete(req.params.id)
        console.log(data);
        if (!data) return res.status(400).json({
            code: 400,
            msg: "删除失败，评论不存在"
        })
        res.status(200).json({
            code: 200,
            msg: "删除评论成功",
            data
        })

    } catch (error) {
        // next(error)
        console.log(error);
    }
}



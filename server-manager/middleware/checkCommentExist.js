const { CommentModel } = require("../model/comments")
module.exports = async (req, res, next) => {
    const questionId = req.params.questionId
    const tokenId = req.userData._id
    const answerId = req.params.answerId

    // 获取
    const comments = await CommentModel.findById(req.params.id).select("+commentator")
    if (!comments) return res.status(404).json({
        code: 404,
        msg: "评论不存在"
    })

    if (questionId && comments.questionId !== questionId) {
        return res.status(404).json({
            code: 404,
            msg: "该问题下没有评论"
        })
    }

    if (answerId && comments.answerId !== answerId){
        return res.status(404).json({
            code: 404,
            msg: "该答案下没有评论"
        })
    }

    next()
}
const { CommentModel } = require("../model/comments")
module.exports = async (req, res, next) => {
    const questionId = req.params.questionId
    const tokenId = req.userData._id
    const answerId = req.params.answerId

    // 获取
    const comments = await CommentModel.findById(req.params.id).select("+commentator")
    if (comments.commentator.toString() !== req.userData._id) {
        return res.status(400).json({
            code: 400,
            msg: "没有权限"
        })
    }

    next()
}
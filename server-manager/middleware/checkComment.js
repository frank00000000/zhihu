const { CommentModel } = require("../model/comments")
module.exports = async (req, res, next) => {
    try {
        const questionId = req.params.questionId
        const tokenId = req.userData._id
        const answerId = req.params.answerId

        // 评论是否是自己的，不可以修改其他人评论
        const comments = await CommentModel.findById(req.params.id).select("+commentator")
        if (comments?.commentator?.toString() !== req.userData._id) {
            return res.status(400).json({
                code: 400,
                msg: "没有权限"
            })
        }
        next()

    } catch (error) {
        return res.status(400).json({
            code: 400,
            msg: "没有权限"
        })
    }


}
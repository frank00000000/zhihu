// 问题模块中间件
const mongoose = require("mongoose")

// 引入Joi
const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)

const commentSchema = new mongoose.Schema({
    // 版本信息
    __v: {
        type: Number,
        // 隐藏版本信息 __V
        select: false
    },
    content: {
        type: String,
        require: true
    },
    commentator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
        select: false
    },
    questionId: {
        type: String
    },
    answerId: {
        type: String
    }
})

// 创建Model
const CommentModel = mongoose.model("Comment", commentSchema)

function commentValidator(data) {
    const schema = Joi.object({
        content: Joi.string().required().messages({
            "string.base": "请输入 string 类型"
        }),
        commentator: Joi.objectId().messages({
            "objectId.base": "commentator 必须是 objectId 类型",
        }),
        questionId: Joi.string().messages({
            "string.base": "questionId 必须是 string 类型"
        }),
        answerId: Joi.string().messages({
            "string.base": "questionId 必须是 string 类型"
        })
    })
    return schema.validate(data)
}

// 导出
module.exports = {
    CommentModel,
    commentValidator
}

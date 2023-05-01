// 问题模块中间件
const mongoose = require("mongoose")

// 引入Joi
const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)

const answerSchema = new mongoose.Schema({
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

    answerer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
        select: false
    },
    questionId: {
        type: String
    },
    voteCount:{
        type:Number,
        default:0,
        required:true
    }
})

// 创建Model
const answersModel = mongoose.model("Answer", answerSchema)

function answersValidator(data) {
    const schema = Joi.object({

        content: Joi.string().messages({
            "string.base": "content只能是string类型"
        }),
        answerer: Joi.string().messages({
            "string.base": "answerer只能是string类型"
        }),
        questionId: Joi.string().messages({
            "string.base": "questionId只能是string类型"
        }),

        topics:Joi.array().items(Joi.objectId())


    })
    return schema.validate(data)
}

// 导出
module.exports = {
    answersModel,
    answersValidator
}

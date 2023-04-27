// 问题模块中间件
const mongoose = require("mongoose")

// 引入Joi
const Joi = require("joi")
const { string } = require("joi")
Joi.objectId = require("Joi-ob")

const questionSchema = new mongoose.Schema({
    // 版本信息
    __v: {
        type: Number,
        // 隐藏版本信息 __V
        select: false
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    questioner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
        select:false

    }
})


// 创建Model
const QuestionModel = mongoose.model("Question", questionSchema)

function userValidator(data) {
    const schema = Joi.object({

        title:Joi.string().messages({
            "string.base":"title只能是string类型"
        }),
        description:Joi.string().message({
            "string.base":"description只能是string类型"
        }),
        questioner:Joi.string().message({
            "string.base":"questioner只能是string类型"
        })
    })
    return schema.validate(data)
}

// 导出
module.exports = {
    QuestionModel,
    userValidator
}

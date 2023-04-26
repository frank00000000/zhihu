const mongoose = require("mongoose")

// 引入 joi 校验
const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

// 定义 topic 结构
const topicSchema = new mongoose.Schema({
 // 版本信息
 __v: {
    type: Number,
    // 隐藏版本信息 __V
    select: false
},
// 话题的名称
name:{
    type:String,
    require:true
},
// 图像
avatar_url:{
    type:String
},
// 简介
introduction:{
    type:String,
    maxlength:300,
    select:false
}

})

// 创建 Model
const TopicModel = mongoose.model("Topic",topicSchema)

function topicValidator(data){
    const schema = Joi.object({
        // 话题
        name:Joi.string().required().messages({
            "base.string":"name 必须为字符串类型"
        }),
        // 头像
        avatar_url:Joi.string().messages({
            "base.string":"avatar_url 必须为字符串类型"
        }),
        // 简介
        introduction:Joi.string().max(300).messages({
            "base.string":"introduction 必须为字符串类型",
            "string.max":"introduction 最大长度为300"
        }),
    })

    // 返回校验
    return schema.validate(data)
}


module.exports = {
    // 导出model
    TopicModel,
    // 导出话题校验规则
    topicValidator,
}


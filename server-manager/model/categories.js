const mongoose = require("mongoose")
const Joi = require("Joi")
Joi.objectId = require("joi-objectid")(Joi)

const CategorySchema = new mongoose.Schema({
    __v: {
        type: Number,
        select: false
    },
    name: {
        type: String,
        require: true,
        maxlength: 20,
        minlength: 2
    }
})


// 自定义校验规则
function categoryValidator(data) {
    const schema = Joi.object({
        name: Joi.string().max(20).min(2).required().messages({
            "string.base": "name 必须为 string 类型",
            "string.min": "name 最少 2 个字符",
            "string.max": "name 最多 20 字符",
            "any.required": "缺少必选参数 name"
        })
    })

    return schema.validate(data)
}

// 创建 Model
const CategoryModel = mongoose.model("Category", CategorySchema)

module.exports = {
    CategoryModel,
    categoryValidator
}
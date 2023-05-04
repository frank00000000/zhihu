const mongoose = require("mongoose")
const Joi = require("joi")
// 引入 joi-objectid 并设置为 Joi的属性
Joi.objectId = require("joi-objectid")(Joi)

// 定义 article 结构
const articleSchema = new mongoose.Schema({
  __v: {
    type: Number,
    select: false
  },
  title: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 2
  },
  content: {
    type: String,
    required: true,
    maxlength: 200,
    minlength: 2
  },
  status: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true })

const Article =  mongoose.model("Article", articleSchema)

// 创建校验函数
function articleValidator(data) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required().messages({
      "string.base": "title 必须为String",
      "string.min": "title 最少为2个字符",
      "string.max": "title 最多为50个字符",
      "any.required": "缺少必选参数 title" 
    }),
    content: Joi.string().min(2).max(200).required().messages({
      "string.base": "content 必须为String",
      "string.min": "content 最少为2个字符",
      "string.max": "content 最多为200个字符",
      "any.required": "缺少必选参数 content"
    }),
    status: Joi.string().valid("published", "drafted", "trashed").required().messages({
      "string.base": "status 必须为字符串",
      "any.required": "status 必须设置",
      "any.only": "volid 取值有误, 可选值为 published|drafted|trashed"
    }),
    category: Joi.objectId().required().messages({
      "string.pattern.name": "category 格式有误, 应为 ObjectId 格式",
      "any.required": "category 必须设置"
    })
  }) 
  return schema.validate(data)
}

module.exports = {
  Article,
  articleValidator
}
// 引入配置文件 uuid
const config = require("../config")
// 引入jwt
const jwt = require("jsonwebtoken")

const mongoose = require('mongoose');
// 引入joi
const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)

// 定义user表中结构
const userSchema = new mongoose.Schema({
    // 1.用户名密码部分
    // 邮箱
    email: {
        type: String,
        required: true,
        // 邮箱最小长度
        minlength: 6,
        maxlength: 30,
        // 是否唯一
        unique: true
    },
    // 用户名
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 24,
    },
    // 密码
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1000,
        select: false
    },
    // 版本信息
    __v: {
        type: Number,
        // 隐藏版本信息 __V
        select: false
    },

    //  2.个人资料部分
    // 封面/头像
    avatar_url: {
        type: String,
        select: false
    },
    //性别
    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male",
        require: true
    },
    // 一句话介绍
    headline: {
        type: String,
    },
    // 居住地
    locations: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
        select: false

    },
    // 行业
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        select: false

    },
    // 职业经历
    employments: {
        type: [{
            company: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
            job: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" }
        }],
        select: false

    },
    // 教育经历
    educations: {
        type: [{
            school: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
            major: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
            diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
            entrance_year: { type: Number },
            graduation_year: { type: Number }
        }],
        select: false
    },
    // 关注与粉丝部分
    following: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        select: false
    },
    // 关注与粉丝 话题部分
    followingTopic: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
        }],
        select: false
    },
    // 关注
    likingAnswers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }],
        select: false
    },
    // 取消
    dislikingAnswers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }],
        select: false
    }


})

// 封装生成 token 功能
userSchema.methods.generateToken = function () {
    return jwt.sign({
        _id: this._id
    },
        config.secret,
        // 设置jwt过期时间
        { expiresIn: "7d" })

}


// 创建 Model
const User = mongoose.model('User', userSchema)

// 创建内容检验规则
function userValidator(data) {
    const schema = Joi.object({
        // User
        _id: Joi.objectId(),

        email: Joi.string().email().trim().lowercase().min(6).max(30).required().messages({
            "any.required": "缺少必要的 email",
            "string.email": "email 格式错误",
            "string.min": "name最少为6个字符",
            "string.max": "name最多为30个字符",
        }),
        name: Joi.string().min(2).max(20).required().messages({
            "any.required": "缺少必选参数name",
            "string.base": "name必须为String类型",
            "string.min": "name最少为2字符",
            "string.max": "name最多为20个字符"
        }),
        password: Joi.string().min(6).max(16).pattern(/^[a-zA-Z0-9]{6,16}$/).required().messages({
            "any.required": "缺少必选参数password",
            "string.base": "password必须为String类型",
            "string.min": "password最少为6个字符",
            "string.max": "password最多为16个字符"
        }),

        avatar_url: Joi.string().messages({
            "string.base": "图像壁纸必须是 string 类型",
        }),
        gender: Joi.valid("male", "female").default("male").messages({
            "any.only": "只能传入male,或者female",
        }),
        // 简介
        headline: Joi.string().max(100).messages({
            "string.base": "headline 简介必须是 string 类型",
            "string.max": "headline 最多100个字符"
        }),
        // 居住地
        locations: Joi.array().items(Joi.objectId()).messages({
            "array.base": "locations 必须是 array 数组",
            "string.pattern.name": "数组中必须传入 objectId 类型",
        }),
        // 行业
        business: Joi.objectId().messages({
            "string.base": "business 必须是 objectId 类型",
        }),
        // 职业经历
        employments: Joi.array().items(Joi.object().keys({
            company: Joi.objectId(),
            job: Joi.objectId()
        })).messages({
            "array.base": "employments 必须是一个 数组",
            "object:unknown": "传入的数据有误"
        }),
        // 教育经历
        educations: Joi.array().items(
            Joi.object().keys({
                school: Joi.objectId(),
                major: Joi.objectId(),
                diploma: Joi.number().valid(1, 2, 3, 4, 5),
                entrance_year: Joi.number(),
                graduation_year: Joi.number()
            })
        ).messages({
            "array.base": "employments 必须是一个 数组",
            "object:unknown": "传入的数据有误",
            "any.only": "diploma 只能从 1,2,3,4,5 选取",
            "string.base": "school 和 major 只能是 objectId 类型",
            "number.base": "entrance_year 与 graduation_year 只能是number类型"
        }),
        // 关注模块
        following: Joi.array().items(
            Joi.object().keys({
                type: Joi.objectId()
            })
        ).messages({
            "array.base": "following 必须为数组类型",
        }),

        // 粉丝话题模块
        followingTopic: Joi.array().items(
            Joi.object().keys({
                type: Joi.objectId()
            })
        ).messages({
            "array.base": "followingTopic 必须为数组类型",
        }),

    })
    return schema.validate(data)
}

// 导出
module.exports = {
    // 导出model
    User,
    // 导出校验规则
    userValidator
}


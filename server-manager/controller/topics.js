// 话题module
const { TopicModel } = require('../model/topics')
const { User } = require("../model/user")

// 获取话题模块列表 get /topics/
exports.getTopicsList = async (req, res, next) => {
    // 分页器功能实现 
    //  1.获取当前页数,转换成number类型.当前页数最小为 0
    const currentPage = Math.max(Math.floor(req.query.currentPage * 1), 1) - 1

    // 2.每条页面的有几条数据,不传每页条数默认为 5 
    const { PageSize = 5 } = req.query
    const page_size = Math.max(Math.floor(PageSize * 1), 1)

    try {

        // 模块功能的实现
        //1.查询所有话题列表 limit:显示条数 skip：跳过条数
        const topicList = await TopicModel.find({
            // 实现模糊搜索功能
            name: new RegExp(req.query.keyword)
        }).limit(PageSize).skip(currentPage * page_size)
        // 2.获取长度为空 返回失败
        if (!topicList.length) return res.status(400).json({
            code: 400,
            msg: "获取话题列表失败"
        })
        //3.获取话题返回成功
        res.status(200).json({
            code: 200,
            msg: "获取话题列表成功",
            data: topicList
        })
    } catch (error) {
        next(error)
    }
}

// 获取指定话题 get /topics/:id
exports.getTopic = async (req, res, next) => {
    //1.获取指定查询 话题名字
    const { fields = "" } = req.query

    const selectFields = fields.split(";").filter(f => f).map(f => ` +${f}`).join("")
    try {
        console.log(selectFields);
        // 1.获取指定话题传入的id，并且显示 selectFields 传入过来的隐藏字段
        const topic = await TopicModel.findById(req.params.id).select(selectFields)
        if (!topic) {
            return res.status(400).json({
                code: 400,
                msg: "获取指定话题失败"
            })
        }

        res.status(200).json({
            code: 200,
            msg: "获取指定话题成功",
            data: topic
        })
    } catch (error) {
        next(error)
    }
}


// 创建话题 post /topics/
exports.createTopic = async (req, res, next) => {
    try {
        // 1.检测话题是否存在
        const data = req.body
        const topicFind = await TopicModel.findOne(data)
        // 2.若已经存在则不创建
        if (topicFind) return res.status(400).json({
            code: "400",
            msg: "创建失败 创建的话题已存在",
            value: data
        })
        // 3.创建数据并且返回响应
        const topic = new TopicModel(data)
        await topic.save()

        res.status(200).json({
            code: 200,
            msg: "创建成功",
            data
        })

    } catch (error) {
        next(error)
    }
}

// 更新话题 patch /topics/:id
exports.updateTopic = async (req, res, next) => {
    // 1.获取传入的 topicId
    let topicId = req.params.id
    try {
        //2.查询数据 topic 表，topicId是否存在 =》 存在将body传入进去
        const data = await TopicModel.findByIdAndUpdate(topicId, req.body)
        //3.话题更新失败的回调
        if (!data) return res.status(400).json({
            code: 400,
            msg: "更新话题失败",
            value: data
        })
        // 4.更新话题成功返回成功的回调
        res.status(200).json({
            code: 200,
            msg: "更新话题成功",
            data: req.body
        })

    } catch (err) {
        next(err)
    }
}

// 粉丝话题 get /topics/:id/followers
exports.listTopicFollowers = async (req, res, next) => {
    try {

        // 获取话题粉丝
        const users = await User.find({ followingTopic: req.params.id })
        if (!users) return res.status(400).json({
            code: 400,
            msg: "获取粉丝话题失败",
        })

        res.status(200).json({
            code: 200,
            msg: "获取粉丝话题成功",
            data: users
        })

    } catch (error) {
        next(error)
    }
}
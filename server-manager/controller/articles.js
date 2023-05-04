// 引入文章的 Model
const { Article } = require("../model/articles")

// 获取文章列表
exports.getArticlesList = async (req, res, next) => {
  try {
    // 检测是否存在 分类|状态 筛选参数
    const { status, category} = req.query
    let data;
    if(status || category) {
     data = await Article.find(req.query)
    } else {
     data = await Article.find()
    }

    res.status(200).json({
      code: 200,
      msg: "获取所有文章成功",
      data
    })
  } catch (err) {

    next(err)

  }
}

// 获取指定文章
exports.getArticle = async (req, res, next) => {
  try {
    // 1.根据id获取数据
    const id = req.params.id
    const data = await Article.findById(id).populate("category author")
  // 2.检测是否存在数据
  if(!data) {
    return res.status(400).json({
      code: 400,
      msg: "获取文章失败",
      value: {
        id
      }
    })
  }
  // 成功响应
  res.status(200).json({
    code: 200,
    msg: "获取文章成功",
    data
  })

  } catch (err) {
    next(err)
  }
}

// 添加新的
exports.createArticle = async (req, res, next) => {
  try {
    // 1.创建并存储数据
    let data = new Article(Object.assign(req.body, {author: req.userData._id}))
    await data.save()
    
    // 2.响应
    res.status(200).json({
      code: 200,
      msg: "添加文章成功",
      data
    })

  } catch (err) {
    next(err)
  }
}

// 更新文章
exports.updateArticle = async (req, res, next) => {
  try {
    // 1.修改数据
    const data = await Article.findByIdAndUpdate(req.params.id, req.body, {new: true})
    // 2.检测并响应
    if(!data) {
      return res.status(400).json({
        code: 400,
        msg: "文章修改失败"
      })
    }
    res.status(200).json({
      code: 200,
      msg: "文章修改成功",
      data
    })
  } catch (err) {
    next(err)
  }
}

// 删除文章
exports.deleteArticle = async (req, res, next) => {
  try {
    // 1.删除数据
    const data = await Article.findByIdAndDelete(req.params.id)
    // 2.检测并响应
    if(!data) {
      return res.status(400).json({
        code: 400,
        msg: "删除文章失败"
      })
    }
    // 响应
    res.status(200).json({
      code: 200,
      msg: "删除文章成功",
      data
    })

  } catch (err) {
    next(err)
  }
}
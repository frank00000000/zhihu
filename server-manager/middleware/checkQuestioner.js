// 判断用户在数据库中是否存在
// 用户不存在 返回用户不存在。用户存在跳转至下一个中间件
const { QuestionModel } = require("../model/questions")
module.exports = async (req, res, next) => {
    try {
        // 数据库有id next()跳转至下一个中间件
      const question = await QuestionModel.findById(req.params.id).select("+questioner")
      if(question.questioner.toString !== req.userData._id){
        return  res.status(400).json({
            code: 400,
            msg: "没有权限"
        })
      }
        next()
    } catch (error) {
        // 数据库没有id 返回用户不存在
        return res.status(404).json({
            code: 404,
            msg: "问题不存在"
        })
    }
}
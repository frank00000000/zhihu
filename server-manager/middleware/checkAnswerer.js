const {answersModel} = require("../model/answers")


module.exports = async (req,res,next) =>{
    // 查询id
    const answerId = await answersModel.findById(req.params.id).select("+answerer")
    // 查询id和用户token不一致，返回没有权限
    if (answerId?.answerer?.toString() !== req.userData._id) {
        return res.status(400).json({
            code:400,
            msg:"没有权限"
        })
    }

    next()
}
const {answersModel} = require("../model/answers")
module.exports = async (req,res,next) =>{
    // 查询用户id
    const answersId =  await answersModel.findById(req.params.id).select("+answerer")
    // 答案不存在 返回不存在
    if (!answersId) {
        return res.status(404).json({
            code:404,
            msg:"答案不存在"
        })
    }

    // 问题的答案不存在 返回问题下没有答案
    if(answersId.questionId !== req.params.questionId){
        return res.status(404).json({
        code:404,
        msg:"该问题下没有答案"    
        })
    }


    next()
}
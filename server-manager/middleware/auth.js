// jwt 中间件
// 引入jwt
const jwt = require("jsonwebtoken");
const config = require('../config')

module.exports = (req,res,next)=>{
  // token 验证 
  // 前端在请求接口的时候，需要在header，带上我们后端生成的token

  // 1.保存token（token）
  const token = req.header("authorization")

  // 2.检测是否存在token
if(!token){
  return res.status(400).json({
      code:400,
      msg:"Unauthorization 请携带token"
  })
}

  try {
    // 3.验证token 当token存在的时候，验证是否有效
    const userData = jwt.verify(token,config.secret)

    // 验证后的token 放到req上
    req.userData = userData

    next()
  } catch (error) {
    return res.status(401).json({
      code:401,
      msg:"Unauthorization token 无效"
  })
  }

}


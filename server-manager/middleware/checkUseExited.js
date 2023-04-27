// 判断用户在数据库中是否存在
// 用户不存在 返回用户不存在。用户存在跳转至下一个中间件
const { User } = require("../model/user")
module.exports = async (req, res, next) => {
    try {
        // 数据库有id next()跳转至下一个中间件
        await User.findById(req.params.id)
        next()

    } catch (error) {
        console.log("我被答应了");

        // 数据库没有id 返回用户不存在
        return res.status(404).json({
            code: 404,
            msg: "用户不存在"
        })
    }

}
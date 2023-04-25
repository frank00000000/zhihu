// 引入用户模块
const { User } = require("../model/user.js")

// 引入 bcrypt 密码加密解密
const bcrypt = require("bcrypt")

// 登录
exports.login = async (req, res, next) => {
    try {
        // 获取到校验过后的数据
        const { name, email, password } = req.validValue
        // 1.检测用户是否存在，
        const userEmail = await User.findOne({ email: email }).select("+password")

        // 2.如果用户不存在，那就直接返回失败的响应
        if (!userEmail) return res.status(400).json({
            code: 400,
            msg: "用户名或密码错误"
        })
        // 3.如果用户存在，我们再来检测密码是否正确
        // 3.1 思路1 ：将数据库中的密码进行解密，然后进行比较，看是否正确
        // 3.2 思路2 : 我们将现在这个没有加密的密码也进行加密，然后我们拿着2个加密的密码比较
        let compareResult = await bcrypt.compare(password, userEmail.password)
        // 4.如果密码不正确，返回失败的响应
        if (!compareResult) return res.status(400).json({
            code: 400,
            msg: "用户密码错误"
        })

        // 5.登录成功，响应成功的信息.返回一个jwt
        res.status(200).json({
            code: 200,
            msg: "登陆成功",
            authorization: {
                token: userEmail.generateToken()
            }
        })

    } catch (error) {
        next(error)
    }
}
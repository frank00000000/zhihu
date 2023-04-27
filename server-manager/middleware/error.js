// 错误处理中间件

// log4js
const log4js = require("../utils/log4j")

module.exports = (err, req, res, next) => {
    // 500的错误
    res.status(500).json({
        code: 500,
        msg: "服务器错误!",
    })
    // 服务器端打印错误
    log4js.error(err.message)
}
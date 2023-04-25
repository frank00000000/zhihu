const log4js = require('log4js')
// category类别  level级别  appender 文件出口
log4js.configure({
    // 错误日志输出地址
    appenders: {
        // 出口log日志输出到 "logs/common.log"
        out: {
            type: "file", filename: "logs/common.log"
        },
        error: {
            type: "dataFile",
            filename: "logs/error-",
            // 时间动态文件
            pattern: "yyyy-MM-dd.log",
            encoding: 'utf-8',    
            alwaysIncludePattern: true
        }
    },
    // 指定日志的类别
    categories: {
        default: { appenders: ["out"], level: "debug" },
        info: { appenders: ["out"], level: "info" },
        error: { appenders: ["out"], level: "error" },
    }
})


module.exports = {
    debug(content) {
        const logger = log4js.getLogger()
        // 设置级别
        logger.level = "debug"
        logger.debug(content)
    },
    info(content) {
        const logger = log4js.getLogger("info")
        logger.level = "info"
        logger.info(content)
    },
    error(content) {
        const logger = log4js.getLogger("error")
        logger.level = "error"
        logger.error(content)
    },
}

